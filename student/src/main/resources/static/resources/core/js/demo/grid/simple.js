var listAction={"grid":null,"regionGrid":null,"name":null,"loginName":null,"region":null,init:function(){this.grid=mini.get("datagrid1");this.regionGrid=mini.get("region");this.grid.on("beforeload",function(b){listAction.setCondition(b.data.queryStatu);var a={"query":{"name":listAction.name,"loginName":listAction.loginName,"region":listAction.region}};if(mini.get("dateData").getValue()){a.query.dateRange={"start":mini.get("dateData").getValue()}}b.data=wdutil.encode(a)});this.regionGrid.on("beforeload",function(b){var a={"regionId":500000,"loadCurrentLevelx":true};b.data=wdutil.encode(a)});listAction.grid.setUrl(site.path.base+"/demo/query");listAction.regionGrid.setUrl(site.path.base+"/region/children");listAction.doQuery()},doQueryClear:function(){mini.get("name").setValue("");mini.get("region").setValue("");mini.get("dateData").setValue("");mini.get("loginName").setValue("");listAction.doQuery()},setCondition:function(a){if(!a){listAction.region=mini.get("region").getValue();listAction.name=mini.get("name").getValue();listAction.loginName=mini.get("loginName").getValue()}},clearCondition:function(){mini.get("name").setValue("");mini.get("region").setValue("");mini.get("loginName").setValue("")},onKeyEnter:function(a){listAction.doQuery()},doQuery:function(){listAction.grid.load()},edit:function(a){var b=[];if(a!=undefined&&a!=null){b.push(listAction.grid.getRowByUID(a))}else{b=listAction.grid.getSelecteds()}if(!b||b.length==0){return}if(b.length>1){wdutil.win.alert("只能单项编辑");return}listAction.editRecord(b[0])},view:function(a){var b=[];if(a!=undefined&&a!=null){b.push(listAction.grid.getRowByUID(a))}else{b=listAction.grid.getSelecteds()}if(!b||b.length==0){return}if(b.length>1){wdutil.win.alert("只能单项查看");return}listAction.viewRecord(b[0])},onOperatorRenderer:function(b){var a="";a+='<a	class="mini-button mini-button-plain" href="javascript:void(0)"	onclick="listAction.edit('+b.row._uid+')"><i class="fa fa-pencil fa-fw"></i><span class="mini-button-text">修改</span></a>';a+='<span class="separator"></span>';a+='<a	class="mini-button mini-button-plain" href="javascript:void(0)"	onclick="listAction.del('+b.row._uid+')"><i class="fa fa-trash-o fa-fw"></i><span class="mini-button-text">删除</span></a>';a+='<span class="separator"></span>';a+='<a	class="mini-button mini-button-plain" href="javascript:void(0)"	onclick="listAction.view('+b.row._uid+')"><i class="fa fa-file-text-o fa-fw"></i><span class="mini-button-text">查看</span></a>';return a},del:function(a){var b=[];b=listAction.grid.getSelecteds();if(b.length>0){wdutil.win.confirm("确定删除选中记录？",function(d){if(d){var c=listAction.grid.getSelected().id;wdutil.submit({url:site.path.base+"/demo/delete/"+c,success:function(){listAction.doQuery()}})}})}else{wdutil.win.alert("请选中一条记录")}},showViewWin:function(c,d){var a=site.path.base+site.path.pages+"/demo/grid/simple-view.html";var b=wdutil.win.open({type:"mini",uid:"index_form_win",data:c,url:a,title:"简单列表表单",height:240,width:580,showMaxButton:false,showCloseButton:true,allowResize:false,showModal:true,ondestroy:function(g){var f=this.getIFrameEl();var e=f.contentWindow.fromAction;e.win=b;if(g=="close"&&(e&&e.isChanged())){wdutil.win.confirm("数据被修改了，是不保存关闭吗？","确认关闭",function(h){if(h==="ok"||h===true){e.closeWin("cancel")}});return false}else{return true}},onload:function(){var f=this.getIFrameEl();var e=f.contentWindow.fromAction;e.win=b;if(e){e.afterSave=function(g,h){listAction.grid.reload()};if(d){d(e)}}}})},editRecord:function(a){listAction.showViewWin({},function(b){b.setData(a,false)})},viewRecord:function(a){listAction.showViewWin({},function(b){b.setData(a,true)})},add:function(){listAction.showViewWin({},function(a){a.clear()})},editQueryForm:function(){wdutil.win.open({url:site.path.base+site.path.pages+"/demo/query/query.html",title:"条件查询",width:520,height:220,allowResize:false,onload:function(a){},ondestroy:function(b){if(b=="ok"){var a=this.getIFrameEl();queryForm=a.contentWindow.listAction.getData();listAction.name=queryForm.name;listAction.loginName=queryForm.loginName;listAction.region=queryForm.region;listAction.grid.load({"queryStatu":true})}}})},editSelector:function(){wdutil.win.open({url:site.path.base+site.path.pages+"/demo/selector/selector.html",title:"选择器",width:760,height:560,allowResize:false,onload:function(a){},ondestroy:function(a){}})}};$(function(){listAction.init()});