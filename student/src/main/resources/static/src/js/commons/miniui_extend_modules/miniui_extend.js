; (function (window, jQuery, mini, wdutil) {

	'use strict';

	/**
	 * 调试开关
	 */
	if ((typeof site != "undefined") && (site != null) && (typeof site.debug != "undefined")) {
			mini_debugger = site.debug;
	}

	/**
	 * miniUI对象属性扩展
	 */

	/*自定义vtype*/

	/* 电话 */
	mini.VTypes["phoneErrorText"] = "请输入正确的电话号码";
	mini.VTypes["phone"] = function (v) {
			if(!v)return true;
			var re = new RegExp("^(((0[1-9]\d{1,4}[ \-]?)?[2-9]\d{6,7})|((13|14|15|16|17|18|19)\d{9}))$");
			if (re.test(v)) return true;
			return false;
	};

	/* 手机 */
	mini.VTypes["mobileErrorText"] = "请输入正确的手机号码";
	mini.VTypes["mobile"] = function (v) {
			if(!v)return true;
			var re = new RegExp("^(13|14|15|16|17|18|19)\d{9}$");
			if (re.test(v)) return true;
			return false;
	};

	/* 英文 */
	mini.VTypes["englishErrorText"] = "请输入字母";
	mini.VTypes["english"] = function (v) {
		var re = new RegExp("^[A-Za-z][A-Za-z\-_]*$");
		return re.test(v);

	};

	/* 数字或字母 */
	mini.VTypes["alphanumericErrorText"] = "请输入数字或字母";
	mini.VTypes["alphanumeric"] = function (v) {
		var re = new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\-_]*$");
		return re.test(v);

	};

	/* 名称(不包含中文)，登录名 */
	mini.VTypes["accountErrorText"] = "请输入字母或数字开头的数字、字母或划线";
	mini.VTypes["account"] = function (v) {
		var re = new RegExp("^[A-Za-z0-9][A-Za-z0-9\-_]*$");
		return re.test(v);

	};

	/* 名称(包含中文) */
	mini.VTypes["accountCnErrorText"] = "请输入中文、字母或数字开头的中文、字母、数字或划线";
	mini.VTypes["accountCn"] = function (v) {
		var re = new RegExp("^[\u4e00-\u9fa5A-Za-z0-9][\u4e00-\u9fa5A-Za-z0-9\-_]*$");
		return re.test(v);

	};

	mini.VTypes["urlErrorText"] = "请输入正确的URL地址";
	mini.VTypes["url"] = function (v) {
		var re = /^((https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?))?(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		return re.test(v);

	};
		
	////////////////////////////////////////
	function onEnglishValidation(e) {
		if (e.isValid) {
			if (isEnglish(e.value) == false) {
				e.errorText = "必须输入英文";
				e.isValid = false;
			}
		}
	}

	function onEnglishAndNumberValidation(e) {
		if (e.isValid) {
			if (isEnglishAndNumber(e.value) == false) {
				e.errorText = "必须输入英文或数字";
				e.isValid = false;
			}
		}
	}
	function onChineseValidation(e) {
		if (e.isValid) {
			if (isChinese(e.value) == false) {
				e.errorText = "必须输入中文";
				e.isValid = false;
			}
		}
	}

	function onIDCardsValidation(e) {
		if (e.isValid) {
			var pattern = /\d*/;
			if (e.value.length < 15 || e.value.length > 18 || pattern.test(e.value) == false) {
				e.errorText = "必须输入15~18位数字";
				e.isValid = false;
			}
		}
	}

	////////////////////////////////////
	/* 是否英文 */
	function isEnglish(v) {
		var re = new RegExp("^[a-zA-Z\_\-]+$");
		return re.test(v);

	}

	/* 是否英文+数字 */
	function isEnglishAndNumber(v) {
		
		var re = new RegExp("^[0-9a-zA-Z\_\-]+$");
		return re.test(v);

	}

	/* 是否汉字 */
	function isChinese(v) {
		var re = new RegExp("^[\u4e00-\u9fa5]+$");
		return re.test(v);

	}
			
	/**
	 * 设置表单只读
	 */
	mini.Form.prototype.setReadOnly = function(value) {
		
		var controls = this.getFields();
		for (var i = 0, l = controls.length; i < l; i++) {
			var c = controls[i];
			if (c.setReadOnly) c.setReadOnly(value);
			if (value && c.setIsValid) c.setIsValid(value);  
			if(c.removeCls){
				c.removeCls("asLabel");
				c.removeCls("readonly");
			}
			if(!c.emptyTextOrg) c.emptyTextOrg = c.emptyText;
			if(value){
				if (c.addCls) c.addCls("readonly");  
				if (c.setEmptyText) c.setEmptyText("　");
			}else{
				if (c.setEmptyText) c.setEmptyText(c.emptyTextOrg);
			}
			
		}
		
	};
	/**
	 * 设置表单为扁平样式
	 */
	mini.Form.prototype.setAsLabel = function(value) {
		
		var controls = this.getFields();
		for (var i = 0, l = controls.length; i < l; i++) {
			var c = controls[i];
			if (c.setReadOnly) c.setReadOnly(value);
			if (value && c.setIsValid) c.setIsValid(value);
			if(c.removeCls){
				c.removeCls("asLabel");
				c.removeCls("readonly");
			}
			if(!c.emptyTextOrg) c.emptyTextOrg = c.emptyText;
			if(value){
				if (c.addCls) c.addCls("asLabel");
				if (c.setEmptyText) c.setEmptyText("　");
			}else{
				if (c.setEmptyText) c.setEmptyText(c.emptyTextOrg);
			}

		}
		
	};

	/**
	 * 整合表单错误提示信息
	 */
	mini.Form.prototype.getErrorTexts = function () {
		var errorTexts = [];
		var errors = this.getErrors();
		for (var i = 0, l = errors.length; i < l; i++) {
			if(i>6){
				errorTexts.push("......等"+l+"项有误");
				break;
			}
			var control = errors[i];
			if(control.label){
				var label = control.label;
				label = label.replace(":","");
				label = label.replace("：","");
				errorTexts.push("\""+label+"\""+control.errorText);
			}else if(control.cnname){
				errorTexts.push("\""+control.cnname+"\""+control.errorText);
			}else{
				errorTexts.push(control.errorText);
			}
			
		}
		return errorTexts;
	};
	
	mini.Form.prototype.setData = function (options, all, deep) {
		if (mini.isNull(deep)) deep = false;
		if (typeof options != "object") options = {};
		var map = this.getFieldsMap();
		for (var name in map) {
			var control = map[name];
			if (!control) continue;
			if (control.setValue) {
				var v = options[name];
				if(v === undefined){
					v = options[name.toLowerCase()];
				}
				if (deep == true) {
					v = mini._getMap(name, options);
				}
				if (v === undefined && all === false) continue;
				if (v === null) v = "";
				control.setValue(v);
			}
			if (control.setText && control.textName) {
				var text = options[control.textName];
				if(text === undefined){
					text = options[control.textName.toLowerCase()];
				}
				if (deep == true) {
					text = mini._getMap(control.textName, options);
				}
				if (mini.isNull(text)) text = "";
				control.setText(text);
			}
		}
		
	};

	mini.DataGrid.prototype.getSelectedIds = function(){
		var id = this.idField;
		var rs = [];
		if(id){
			var rows = this.getSelecteds();
			for (var i = 0, l = rows.length; i < l; i++) {
				rs.push(rows[i][id]);
			}
		}
		return rs;
	};

	mini.DataGrid.prototype.getIds = function(){
		var id = this.idField;
		var rs = [];
		if(id){
			var rows = this.getData();
			for (var i = 0, l = rows.length; i < l; i++) {
				rs.push(rows[i][id]);
			}
		}
		return rs;
	};


	/**
	 * 绑定回车事件
	 */
	mini.formenter = {
		version:0,
		checkexcludes:function(objname,excludes){
			if(excludes){
				var exc = excludes.split(",");
				for(var i=0; i<exc.length;i++){
					if(objname==exc[i])return true;
				}
			}
			return false;
		},
		focus:function(e){
			if(e.sender && e.sender.nextel && e.sender.type!='textarea' ){
				e.sender.nextel.focus();
			}
		},
		tab:function(formid,excludes){
			var form = new mini.Form("#"+formid);
			if(!form)return;
			var controls = form.getFields();
			var my = this;
			var last = -1;
			for (var i = 0, l = controls.length; i < l-1; i++) {
				var c = controls[i];
				if(c.type!='hidden' && this.checkexcludes(c.name,excludes)==false){
					if(last>=0){
						controls[last].nextel = controls[i];
					}
					last = i
					c.on("keydown", function (e) {
						var keycode = 0;
						if(e.keyCode){
							keycode = e.keyCode;
						}else if(e.htmlEvent && e.htmlEvent.keyCode){
							keycode = e.htmlEvent.keyCode;
						}
						if(keycode==13){
							setTimeout(function(){
								my.focus(e);
							},100);
						}
					});
					
				}
			}
		},
		fn:function(formid,fn,excludes){
			var form = new mini.Form("#"+formid);
			if(!form)return;
			var controls = form.getFields();
			for (var i = 0, l = controls.length; i < l; i++) {
				var c = controls[i];
				if(c.type=='textbox'||c.type=='wssiptextbox'){
					if(this.checkexcludes(c.name,excludes)==false){
						c.on("keydown", function (e) {
							var keycode = 0;
							if(e.keyCode){
								keycode = e.keyCode;
							}else if(e.htmlEvent && e.htmlEvent.keyCode){
								keycode = e.htmlEvent.keyCode;
							}
							if(keycode==13){
								setTimeout(fn,100);
							}
						});
					}
				}
			}

			$("#"+formid).find(".btn-query").on("click",function(){
				setTimeout(fn,100);
			});
		},
		grid:function(formid,gridid,excludes){
			var grid = mini.get(gridid);
			if(!grid)return;
			this.fn(formid,function(){
				grid.reload();
			},excludes)
		}   
	};

	/**
	 * 按传入分隔符获取CheckBoxList选中文本
	 */
	mini.CheckBoxList.prototype.getSelectedText = function(separator) {
		var textField = this.getTextField();
		if (!textField)
			return "";

		var selecteds = this.getSelecteds();
		if (selecteds.length == 0)
			return "";
		if (!separator)
			separator = "，";
		var text = selecteds[0][textField];
		for ( var i = 1; i < selecteds.length; i++) {
			text = text + separator + selecteds[i][textField];
		}
		return text;
	};

	/**
	 * 按传入分隔符获取CheckBoxList选中值
	 */
	mini.CheckBoxList.prototype.getSelectedValue = function(separator) {
		var valueField = this.getValueField();
		if (!valueField)
			return "";

		var selecteds = this.getSelecteds();
		if (selecteds.length == 0)
			return "";
		if (!separator)
			separator = ",";
		var value = selecteds[0][valueField];
		for ( var i = 1; i < selecteds.length; i++) {
			value = value + separator + selecteds[i][valueField];
		}
		return value;
	};

	// 尝试重布局
	mini.callMiniLayout = function callMiniLayout(){
		setTimeout(function() {
			mini.layout();
		}, 100);
	}

	/**
	 * 修正miniui的ajax访问
	 */
	mini.ajax = function(options) {
		if(wdutil.win._logoutflag)return;
		if (!options.dataType) {
			options.dataType = "text";
		}
		if (!options.url) {
			if (typeof (options.success) == "function") {
				options.success("");
			}
			return;
		}
		var newoptions = {};
		for ( var key in options) {
			var keystr = key.toString();
			if (keystr != "success" && keystr != "error") {
				newoptions[key] = options[key];
			}
		}
		var param = newoptions.data;
		if(!param){
			param = {};
		}
		/* 遗留代码
		if(site && site._mid){
			param._mid = site._mid;
		}
		//wdutil.debug.print(newoptions);
		if(site && site._murl){
			param._murl = site._murl;
		}
		//*/
		newoptions.data = param;
		newoptions.success = function(text) {
			if (text == "") {
				if (typeof (options.success) == "function") {
					options.success("");
				}
				return;
			}
			
			var jr = wdutil.decode(text);
			if(jr.success){
				if (typeof (options.success) == "function") {
					options.success(jr.result);
				}
			}else{
				if (typeof (options.success) == "function") {
					options.success("");
				}
				try{
					if(jr.type)wdutil.win.warn(jr.message);
				}catch(e){
					
				}
				
			}
			mini.callMiniLayout();
		}

		newoptions.error = function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status==404){
				try{
					var msg = eval("("+jqXHR.responseText+")");
					wdutil.win.alert(msg.message);
					
				}catch(e){
					wdutil.win.alert("您访问的资源不存在");
				}
				if (typeof (options.success) == "function") {
					options.success("");
				}
				return;
			}else if(jqXHR.status==500){
				try{
					var msg = eval("("+jqXHR.responseText+")");
					if (msg.statusCode==300) {
						wdutil.win.alert(msg.message);
					} else {
						wdutil.win.error("服务端异常[500]");
					}
				}catch(e){
					wdutil.win.error("服务端异常[500]");
				}
				if (typeof (options.success) == "function") {
					options.success("");
				}
				return;
			}
			
			if (typeof (options.error) == "function") {
				options.error(jqXHR, textStatus, errorThrown);
			}
		}
		return jQuery.ajax(newoptions);
	}

	mini.doaction=function(action,args){
		for (i = 0; i < args.length; i++){
			if(args[i]){
				var o = mini.get(args[i]);
				if(o)o[action]();
			};
		}
	}
	mini.show=function(){
		mini.doaction("show",arguments);
	}
	mini.hide=function(){
		mini.doaction("hide",arguments);
	}

	mini.lock=function(elid){
		var el = document.getElementById(elid);
		mini.mask({
			el:el,
			cls: 'icon-lock',
			html: '&nbsp;&nbsp;&nbsp;&nbsp;',
			backStyle:"background-color: #101010;"
		});
	}
	mini.unlock=function(elid){
		var el = document.getElementById(elid);
		mini.unmask(el);
	}
	/**
	 * 窗口边框信息
	 */
	var WIN_SizeInfo = function(obj){
		this.clientTop = 0;
		this.offsetTop = 0;
		this.scrollTop = 0;
		this.clientWidth = 0;
		this.scrollWidth = 0;
		this.offsetWidth = 0;
		this.clientLeft = 0;
		this.offsetLeft = 0;
		this.scrollLeft = 0;
		this.clientHeight = 0;
		this.offsetHeight = 0;
		this.scrollHeight = 0;
		if ( typeof(obj)=='object'){
			for(var key in this){
				try{
					this[key] = obj[key];
				}catch(e){
				}
			}
		}
	}

	/**
	 * 复制窗口边框信息
	 */
	var WIN_SizeInfo_Copy = function (source,desc){
		for(var key in desc){
			if(typeof(desc[key])=="function"){  
			}else if(typeof(desc[key])=="object"){   
			}else{
				try{
					desc[key] = source[key];
				}catch(e){
				}
			}
		}
	}


	/**
	 * 下拉字典表 版本修正： 修正下拉框的滚动条行为，增加级联功能 wdutil.debug.print(new
	 * mini.ComboBox(),"miniComboBox"); _OnValueChanged :
	 * 找到函数doValueChanged，其内调用的就是_OnValueChanged
	 */
	mini.CodeSelect = function () {
		mini.CodeSelect.superclass.constructor.call(this);
	}
	mini.extend(mini.CodeSelect, mini.ComboBox, {
		uiCls: "mini-codeselect",
		emptyText: "请选择..." ,
		textField: "text",
		valueField: "value",
		popupMaxHeight: 300,
		valueFromSelect:true,
		pinyinField:"py",
		allowInput:true,
		codeType: "",
		relatedObj:null,
		hasRelate:false,
		jsonKey:"dic",
		refurl:"",
		setRefurl:function(value){
			this.refurl = value;
		},
		getRefurl:function(){
			return this.refurl;
		},
		setJsonKey: function (value) {
			this.jsonKey = value;
		},
		getJsonKey: function () {
			return this.jsonKey;
		},
		qid:'',
		setQid: function (value) {
			this.qid = value;
		},
		getQid: function () {
			return this.qid;
		},
		//showNullItem:true,
		setCodeType: function (value) {
			this.codeType = value;
		},
		getCodeType: function () {
			return this.codeType;
		},
		
		fixData:function(data){     
			var newdata = data;
			if(typeof data=='string'){
				data = eval('(' + data + ')');
			}
			if (mini.isArray(data)){
				if(mini.isArray(data[0])){
					newdata = [];
					for(var i=0;i<data.length;i++){
						var code = {};
						code.value = data[i][0];
						code.text = data[i][1];
						newdata.push(code);
					}
				}
			}else if(data.data){
				return data.data;
			}
			return newdata;
		},
		setData:function(data){
			var newdata = this.fixData(data);
			mini.CodeSelect.superclass.setData.call(this,newdata);
		},
		/*功能不正常，屏蔽
		_OnValueChanged:function(){// _OnValueChanged补丁，触发事件的同时触发联动
			if ( this.hasRelate ) {
				var sf = this;
				setTimeout(function () {
					sf.changeRelate();
				}, 1);
			}
			mini.CodeSelect.superclass._OnValueChanged.call(this); // fixname
		},
		*/
		setValue:function(value){
			if ( this.hasRelate ) {
				var sf = this;
				setTimeout(function () {
					sf.changeRelate();
				}, 1);
			}
			mini.CodeSelect.superclass.setValue.call(this, value);
		},

		/*功能不正常，屏蔽，下拉框修正横向滚动条,这个方法现在有BUG,暂时屏蔽
		showPopup_暂时屏蔽: function () {
			mini.CodeSelect.superclass.showPopup.call(this);
			var popup = this.getPopup();
			var popupEl = popup.getBodyEl();
			var innerEl = mini.byClass('mini-listbox-view', popupEl);
		   
			
			var outerSize = new WIN_SizeInfo(popupEl);// 下拉框外部大小
			var innerSize = new WIN_SizeInfo(innerEl);// 下拉框内部大小
			var winSize = new WIN_SizeInfo(popupEl.ownerDocument.documentElement);// 窗体大小
			
			// 如果下拉框超过了窗体底部，修正高度
			var newHeight = popup.getHeight();
			if ( outerSize.offsetTop + outerSize.offsetHeight > winSize.clientHeight ){
				newHeight = winSize.clientHeight - outerSize.offsetTop -9;
				if ( newHeight>20 ){
					popupEl.style.height = newHeight + "px";
					popup.setHeight(newHeight);
					innerEl.style.height = newHeight + "px";
				}
			}
			
			// 如果下拉框往上弹出超过了窗体顶部，修正高度
			if ( outerSize.offsetTop<=0 ){
				popupEl.style.top = 9 + "px";
				newHeight = popupEl.scrollHeight + outerSize.offsetTop - 9;
				popupEl.style.height = newHeight + "px";
				popup.setHeight(newHeight);
				innerEl.style.height = newHeight + "px";
			} 
			
			WIN_SizeInfo_Copy( popupEl , outerSize );// 下拉框外部大小
			WIN_SizeInfo_Copy( innerEl , innerSize );// 下拉框内部大小
			// newHeight = newHeight -2;
			
			if(innerSize.scrollHeight>innerSize.clientHeight){
				newHeight = innerEl.offsetHeight+4;
			}else{
				newHeight = innerEl.clientHeight+4;
			}
			
			if( newHeight >outerSize.scrollHeight){
				newHeight = outerSize.scrollHeight;
			}
			innerEl.style.overflowY ="auto";
			innerEl.style.overflowX ="hidden";
			popupEl.style.overflow ="hidden";
			// 自动修正宽度防止横向滚动条
			// 先判断是否出现了滚动条，横向纵向都算
			// 如果是offsetHeight超过clientHeight很多，则认为出现了滚动条(正常是相等或者加边框宽度)
			// 如果scrollHeight超过了clientHeight,肯定出现了垂直滚动条
			if ( innerSize.scrollHeight>innerSize.clientHeight || innerSize.offsetHeight > innerSize.clientHeight+5 ){
				// 修正宽度
				var oldwidth = popup.getWidth();
			
				if(innerSize.scrollWidth-oldwidth>=2){
					var innerWidth = innerSize.scrollWidth;
					if( innerWidth<innerSize.offsetWidth)innerWidth=innerSize.offsetWidth;
					innerEl.style.width = innerWidth + "px";
					popup.setWidth(innerWidth);
				}
				WIN_SizeInfo_Copy( popupEl , outerSize );// 下拉框外部大小
				WIN_SizeInfo_Copy( innerEl , innerSize );// 下拉框内部大小
				var widthFix = outerSize.offsetWidth - innerSize.clientWidth;
				var newWidth = innerSize.scrollWidth + widthFix;
				
				if ( newWidth>oldwidth ){
					popupEl.style.width = newWidth + "px";
					popup.setWidth( newWidth+2 );
					innerEl.style.height = newHeight + "px";
					// 再判断次，如果还有滚动条，再进行修正
					{
						WIN_SizeInfo_Copy( popupEl , outerSize );// 下拉框外部大小
						WIN_SizeInfo_Copy( innerEl , innerSize );// 下拉框内部大小
						
						var newfix = innerSize.scrollWidth-innerSize.clientWidth;
		   
						if ( newfix>0 ){
	
							newWidth += newfix;
							popupEl.style.width = newWidth + "px";
							popup.setWidth( newWidth );
							innerEl.style.height = newHeight + "px";
							WIN_SizeInfo_Copy( popupEl , outerSize );// 下拉框外部大小
							WIN_SizeInfo_Copy( innerEl , innerSize );// 下拉框内部大小
							
						}
					}
					
					// 默认往右扩展，如果超出窗体边框，修正为往左扩展
					if( outerSize.offsetLeft + outerSize.scrollWidth > winSize.clientWidth ){
						popupEl.style.left = (outerSize.offsetLeft-(newWidth-oldwidth))+ "px";;
						WIN_SizeInfo_Copy( popupEl , outerSize );// 下拉框外部大小
					}
				}
	
			}
	 
		},
		//*/
		relateTo: function (obj) {// 级联绑定
			if ( obj instanceof mini.CodeSelect|| obj instanceof mini.AreaSelect){
				var dicCode="";
				try{
					dicCode = obj.getCodeType();
				}catch(e){

				}
				if ( !dicCode || dicCode==""){
					this.relatedObj = null;
					this.hasRelate = false;
					alert("二级下拉列表必须定义codeType属性");
					return;
				}
				this.relatedObj = obj;
				this.hasRelate = true;
				var sf = this;
				setTimeout(function () {
					sf.changeRelate();
				}, 1);
			}else{
				this.relatedObj = null;
				this.hasRelate = false;
			}
		},

		changeRelate:function(){// 级联动作
			var obj = this.relatedObj;
			if ( obj!=null ){
				var url =this.refurl || wssip.url.getUrl('dictionary');
				console.log('dictionary', url);


				var dicCode="";
				try{
					dicCode = obj.getCodeType();
				}catch(e){

				}
				if ( dicCode==""){
					alert("二级下拉列表必须定义codeType属性");
					return;
				}
				var parentCode = this.getValue();
				obj.setData([]);
				if(parentCode){
					obj.setUrl(url+"?type="+dicCode+"&parent="+parentCode+"&jsonKey="+obj.getJsonKey());
				}

				//if (obj.getText()==""){
					obj.select(0);
					try{
						obj.changeRelate();
					}catch(e){

					}
				//}
			}else{
				this.hasRelate = false;
			}
		},
		
		doFilter:function(filterCode){
			var url = wssip.url.getUrl('dictionary');
			console.log('dictionary', url);

			var dicCode="";
			try{
				dicCode = this.getCodeType();
			}catch(e){
				
			}
			if ( dicCode==""){
				alert("二级下拉列表必须定义codeType属性");
				return;
			}
			this.setUrl(url+"?type="+dicCode+"&parent="+filterCode+"&jsonKey="+this.getJsonKey());
			
		},
		getAttrs: function (el) {
			var attrs = mini.CodeSelect.superclass.getAttrs.call(this, el);
			mini._ParseString(el, attrs,["codeType","qid"]);
			if(attrs.qid && !attrs.url){
				attrs.url = attrs.qid;
			}
			if(!attrs.textField)attrs.textField = this.textField;
			if(!attrs.valueField)attrs.valueField = this.valueField;
			if(el.readOnly){
				attrs.emptyText=" ";
			}
			if(typeof(attrs.showNullItem)=='undefined'){
				attrs.showNullItem = false;
			}
			if(attrs.codeType && !attrs.url && !attrs.data ){
				var url = wssip.url.getUrl('dictionary');
				console.log('dictionary', url);
				if(url){
					attrs.url = url+"?type="+attrs.codeType;
				}else{
					alert("系统未指定代码接口(site.url.dictionary)");
				}
			}
			if(attrs.url=='#')attrs.url='';
				return attrs;
			}
	});
	mini.regClass(mini.CodeSelect, 'codeselect');
	mini.dic = {
		bind:function(){
			if(arguments.length<2){
				alert("请指定要级联的代码表");
				return;
			}
			var p = mini.get(arguments[0]);
			var c = mini.get(arguments[1]);
			if(!(p&&c)){
				alert("级联ID无效");
				return;
			}
			p.relateTo(c);
			p = c;
			for (var i = 2; i < arguments.length; i++){
				if(arguments[i]){
					c = mini.get(arguments[i]);
					p.relateTo(c);
					p = c;
				};
			}
		}
	};
	
	
	
	/**
	 * 扩展一个带分页的ListBox给AutoComplete用
	 */
	mini.WondersListBox = function () {
		mini.WondersListBox.superclass.constructor.call(this);
	}
	mini.extend(mini.WondersListBox, mini.ListBox, {
		uiCls: "mini-listbox-wonders",
		pager:null,
		pageSize:20,
		pageIndex:0,
		totalCount: 0,
		pagerHeight:0,
		sizeList: [10, 20, 50, 100],
		setPageSize:function(value){
			this.pageSize = value;
			if(this.pager)this.pager.setPageSize(this.pageSize);
		},
		setPageIndex:function(value){
			this.pageIndex = value;
			if(this.pager)this.pager.setPageIndex(this.pageIndex);
		},
		setTotalCount:function(value){
			this.totalCount = value;
			if(this.pager)this.pager.setTotalCount(this.totalCount);
		},
		setSizeList: function (value) {
			if (!mini.isArray(value)) return;
			this.sizeList = value;
			if(this.pager)this.pager.update();
		},
		doLayout: function (isValid) {
			mini.WondersListBox.superclass.doLayout.call(this,isValid);
			var h2 = mini.getHeight(this.O1olO0);
			var h = this.getHeight(true);
			if(h<1)return;
			h = h - h2 - this.pagerHeight;
			this.oo00oo.style.height = h + "px";
		},
		initPager:function(pageSize,sizeList){
			if(this.pager)return;
			if (typeof sizeList == "string") {
				sizeList = eval(sizeList);
			}
			this.pageSize = pageSize?pageSize:this.pageSize;
			this.sizeList = sizeList;
			
			this.pager = new mini.Pager();
			this._pagerEl = mini.append(this.o1lO1,'<div class="mini-pager-forlistbox"></div>');
			this.pager.setPageSize(this.pageSize);
			this.pager.setPageIndex(this.pageIndex);
			this.pager.setTotalCount(0);
			this.pager.setShowReloadButton(false);
			this.pager.render(this._pagerEl);
			this.pager.on("pagechanged", this.__OnPageChanged, this);
			this.pagerHeight = 27       
		},
		hasPager:function(){
			return !!this.pager;
		},
		__OnPageChanged: function (e) {
			this.pageIndex = e.pageIndex;
			this.pageSize = e.pageSize;
			this.fire("pagechanged", e);
		}
	});
	mini.regClass(mini.WondersListBox, 'wonderslistbox');
	
	
	/**
	 * min-WondersAutoComplete 自动完成标签
	 * 
	 * 版本修正： fixinput 允许选择记录后不清空内容 修正最小字符无效的bug 修正第二次操作同一人用鼠标选择无法触发change事件的bug
	 * 加载信息默认中文显示 增加setInputText用于强行设置文本框内容 wdutil.debug.print(new
	 * mini.AutoComplete(),"minAutoComplete"); __OnInputKeyDown： 搜索 ("keydown"
	 * 所在的函数即为__OnInputKeyDown _tryQuery: 查找doQuery函数，其内部调用的即为_tryQuery
	 * __OnItemClick: 查找beforeitemclick，所在函数即为__OnItemClick
	 */
	mini.WondersAutoComplete = function () {
		mini.WondersAutoComplete.superclass.constructor.call(this);
		var sf = this;
		this.lOl0O.onpaste = function () { // _textEl
			setTimeout(function(){
				sf.doQueryNow();
			},200);
		}
	}
	
	mini.extend(mini.WondersAutoComplete, mini.AutoComplete, {
		uiCls: "mini-autocomplete-wonders",
		delay:650,
		minChars:2,
		searchField:"query",
		popupLoadingText: "<span class='mini-textboxlist-popup-loading'>查询中...</span>",
		popupErrorText: "<span class='mini-textboxlist-popup-error'>查询出错</span>",
		popupEmptyText: "<span class='mini-textboxlist-popup-noresult'>无符合条件的数据</span>",
		qid:'',
		pageSize:20,
		showPager:false,
		sizeList: [10, 20, 50, 100],
		setPageSize:function(value){
			this.pageSize = value;
		},
		getPageSize:function(){
			return this.pageSize;
		},
		setSizeList: function (value) {
			this.sizeList = value;
		},
		getSizeList: function () {
			return this.sizeList;
		},
		setShowPager:function(value){
			this.showPager = value;
		},
		getShowPager:function(){
			return this.showPager;
		},
		setQid: function (value) {
			this.qid = value;
		},
		getQid: function () {
			return this.qid;
		},
		getData: function () {
			if(!this.data||!(this.data.length))return [];
			return this.data;  
		},
		focus:function(){
			return;
		},
		setText:function(text){
			if(this.fixinput){
				
			}else{
				mini.WondersAutoComplete.superclass.setText.call(this,text);
			}
		},
		setInputText:function(text){
			mini.WondersAutoComplete.superclass.setText.call(this,text);
		},
		_createPopup:function(){
			OO1OOl[lo01oo][oOol10][ll1011](this);
			this.o1ol = new mini.WondersListBox();
			this.o1ol[o1Oo0]("border:0;");
			this.o1ol[OO0ll1]("width:100%;height:auto;");
			this.o1ol[olll0](this.popup.lOol0);
			this.o1ol[OOO11O]("itemclick", this.O001, this);
			this.o1ol[OOO11O]("drawcell", this.__OnItemDrawCell, this);
			this.o1ol[OOO11O]("pagechanged", this.__OnPageChanged, this);
			this._listbox = this.o1ol;
			this.on("load",this._onload,this);
			this.on("beforeload",this._beforeload,this);
		},
		_beforeload:function(e){
			if(this._listbox.hasPager()){
				e.data.pageSize = this._listbox.pageSize;
				e.data.pageIndex = this._listbox.pageIndex;
			}
		},
		_onload:function(e){
			if(this._listbox.hasPager())this._listbox.setTotalCount(e.result.total);
		},
		__OnPageChanged:function(e){
			this.doQueryNow();
		},
		showPopup:function(){
			if(this.showPager && !this.hasPager){
				this._listbox.initPager(this.pageSize,this.sizeList);
				this.hasPager = true;
			}
			mini.WondersAutoComplete.superclass.showPopup.call(this);
		},
		ol00l1:function (e) {// fix __OnInputKeyDown
			if(this._listbox.hasPager())this._listbox.setPageIndex(0);
			if(!this.isShowPopup() && (e.keyCode == 13 || e.keyCode == 40 ) ){
				var ex = { htmlEvent: e };
				this.fire("keydown", ex);
				this.doQueryNow(this.getText());
			}else{
				mini.WondersAutoComplete.superclass.ol00l1.call(this,e);// fix
			}
		},
		doQueryNow:function(text){
			var olddelay = this.delay;
			this.delay = 100;
			mini.WondersAutoComplete.superclass.doQuery.call(this);
			this.delay = olddelay;
		},
		oOll1:function(oldText) {// _tryQuery
			var sf = this;
			if (this._queryTimer) {
				clearTimeout(this._queryTimer);
				this._queryTimer = null
			}
			this._queryTimer = setTimeout(function() {
				var text = sf.lOl0O.value;
				var len = text.length;
				try{
					len = text.lengthb();
				}catch(e){
				}
				if(len<sf.minChars){
					// 位数不足，不查询
				}else{
					sf.showPopup("loading");
					sf.looO1o(text); // _doQuery,参考_tryQuery代码修改
				}   
			},
			this.delay);
		},
		O001: function(e){// __OnItemClick
			this.setValue("123");
			mini.WondersAutoComplete.superclass.O001.call(this,e);
		},
		autoquery: true,
		setAutoquery: function (value) {
			this.autoquery = value;
		},
		getAutoquery: function () {
			return this.autoquery;
		},
		fixinput:true,
		setFixinput: function (value) {
			this.fixinput = value;
		},
		getFixinput: function () {
			return this.fixinput;
		},
		getAttrs: function (el) {
			
			var attrs = mini.WondersAutoComplete.superclass.getAttrs.call(this, el);
			mini._ParseBool(el, attrs,["autoquery","fixinput","showPager"] );
			mini._ParseInt(el, attrs,["minChars","pageSize"]);
			mini._ParseString(el, attrs,["qid","sizeList","onload"]);
			if(attrs.qid&&attrs.qid.charAt(0)=='/')attrs.qid = attrs.qid.substring(1);
			if(attrs.qid && !attrs.url && site){
				attrs.url = site.path.base+"ajaxpagequery/"+attrs.qid+"/";
			}
			if(attrs.showPager){
				this._listbox.initPager(attrs.pageSize,attrs.sizeList);
				this.hasPager = true;
			}
			return attrs;
		}
	}
	);
	mini.regClass(mini.WondersAutoComplete, 'wondersautocomplete');
	
	
	/**
	 * 列表控件 版本修正： 单元格默认居中显示 增加两种表格显示模式 wdutil.debug.print(new mini.DataGrid(),"miniDataGrid");
	 *  _OnDrawSummaryCell 暂无加密,修正下汇总金额格式与列格式一致
	 * _beginEditNextCell 暂无加密
	 */
	
	mini.WondersDataGrid = function () {
		mini.WondersDataGrid.superclass.constructor.call(this);
	}
	mini.extend(mini.WondersDataGrid, mini.DataGrid, {
		uiCls: "mini-datagrid-wonders",
		listmode:false,
		printmode:false,
		loadingMsg:'加载中......',
		defaultRowHeight: 22,
		cancelBottomBorder:true,
		dataform:'',
		setCancelBottomBorder: function (value) {
			this.cancelBottomBorder = value;
		},
		setListmode: function (value) {
			this.listmode = value;
		},
		getListmode: function () {
			return this.listmode;
		},
		setPrintmode: function (value) {
			this.printmode = value;
		},
		getPrintmode: function () {
			return this.printmode;
		},
		setDataform:function(form){
			this.dataform=form;
		},
		getDataform: function () {
			return this.dataform;
		},
		paramform:'',
		setParamform:function(form){
			this.paramform = form;
		},
		getParamform:function(){
			return this.paramform;
		},
		lastrowid:'',
		setLastrowid:function(lastrowid){
			this.lastrowid = lastrowid;
		},
		getLastrowid:function(){
			return this.lastrowid;
		},
		doLayout:function(){
			mini.WondersDataGrid.superclass.doLayout.call(this);
			if(this.printmode){
				mini.removeClass(this.el, "mini-printgrid-wonders");
				mini.addClass(this.el, "mini-printgrid-wonders");
			
				var data = this.getVisibleRows();
				if (data.length > 0) {
					var first = data[0];
					var startIndex = this.getVisibleRows().indexOf(first);
					this.removeRowCls(startIndex,"mini-grid-notop");
					this.addRowCls(startIndex,"mini-grid-notop");
				}
			}else if(this.listmode){
				mini.removeClass(this.el, "mini-listgrid-wonders");
				mini.addClass(this.el, "mini-listgrid-wonders");
			
				var data = this.getVisibleRows();
				if (data.length > 0) {
					var first = data[0];
					var startIndex = this.getVisibleRows().indexOf(first);
					var lastIndex = startIndex + data.length-1;
					for(var idx =startIndex;idx<=lastIndex;idx++ ){
						this.removeRowCls(idx,"mini-grid-nobottom");
					}
					if(this.cancelBottomBorder)this.addRowCls(lastIndex,"mini-grid-nobottom");
				}
			}
	
		},
		 _OnDrawSummaryCell:function(records, column) {
			var e = mini.WondersDataGrid.superclass._OnDrawSummaryCell.call(this, records, column);
			if (column.dataType == "float" && (e.value||e.value==0) && e.cellHtml==e.value && !isNaN(e.value) && e.value.toFixed) {
				var decimalPlaces = parseInt(column.decimalPlaces);
				if (isNaN(decimalPlaces)) decimalPlaces = 2;
				e.cellHtml = parseFloat(e.value).toFixed(decimalPlaces);
			}
			if(this.listmode && this.showSummaryRow){
				if(e.cellStyle)
					e.cellStyle= "border-top:0px;" + e.cellStyle;
				else{
					e.cellStyle= "border-top:0px;";
				}
				this.cancelBottomBorder = false;
				
			}
			
			if(column.summaryType=="sumtext"){
				e.cellHtml = "合计：";
			}
			
			return e;
		
		},
		getSelecteds:function (fix){
			var list = mini.WondersDataGrid.superclass.getSelecteds.call(this);
			if(fix){
				var fixlist = wdutil.clone(list);
				var len = fixlist.length;
				for(var i=0;i<len;i++){
					delete fixlist[i]._uid;
					delete fixlist[i]._id;
					delete fixlist[i]._state;
				}
				return fixlist;
			}else{
				return list;
			}
		},
		getData:function (fix){
			var list = mini.WondersDataGrid.superclass.getData.call(this);
			if(fix){
				var fixlist = wdutil.clone(list);
				var len = fixlist.length;
				for(var i=0;i<len;i++){
					delete fixlist[i]._uid;
					delete fixlist[i]._id;
					delete fixlist[i]._state;
				}
				return fixlist;
			}else{
				return list;
			}
		},
		showExcelButton:false,
		setShowExcelButton: function (value) {
			this.showExcelButton = value;
		},
		getShowExcelButton: function () {
			return this.showExcelButton;
		},
		qid:'',
		setQid: function (value) {
			this.qid = value;
		},
		getQid: function () {
			return this.qid;
		},
		hideColumn:function(){
			for (var i = 0; i < arguments.length; i++){
				mini.WondersDataGrid.superclass.hideColumn.call(this, arguments[i]);
			}
		},
		showColumn:function(){
			for (var i = 0; i < arguments.length; i++){
				mini.WondersDataGrid.superclass.showColumn.call(this, arguments[i]);
			}
		},
		__OnSourceBeforeLoad:function(e){
			this.fire("beforeload", e);
			if(!e.data)e.data={};
			if(this.paramform){
				var form = new mini.Form("#"+this.paramform);
				if(form){
					var data = form.getData();
					mini.copyTo(e.data,data);
				}
				
			}
			e.data.cacheResult = this.cacheResult;
			if (e.cancel == true) return;
			if (this.showLoading) this[oOlloO]()
		},
		__OnSourceLoadSuccess:function(e){
			mini.WondersDataGrid.superclass.__OnSourceLoadSuccess.call(this, el);
			if(this.lastrowid && this.selectOnLoad){
				var my = this;
				var row = my.findRow(function(row){
					if(row[my.idField] == my.lastrowid) return true;
				});
				if(row){
					this.select(row);
				}
			}
		},
		_OnDrawCell:function(){
			var e = mini.WondersDataGrid.superclass._OnDrawCell.apply(this, arguments);
			if(this.drawCellRule){
				var record = e.record;
				try{
					for(var i=0,l=this.drawCellRule.length;i<l;i++){
						var rule = this.drawCellRule[i];
						if(record[rule.key]==rule.value){
							if (e.cellStyle) {
								e.cellStyle += "color:"+rule.color+";";
							} else {
								e.cellStyle = "color:"+rule.color+";";
							}
						}
					}
				}catch(e){
					
				}
			}
			return e;
		},
		O11O:function(e){//__OnSelectionChanged
			if (e.fireEvent !== false) {
				if (e.select) {
					this.fire("rowselect", e);
				} else {
					this.fire("rowdeselect", e);
				}
			}
			var me = this;
			if (this.l0o0l) {
				clearTimeout(this.l0o0l);
				this.l0o0l = null;
			}
			this.l0o0l = setTimeout(function () {
				me.l0o0l = null;
				if (e.fireEvent !== false) {
					me.fire("SelectionChanged", e);
					if(e.selected){
						me._setRelateFormData(e.selected);
						me.lastrowid = e.selected[me.idField];
					}
					
				}
			}, 1);
			this._doRowSelect(e._records, e.select);
			
		},
		_setRelateFormData:function(row){
			if(this.dataform){
				var ids = this.dataform.split(",");
				for(var i=0,l=ids.length;i<l;i++){
					var form = new mini.Form("#"+ids[i]);
					if(form){
						form.setData(row);
						form.setIsValid(true);
						form.validate();
					}
				}
				this.fire("afterdatashow",row);
			}
		},
		_getColumns:function(){
			var columns = this.getBottomColumns().clone();
			for (var i = columns.length - 1; i >= 0; i--) {
				var column = columns[i];
				if (!column.field) {
					columns.removeAt(i);
				} else {
					var c = { header: column.header, field: column.field };
					columns[i] = c;
				}
			}
			return columns;
		},
		
		exportExcel:function(params){
			var excel = wdutil.clone(this._excelparam);
			wdutil.copy(params,excel);
			excel.columns = this._getColumns();
			var page = this._dataSource.loadParams;
			
			var e = {
					data: page,
					cancel: false
				};
			this.fire("beforeload", e);
			var param = e.data;
			//wdutil.debug.print({param:param,excel:excel,page:page});
			var url = this.url;
		if(params && params.exportUrl){//edided by 77ng 增加导出链接设置
			url =   params.exportUrl;
		} else {
			if(!this.isCommonQuery && url){
				url = url.replace("/query","/export/page");
			}else{
				url = site.path.base+"export/page/"+this.qid+"/";
			}
		}
		if(excel && excel.usepage){//edided by 77ng 原来是params.usepage
			param.usepage = true;
		}
			if(!page)page={};
			page.cacheResult = this.cacheResult;
			wdutil.exportExcel({
				url: url,
				param:param,
				excel:excel,
				page:page
			});
		},
		_excelparam:{
			type:'xls',
			filename:'unknow',
			title:'',
			columns:null,
			headerborder:'true',
			rowborder:'true',
			useindexcoloumn:'false',
			template:'',
			fontname:'宋体',
			codes:null
		},
		setExcelParam:function(param){
			wdutil.copy(param,this._excelparam);
		},
		cacheResult:false,
		getCacheResult:function(){
			return this.cacheResult;
		},
		setCacheResult:function(value){
			this.cacheResult = value;
		},
		isCommonQuery:false,
		drawCellRule:null,
		getAttrs: function (el) {
			this.setPageSize(20);
			var attrs = mini.WondersDataGrid.superclass.getAttrs.call(this, el);
			mini._ParseBool(el, attrs,["listmode","printmode","showExcelButton","cacheResult"] );
			
			mini._ParseString(el, attrs,["qid","dataform","paramform","onafterdatashow","drawCellRule","baseparam"]);
			if(attrs.qid&&attrs.qid.charAt(0)=='/')attrs.qid = attrs.qid.substring(1);
			if(attrs.qid && !attrs.url && site.path.base){
				attrs.url = site.path.base+"ajaxpagequery/"+attrs.qid+"/";
				if(attrs.baseparam){
					attrs.url = attrs.url + attrs.baseparam +"/"
				}
				this.isCommonQuery = true;
			}
	  
			if(attrs.drawCellRule){
				this.drawCellRule = eval("("+attrs.drawCellRule+")");
				delete attrs.drawCellRule;
			}
			
			if(attrs.showExcelButton){
				var excelbutton =  new mini.Button();
				excelbutton.render(this._bottomPager._barEl);
				excelbutton.setText("导出全部");
				excelbutton.setIconCls("icon-excel");
				excelbutton.setPlain(true);
		
				excelbutton.on("click", function (e) {
					this.exportExcel({});
				}, this);
				
				this._bottomPager.excelButton = excelbutton;
				
				var excelbutton2 =  new mini.Button();
				excelbutton2.render(this._bottomPager._barEl);
				excelbutton2.setText("导出本页");
				excelbutton2.setIconCls("icon-excel");
				excelbutton2.setPlain(true);
		
				excelbutton2.on("click", function (e) {
					this.exportExcel({usepage:true});
				}, this);
				
				this._bottomPager.excelButton2 = excelbutton2;
			}
			
			if(attrs.listmode||attrs.printmode){
				if(attrs.listmode && !attrs.showVGridLines){
					attrs.showVGridLines=false;
				}
				attrs.showPager = false;
				attrs.allowSortColumn = false;
				attrs.allowMoveColumn = false;
				attrs.allowResizeColumn = false;
				attrs.allowResize = false;
				if(typeof attrs.allowCellWrap =="undefined"){
					attrs.allowCellWrap=true;
				}
				if(typeof attrs.allowHeaderWrap =="undefined"){
					attrs.allowHeaderWrap=true;
				}
			}else{
				if(typeof attrs.allowAlternating =="undefined"){
					attrs.allowAlternating=true;
				}
			}

			if(attrs.columns && attrs.columns.length){
				var maxlen = attrs.columns.length-1;
				for(var i=0;i<=maxlen;i++){
					if(!attrs.columns[i].align){
						attrs.columns[i].align="center";
						if(!attrs.columns[i].cellStyle){
							attrs.columns[i].cellStyle = "text-align:center;"
						}
					}
					if(!attrs.columns[i].headerAlign){
						attrs.columns[i].headerAlign="center";
					}
					if(i==maxlen){
						var headerStyle = attrs.columns[i].headerStyle;
						if(!headerStyle)headerStyle="";
						attrs.columns[i].headerStyle="border-right:0px;"+headerStyle;
						
						var cellStyle = attrs.columns[i].cellStyle;
						if(!cellStyle)cellStyle="";
						attrs.columns[i].cellStyle="border-right:0px;"+cellStyle;
					}
					if(i==0){
						var ss = attrs.columns[i].cellStyle;
						if(ss){
							ss += "border-left:0px;";
						}else{
							ss = "border-left:0px;";
						}
						attrs.columns[i].cellStyle=ss;
					}
				}
			}
			return attrs;
		}
	});

	mini.regClass(mini.WondersDataGrid, 'datagridwonders');




	mini.WondersMenu = function() {
		this._initMenus();
		mini.WondersMenu.superclass.constructor.call(this);

	}

	mini.extend(mini.WondersMenu, mini.Control, {
		uiCls : "mini-menu-wonders",
		url: "",
		textField: "name",
		iconField: "iconcls",
		idField: "menuid",
		parentField: "parentid",
		nodesField: "children",
		urlField:"url",
		_create : function() {
			this.el = document.createElement("div");
			this.el.className = this.uiCls;
			this.el.innerHTML = '<div class="mini-menu-wonders-border"></div>';
			this._contentEl = this.el.firstChild;
		},
		destroy : function(removeEl) {
			this.menus = [];
			mini.WondersMenu.superclass.destroy.call(this, removeEl);
		},
		__isLoader : false,
		_createTab : function() {
			if (this.menus.length == 0)
				return;
			if (this.__isLoader)
				return;
			this.__isLoader = true;
		},
		set : function(obj) {
			if (typeof obj == 'string') {
				return this;
			}
			mini.WondersMenu.superclass.set.call(this, obj);
			this._createTab();
			return this;
		},
		_initEvents: function () {
			
		},
		_initMenus : function() {
			this.menus = [];
		},
		createNavBarTree:function(items){
			var menus = []
			var html = "";
			for(var i=0,l=items.length;i<l;i++){
				var head = items[i];
				var groupEl = mini.append(this._contentEl, '<div class="mini-menu-wonders-group"></div');
				mini.append(groupEl, '<h3>'+head.text+'</h3>');
				var menuEl = mini.append(groupEl, '<ul class="menulist"></ul>');
				if(head.children && head.children.length>0){
					for(var j=0,m=head.children.length;j<m;j++){
						var children = head.children[j];
						children.el = mini.append(menuEl, '<li class="mini-menu-wonders-item"><a href="javascript:void(0);" mid="'+children.menuid+'">'+children.text+'</a></li>');
						menus.push(children);
					}
				}
			}
			this.menus = menus;
			mini.on(this._contentEl, "click", this.__OnClick, this);
		},
		__OnClick:function(e){
			var obj = e.target;
			if(obj && (obj.tagName=="A"||obj.tagName=="a")){
				var mid = obj.getAttribute("mid");
				if(mid){
					for(var i=0,l=this.menus.length;i<l;i++){
						var menu = this.menus[i];
						mini.removeClass(menu.el, "cur");
						if(menu.menuid==mid){
							mini.addClass(menu.el, "cur");
							
							var url = menu.url;
							if(url.charAt(0)=="/"){
								url = url.substring(1);
							}
							if(url.indexOf("?")>0){
								url = url + "&_mid="+menu.menuid;
							}else{
								url = url + "?_mid="+menu.menuid;
							}
							var node = {};
							if(site)node.url = site.path.base + url;
							else node.url = url;
							node.name = (menu.description?menu.description:menu.name);
							node.resourcepath = menu.resourcepath;
							this.fire("click", node);
						}
					}
				}
			}
		},
		_doParseFields: function (list) {
			for (var i = 0, l = list.length; i < l; i++) {
				var o = list[i];
				o.text = o[this.textField];
				o.url = o[this.urlField];
				o.iconCls = o[this.iconField];
			}
		},
		_doLoad: function () {
			 
			var items = [];

			try {
				items = mini._getResult(this.url, null, null, null, null, this.dataField);
			} catch (ex) {
				if (mini_debugger == true) {
					alert("json is error.");
				}
			}
			if (this.dataField && !mini.isArray(items)) {
				items = mini._getMap(this.dataField, items);
			}
			if (!items) items = [];

			items = mini.arrayToTree(items, this.nodesField, this.idField, this.parentField)
			var list = mini.treeToArray(items, this.nodesField, this.idField, this.parentField)
			this._doParseFields(list);
			
			this.createNavBarTree(items);
		},
		setUrl: function (value) {
			this.url = value;
			this._doLoad();
		},
		getUrl: function () {
			return this.url;
		},
		setTextField: function (value) {
			this.textField = value;
		},
		getTextField: function () {
			return this.textField;
		},
		setIconField: function (value) {
			this.iconField = value;
		},
		getIconField: function () {
			return this.iconField;
		},
		setIdField: function (value) {
			this.idField = value;
		},
		getIdField: function () {
			return this.idField;
		},
		setParentField: function (value) {
			this.parentField = value;
		},
		getParentField: function () {
			return this.parentField;
		},
		
		getAttrs : function(el) {
			var attrs = mini.WondersMenu.superclass.getAttrs.call(this, el);
			mini._ParseString(el, attrs, [ "textField", "idField","parentField","url","iconField","onclick"]);

			return attrs;
		}
	});
	mini.regClass(mini.WondersMenu, 'miniwondersmenu');


	mini._getFunction = function (fnName) {
		if (typeof fnName != "string") return fnName;
		var names = fnName.split(".");
		var fn = null;
		for (var i = 0, l = names.length; i < l; i++) {
			var name = names[i];
			if (!fn) fn = window[name];
			else fn = fn[name];
			if (!fn) break;
		}
		return fn;
	}

	mini.WondersButton = function() {
		mini.WondersButton.superclass.constructor.call(this);
	}
	mini.action={baseurl:""};
	mini.extend(mini.WondersButton, mini.Button, {
		uiCls : "mini-button-wonders",
		url: "",
		form:null,
		grid:null,
		win:null,
		action:"",
		method:"",
		mask:'',
		field:"",
		inited:false,
		params:{},
		callback:null,
		setParams:function(value){
			this.params = value;
		},
		setMethod:function(value){
			this.method = value;
		},
		addRowToGrid:function(result){
			
			if(this.grid && result && result.data){
				this.grid.addRow(result.data);
			}
			return true;
		},
		updateGridRow:function(result){
			if(this.grid && result && result.data){
				var row = this.grid.getSelected(); 
				this.grid.updateRow(row,result.data);
				this.grid.acceptRecord(row);
			}
			return true;
		},
		removeGridRow:function(){
			if(this.grid){
				this.grid.removeRow(this.grid.getSelected(),true);
			}
			return true;
		},
		doGridQuery:function(result){
			if(this.grid){
				if(result && result.data && result.data[this.grid.idField]){
					this.grid.setLastrowid(result.data[this.grid.idField]);
				}else if(result && result[this.grid.idField]){
					this.grid.setLastrowid(result[this.grid.idField]);
				}
				this.grid.reload();
			}
			return true;
		},
		doSubmit:function(data){
			var url = this.url;
			if(!url && mini.action.baseurl && this.method){
				url = mini.action.baseurl + this.method;
			}
			if(!url){
				alert("未设定url");
				return;
			}
			var my = this;
			
			wdutil.submit({
				url:url,
				data:data,
				success:function(result){
					var ret = false;
					if(my.callback){
						ret = my.callback(result);
					}
					if(my.win){
						my.win.hide();
					}
					return ret;
				}
			});
		},
		doFormSubmit:function(){
			if(!this.form){
				return;
			}
			this.form.validate();//校验
			if (this.form.isValid() == false) {
				wdutil.win.alert("请正确填写数据");
				return;
			}
			var formdata = this.form.getData();
			
			var data={};
			if(this.field){
				var fields = this.field.split(",");
				for(var i=0,l=fields.length;i<l;i++){
					data[fields[i]] = formdata[fields[i]];
				}
			}else{
				data = formdata;
			}
			mini.copyTo(data,this.params);
			var e = {cancel:false,data:data};
			this.fire("dataready",e);
			if(e.cancel)return;
			this.doSubmit(data);
		},
		doRequest:function(){
			var data={};
			mini.copyTo(data,this.params);
			var e = {cancel:false,data:data};
			this.fire("dataready",e);
			if(e.cancel)return;
			var url = this.url;
			if(!url && mini.action.baseurl && this.method){
				url = mini.action.baseurl + this.method;
			}
			if(!url)return;
			var my = this;
			wdutil.request({
				mask:my.mask,
				url:url,
				data:data,
				success:function(result){
					var ret = false;
					if(my.callback){
						ret = my.callback(result);
					}
					if(my.win){
						my.win.hide();
					}
					return ret;
				}
			});
		},
		doFormDelete:function(){
			var ff = this;
			wdutil.win.confirm("确定要删除吗？",function(isok){
				if(isok){
					ff.doFormSubmit();
				}
			});
		},
		hideWin:function(){
			if(this.win){
				this.win.hide();
				if(this.callback){
					return this.callback();
				}
			}
		},
		doGridSubmit:function(){
			if(!this.grid){
				return;
			}
			var data={};
			var rows = this.grid.getSelecteds();
			if(rows && rows.length>0){
				var field=this.field;
				if(!field)field = this.grid.idField;
				data[field] = wdutil.joinList(rows,field,",");
			}else{
				return;
			}
			mini.copyTo(data,this.params);
			var e = {cancel:false,data:data};
			this.fire("dataready",e);
			if(e.cancel)return;
			this.doSubmit(data);
		},
		doGridDelete:function(){
			var ff = this;
			wdutil.win.confirm("确定要删除吗？",function(isok){
				if(isok){
					ff.doGridSubmit();
				}
			});
		},
		showWinAndGrid:function(){
			if(this.win){
				this.win.show();
				if(this.grid){
					this.grid.reload();
				}
				if(this.callback){
					return this.callback();
				}
			}
		},
		showWin:function(){
			if(this.win){
				var data={};
				if(this.form){
					this.form.setData(data);
				}
				this.win.show();
				if(this.callback){
					return this.callback();
				}
			}
		},
		showGridTailInWin:function(){
			if(this.win){
				var data={};
				if(this.grid){
					data = this.grid.getSelected();
				}else return;
				if(!data)return;
				if(this.form){
					this.form.setData(data);
				}
				this.win.show();
				if(this.callback){
					return this.callback();
				}
			}
		},
		doAction:function(){
			if(!this.inited){
				if(this.form){
					this.form = new mini.Form("#"+this.form);
				}
				if(this.grid){
					this.grid = mini.get(this.grid);
				}
				if(this.win){
					this.win = mini.get(this.win);
				}
				this.inited = true;
			}
			if(this[this.action]){
				this[this.action]();
			}
		},
		getAttrs : function(el) {
			var attrs = mini.WondersButton.superclass.getAttrs.call(this, el);
			mini._ParseString(el, attrs, [ "url", "form","field","grid","win","action","params","callback","ondataready","mask","method"]);
			if(attrs.params){
				this.params = eval('(' + attrs.params + ')');
				delete attrs.params;
			}
			if(attrs.callback){
				if(this[attrs.callback]){
					this.callback = this[attrs.callback];
				}else{
					this.callback = mini._getFunction(attrs.callback);
				}
				delete attrs.callback;
			}
			
			this.on("click", this.doAction);
			return attrs;
		}
	});
	mini.regClass(mini.WondersButton, 'miniwondersbutton');




	mini.WondersTree = function() {
		mini.WondersTree.superclass.constructor.call(this);
	}
	mini.extend(mini.WondersTree, mini.TreeGrid, {
		uiCls : "mini-treegrid-wonders",
		url: "",
		drawCellRule:null,
		isCommonQuery:false,
		_OnDrawCell: function (record, column, rowIndex, columnIndex){
			var e = mini.TreeGrid.superclass._OnDrawCell.call(this, record, column, rowIndex, columnIndex);
			if (this._treeColumn && this._treeColumn == column.name) {
				if(this.drawCellRule){
					var node = e.node;
					try{
						for(var i=0,l=this.drawCellRule.length;i<l;i++){
							var rule = this.drawCellRule[i];
							if(node[rule.key]==rule.value){
								if (e.nodeStyle) {
									e.nodeStyle += "color:"+rule.color+";";
								} else {
									e.nodeStyle = "color:"+rule.color+";";
								}
							}
						}   
					 
					}catch(ex){
						
					}
				}
				
				this.fire("drawnode", e);
				if (e.nodeStyle) {
					e.cellStyle = e.nodeStyle;
				}
				if (e.nodeCls) {
					e.cellCls = e.nodeCls;
				}
				if (e.nodeHtml) {
					e.cellHtml = e.nodeHtml;
				}
				this._createTreeColumn(e);
			}
			return e;
		},
		lastrowid:'',
		setLastrowid:function(lastrowid){
			this.lastrowid = lastrowid;
		},
		getLastrowid:function(){
			return this.lastrowid;
		},
		qid:'',
		setQid: function (value) {
			this.qid = value;
		},
		getQid: function () {
			return this.qid;
		},
		__OnSourceBeforeLoad:function(e){
			this.fire("beforeload", e);
			if(!e.data)e.data={};
			if(this.paramform){
				var form = new mini.Form("#"+this.paramform);
				if(form){
					var data = form.getData();
					mini.copyTo(e.data,data);
				}
				
			}
			if (e.cancel == true) return;
			if (this.showLoading) this.loading()
		},
		__OnSourceLoadSuccess:function(e){
			mini.WondersTree.superclass.__OnSourceLoadSuccess.call(this, el);
			if(this.lastrowid && this.selectOnLoad){
				var my = this;
				var nds = my.findNodes(function(node){
					if(node[my.idField] == my.lastrowid) return true;
				});
				if(nds && nds[0]){
					this.selectNode(nds[0]);
					this.scrollIntoView(nds[0]);
				}
			}
		},
		hideColumn:function(){
			for (var i = 0; i < arguments.length; i++){
				mini.WondersTree.superclass.hideColumn.call(this, arguments[i]);
			}
		},
		showColumn:function(){
			for (var i = 0; i < arguments.length; i++){
				mini.WondersTree.superclass.showColumn.call(this, arguments[i]);
			}
		},
		isEditingNode:function(node){
			return false;
		},
		paramform:'',
		setParamform:function(form){
			this.paramform = form;
		},
		getParamform:function(){
			return this.paramform;
		},
		getAttrs: function (el) {
			var attrs = mini.WondersTree.superclass.getAttrs.call(this, el);
			mini._ParseString(el, attrs,["qid","drawCellRule","paramform"]);
			if(attrs.qid&&attrs.qid.charAt(0)=='/')attrs.qid = attrs.qid.substring(1);
			if(attrs.qid && !attrs.url && site){
				attrs.url = site.path.base+"ajaxquery/"+attrs.qid+"/";
				this.isCommonQuery = true;
			}
			if(attrs.drawCellRule){
				this.drawCellRule = eval("("+attrs.drawCellRule+")");
				delete attrs.drawCellRule;
			}
		
			return attrs;
		}
	});
	mini.regClass(mini.WondersTree, 'miniwonderstree');
	
	/** 树节点在同层节点中的索引 */
	mini.Tree.prototype.getIndexOfSiblings = mini.TreeGrid.prototype.getIndexOfSiblings = function(node, callback) {
		var brotherNdoes = this.getSiblings ( node );
		var idx = -1;
		if (brotherNdoes) {
			var idField = this.idField || 'id';
			for(var i=0;i<brotherNdoes.length;i++) {
				if (typeof callback === "function" && callback(brotherNdoes[i], i) === true) {
					idx = i;
					break;
				} else if (brotherNdoes[i] == node || brotherNdoes[i][idField] === node[idField]) {
					idx = i;
					break;
				}
			}
			return idx;
		} else {
			return idx;
		}
	}
	
	/** 树节点的同层节点 */
	mini.Tree.prototype.getSiblings = mini.TreeGrid.prototype.getSiblings = function( node ) {
		var parentNode = this.getParentNode ( node );
		if (parentNode) {
			return this.getChildNodes ( parentNode );
		} else {
			return null;
		}
	}
	
	/**
	 * DataGrid字典Renderer
	 */
	mini.DataGrid.dictRenderer = function(e, dict, idField, textField) {

		//字典字段
		idField = idField || 'id';
		textField = textField || 'text';

		if (!dict || (!e.value && e.value !== 0)) {
			return '';
		} else {
			for(var i=0;i<dict.length;i++) {
				if (e.value == dict[i][idField]) {
					return dict[i][textField];
				}
			}
			return '未知';
		}

	}
	
	/**
	 * DataGridjson字典Renderer
	 */
	mini.DataGrid.urlRenderer = function (e, url, idField, textField) {

		//字典字段
		idField = idField || 'id';
		textField = textField || 'text';
		
		//minigrid
		var grid = e.sender;
		
		//当前行
		var row = grid.getRow ( e.rowIndex );
		
		//当前列
		var column = grid.getColumn ( e.columnIndex );

		//当前行数据
		var rowData = e.record;
		
		var dicKey = e.field + '_dic';
		var dicLoadinKey = dicKey + '_loading';
		var dicQueueKey = dicKey + '_queue';
		var $body = $(document.body);
		var dict = $body.data(dicKey);
		//字典数据空，则加载数据
		if (dict == undefined && $body.data(dicLoadinKey) == undefined) {
			//标记加载中
			$body.data(dicLoadinKey, true);
			$.get(url, function(data){
				console.log(data);
				var result = (typeof data == 'string')?eval(data):data;

				dict = result.data || result;
				$body.data(dicKey, dict);
				
				//更新当前行，没找到单元格更新办法，只有整行更新。
				grid.updateRow(row, rowData);

				$body.removeData(dicLoadinKey);
				var queue = $body.data(dicQueueKey) || [];
				for(var i=0;i<queue.length;i++) {
					queue[i].call(e.sender, e.sender, dict);
				}
				$body.removeData(dicQueueKey);
			});
		} if ($body.data(dicLoadinKey) == true) {
			//加载中，添加队列填表队列
			var queue = $body.data(dicQueueKey) || [];
			queue.push(function(sender, dict){
				/*
				var headerCellEl = grid.getHeaderCellEl (column );
				console.log(headerCellEl);

				console.log($(headerCellEl).attr('codeType'));

				var cellEl = grid.getCellEl(row, column);
				console.log(cellEl);

				$('td div',cellEl).html(mini.DataGrid.dictRenderer(e, dict, idField, textField));
				//*/
				
				//更新当前行，没找到单元格更新办法，只有整行更新。
				grid.updateRow(row, rowData);
			});
			$body.data(dicQueueKey, queue);
		} else if(dict) {
			//数据字典存在，则填表
			return mini.DataGrid.dictRenderer(e, dict, idField, textField);
		} else {
			//字典未找到
			return 'X';
		}
	}

	mini.DataGrid.urlRendererFactory = function (type, parent) {
		return function (e) {
			var url = wssip.url.getUrl('dictionary') + '?type=' + type+ '&parent=' + parent;
			return mini.DataGrid.urlRenderer(e, url, 'id', 'text');
		}
	}

})(window, jQuery, mini, wdutil)
