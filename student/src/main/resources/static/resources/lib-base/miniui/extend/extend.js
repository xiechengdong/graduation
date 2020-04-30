/**
 * miniUI对象属性扩展
 */
mini.VTypes["phoneErrorText"] = "请输入正确的电话号码";
	mini.VTypes["phone"] = function (v) {
		if(!v)return true;
        var re = new RegExp("^[0-9\-]+$");
        if (re.test(v)) return true;
        return false;
}
	
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
        var re = new RegExp("^[a-zA-Z\_]+$");
        return re.test(v);

    }

    /* 是否英文+数字 */
    function isEnglishAndNumber(v) {
        
        var re = new RegExp("^[0-9a-zA-Z\_]+$");
        return re.test(v);

    }

    /* 是否汉字 */
    function isChinese(v) {
        var re = new RegExp("^[\u4e00-\u9fa5]+$");
        return re.test(v);

    }

    /*自定义vtype*/
    mini.VTypes["englishErrorText"] = "请输入英文";
    mini.VTypes["english"] = function (v) {
        var re = new RegExp("^[a-zA-Z\_]+$");
        return re.test(v);

    };
        
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
            if(!v){
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
            if(!text){
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
	        if(c.type=='textbox'){
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
function callMiniLayout(){
	setTimeout(function() {
		mini.layout();
	}, 100);
}

/**
 * 修正miniui的ajax访问
 */
mini.ajax = function(options) {
	if($.win.isLogout())return;
	if (!options.dataType) {
		options.dataType = "text";
	}
	if (!options.url) {
		if (typeof (options.success) == "function") {
			options.success("");
		}
		return;
	}
	if(options.url.charAt(0)=="q" && options.url.charAt(1) == ":"){
        options.url = options.url.substring(2);
        if(options.url.charAt(0)=='/')options.url=options.url.substring(1);
        if(!options.headers)options.headers={};
        options.headers["x-flag-page"] = "1";
        options.headers["x-ajax"] = "1";
    }

    return $.util.ajax._ajax(options);
};




/**
 * 下拉字典表
 */
mini.CodeSelect = function () {
    mini.CodeSelect.superclass.constructor.call(this);
};
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
    _OnValueChanged:function(){// _OnValueChanged补丁，触发事件的同时触发联动
        if ( this.hasRelate ) {
            var sf = this;
            setTimeout(function () {
                sf.changeRelate();
            }, 1);
        }
        mini.CodeSelect.superclass._OnValueChanged.call(this); // fixname
    },

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
            var url =this.refurl;
            if (!url){
                if( typeof(__DICRELATE_URL__)==='string'){
                    url = __DICRELATE_URL__;
                }else{
                    alert("系统未指定级联接口(__DICRELATE_URL__)");
                    return;
                }
            }


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
                obj.setUrl(url+"?dicCode="+dicCode+"&parentCode="+parentCode+"&jsonKey="+obj.getJsonKey());
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
        var url ='';
        if( typeof( __DICRELATE_URL__ )==='string'){
            url = __DICRELATE_URL__;
        }else{
            alert("系统未指定代码接口(__DICRELATE_URL__)");
            return;
        }
        var dicCode="";
        try{
            dicCode = this.getCodeType();
        }catch(e){

        }
        if ( dicCode==""){
            alert("二级下拉列表必须定义codeType属性");
            return;
        }
        this.setUrl(url+"?dicCode="+dicCode+"&parentCode="+filterCode+"&jsonKey="+this.getJsonKey());

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
            if( typeof(__DICRELATE_URL__)==='string'){
                attrs.url = __DICRELATE_URL__+"?dicCode="+attrs.codeType;
            }else{
                alert("系统未指定代码接口(__DICRELATE_URL__)");
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
        for (i = 2; i < arguments.length; i++){
            if(arguments[i]){
                c = mini.get(arguments[i]);
                p.relateTo(c);
                p = c;
            };
        }
    }
};


mini.doaction=function(action,args){
    for (i = 0; i < args.length; i++){
        if(args[i]){
            var o = mini.get(args[i]);
            if(o)o[action]();
        }
    }
};

//显示组件
mini.show=function(){
    mini.doaction("show",arguments);
};

//隐藏组件
mini.hide=function(){
    mini.doaction("hide",arguments);
};

//锁定区域
mini.lock=function(elid){
    var el = document.getElementById(elid);
    mini.mask({
        el:el,
        cls: 'icon-lock',
        html: '&nbsp;&nbsp;&nbsp;&nbsp;',
        backStyle:"background-color: #101010;"
    });
};

//解锁区域
mini.unlock=function(elid){
    var el = document.getElementById(elid);
    mini.unmask(el);
};

