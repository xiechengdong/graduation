/**
 * 区划级联，这是针对扶贫开发的模块，用于其他项目时需要参考修改相关字段和url
 * */
mini.AreaSelect = function () {
    mini.AreaSelect.superclass.constructor.call(this);
}
mini.extend(mini.AreaSelect, mini.CodeSelect, {
    uiCls: "mini-areaselect",
    textField: "name",
    valueField: "code",
    setValue:function(value){
    	mini.AreaSelect.superclass.setValue.call(this,value);
    	//if(value==''){
    		this.changeRelate();
    	//}
    },
    setReadOnlyValue:function(code,name){
    	this.setData([{code:code,name:name}]);
    	this.setReadOnly(true);
    	this.removeCls("readonly");
    	this.addCls("readonly");
    	mini.AreaSelect.superclass.setValue.call(this,code);
    },
    getAttrs: function (el) {
        var attrs = mini.AreaSelect.superclass.getAttrs.call(this, el);
        mini._ParseString(el, attrs,["parentCode","nodefault"]);
        attrs.refurl = __AREASELECT_URL__;
        var defaultValue = '';
        if(attrs.name=='azc001'){
        	attrs.emptyText = "省(区，市)";
        	defaultValue = _AZC001_;
        }else if(attrs.name=='azc002'){
        	attrs.emptyText = "市(地、州、盟)";
        	defaultValue = _AZC002_;
        }else if(attrs.name=='azc003'){
        	attrs.emptyText = "县(市、区、旗)";
        	defaultValue = _AZC003_;
        }else if(attrs.name=='azc004'){
        	attrs.emptyText = "镇(乡)";
        	defaultValue = _AZC004_;
        }else if(attrs.name=='azc005'){
        	attrs.emptyText = "行政村";
        	defaultValue = _AZC005_;
        }
        
        if(!attrs.nodefault && defaultValue){
    		this.setValue(defaultValue);
    		this.setDefaultValue(defaultValue);
        	this.setReadOnly(true);
        	this.removeCls("readonly");
        	this.addCls("readonly");
        }
        this.setCnname(attrs.emptyText);
        attrs.nullItemText = "所有";
        attrs.showNullItem = true;
        attrs.clearOnLoad = true;
        attrs.valueFromSelect = true;
        attrs.allowInput=false;
        return attrs;
    }
});
mini.regClass(mini.AreaSelect, 'areaselect');


$.util.bindAreaSelect = function(parentid, childid) {
    var parent = mini.get(parentid);
    var child = mini.get(childid);
    if ((parent instanceof mini.AreaSelect) && (child instanceof mini.AreaSelect)) {
        child.setCodeType('Area');
        parent.relateTo(child);
    } else {
        alert("只能对[mini-areaselect]组件进行绑定");
    }
};

$.util.BindAreaAll = function() {
    var azc001obj = mini.get("azc001");
    var azc001objs = mini.get("azc001s");
    var azc002obj = mini.get("azc002");
    var azc002objs = mini.get("azc002s");
    var azc003obj = mini.get("azc003");
    var azc003objs = mini.get("azc003s");
    var azc004obj = mini.get("azc004");
    var azc004objs = mini.get("azc004s");
    var azc005obj = mini.get("azc005");
    var azc005objs = mini.get("azc005s");
    if (azc001obj){
        if (_AZC001_){
            azc001obj.setReadOnlyValue(_AZC001_,_NAME1_);
        }else{
            azc001obj.setUrl(__AREASELECT_URL__+'?parentCode=100');
        }

        if (azc002obj){
            if (_AZC002_){
                azc002obj.setReadOnlyValue(_AZC002_,_NAME2_);
            }else{
                azc002obj.setCodeType('Area');
                azc001obj.relateTo(azc002obj);
            }

            if (azc003obj){
                if (_AZC003_){
                    azc003obj.setReadOnlyValue(_AZC003_,_NAME3_);
                }else{
                    azc003obj.setCodeType('Area');
                    azc002obj.relateTo(azc003obj);
                }

                if (azc004obj){
                    if(_AZC004_){
                        azc004obj.setReadOnlyValue(_AZC004_,_NAME4_);
                    }else{
                        azc004obj.setCodeType('Area');
                        azc003obj.relateTo(azc004obj);
                    }

                    if (azc005obj){
                        if(_AZC005_){
                            azc005obj.setReadOnlyValue(_AZC005_,_NAME5_);
                        }else{
                            azc005obj.setCodeType('Area');
                            azc004obj.relateTo(azc005obj);
                        }
                    }

                }
            }
        }
    }
    if (azc001objs){
        if (_AZC001_){
            azc001objs.setReadOnlyValue(_AZC001_,_NAME1_);
        }else{
            azc001objs.setUrl(__AREASELECT_URL__+'?parentCode=100');
        }

        if (azc002objs){
            if (_AZC002_){
                azc002objs.setReadOnlyValue(_AZC002_,_NAME2_);
            }else{
                azc002objs.setCodeType('Area');
                azc001objs.relateTo(azc002objs);
            }

            if (azc003objs){
                if (_AZC003_){
                    azc003objs.setReadOnlyValue(_AZC003_,_NAME3_);
                }else{
                    azc003objs.setCodeType('Area');
                    azc002objs.relateTo(azc003objs);
                }

                if (azc004objs){
                    if(_AZC004_){
                        azc004objs.setReadOnlyValue(_AZC004_,_NAME4_);
                    }else{
                        azc004objs.setCodeType('Area');
                        azc003objs.relateTo(azc004objs);
                    }

                    if (azc005objs){
                        if(_AZC005_){
                            azc005objs.setReadOnlyValue(_AZC005_,_NAME5_);
                        }else{
                            azc005objs.setCodeType('Area');
                            azc004objs.relateTo(azc005objs);
                        }

                    }
                }
            }
        }
    }
};