/**
 * 消息框框封装
 *   移植至万达业务框架，用layer实现
 * 依赖:
 *      jquery
 *      layer
 * 版本：1.0.0
 * 修改记录：
 *   2016-09-18 确定版本号 1.0.0
 */
; (function ($, layer, window) {

	'use strict';


	if (typeof $ === 'undefined') {
		throw new Error("jQuery not loaded!");
	}

	if (typeof mini === 'undefined') {
		throw new Error("miniui not loaded!");
	}

	var layerwin = {
		config: {
			icon: 0,
			//屏蔽浏览器滚动条
			scrollbar: false
		},
		/** 顶层窗口 */
		getTop:function() {
			var topwin = top["wonderstopwin"];
			if (!topwin)
				topwin = window;
			return topwin;
		},
		/** 顶层窗口Ui库 */
		getTopUi:function() {
			return (this.getTop() && this.getTop().layer) || (top && top.layer) || layer;
		},
		alert:function(msg, callback, icon, title){
			var me = this;
			var options = {
				title: '提示信息'
			};
			if (typeof icon !=='undefined') options.icon = icon;
			if (typeof title !=='undefined') options.title = title;
			if (msg) msg = msg.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
			this.getTopUi().alert(msg, options , function(index){
				if (typeof (callback) == "function") {
					if (callback.apply(this) === false) return;
				}
				me.getTopUi().close(index);
				//如果是未登录或登录失效，则刷新页面
				if(msg.startsWith('EC-30101001')){
					window.location.reload();
				}
			});
		},
		info:function(msg, callback){
			this.alert(msg, callback, 6);
		},
		warn:function(msg, callback){
			this.alert(msg, callback, 0);
		},
		error:function(msg, callback){
			this.alert(msg, callback, 5, '错误信息');
		},
		mask:function(msg, title){
			if (typeof msg !=='undefined') {
				var options = {icon: 16, shade: 0.3, time: 0};
				if (typeof title !=='undefined') options.title = title;
				this.getTopUi().maskIndex = this.getTopUi().msg(msg, options);
			} else {
				this.getTopUi().load(1,{
					shade: [0.3,'#ccc'] //0.1透明度的白色背景
				});
			}
		},
		unmask:function(id){
			if (this.getTopUi().maskIndex) {
				this.getTopUi().close(this.getTopUi().maskIndex);
				delete this.getTopUi().maskIndex;
			}
			this.getTopUi().closeAll('loading');
		},
		confirm:function(msg, title, callback) {
			var me = this;
			var me = this;
			var options = {
				icon: 3,
				title: '确认信息'
			};
			if (typeof title ==='string') options.title = title;
			if (typeof title ==='function') callback = title;
			me.getTopUi().confirm(msg, options, function(index){
				if (typeof (callback) == "function") {
					if (callback.apply(this, [true]) === false) return;
				}
				me.getTopUi().close(index);
			}, function(index){
				if (typeof (callback) == "function") {
					if (callback.apply(this, [false]) === false) return;
				}
				me.getTopUi().close(index);
			});
		},

		prompt:function(msg, formType, callback) {
			var me = this;
			if (typeof formType ==='function') {
				callback = formType;
				formType = 0;
			}
			var options = {
				title: msg,
				formType: 0 //prompt风格，支持0-2，0（文本）默认1（密码）2（多行文本）
			};
			if (formType === true) {
				options.formType = 2;
			} else if (typeof formType !=='undefined') {
				options.formType = formType;
			}
			me.getTopUi().prompt(options, function(value, index, elem){
				if (typeof (callback) == "function") {
					if (callback.apply(this, [value]) === false) return;
				}
				me.getTopUi().close(index);
			});
		},

		open:function(param){
			param = param || {};

			var defaultParam = {
				type : 1,// 类型
				title : false,// 标题
				area : [ '640px', '480px' ]
			};

			if(!param.area) {
				//高度宽度单位转换
				if (isNumber(param.width)) param.width = param.width + 'px';
				if (isNumber(param.height)) param.height = param.height + 'px';

				//宽度，高度参数转换
				if (param.width) {
					if (param.height) {
						param.area = [ param.width, param.height ];
						delete param.height;
					} else {
						param.area = param.width;
					}
					delete param.width;
				}
			} else {
				delete param.height;
				delete param.width;
			}

			wdutil.copy(defaultParam, param, true, true);//追加默认参数

			if(param.uid) {
				if (top.__win_parameter == undefined) top.__win_parameter = {};
				top.__win_parameter[param.uid] = param.data;
			}

			var index = layer.open(param);

			return index;
		},

		getParameter:function(uid) {
			//return top["currentwin"].wdutil.win.__win_parameter[uid];
			//* edited by rinco ,解决win中在开win丢失参数的问题
			return top.__win_parameter[uid];
			//*/
		},
		_logoutflag:false,
		relogin:function(){
			if(this._logoutflag)return;
			this._logoutflag = true;
			this.warn("未登录或已超时，请重新登录","提示信息",function(){
				wssip.auth.login();
				/*
				setTimeout(function(){
					top.location = GSiteInfo.base;
				},1);
				*/
			});
		}
	}
	if (typeof wdutil === 'undefined') wdutil = {};
	window.layerwin = layerwin;
	window.wdutil.win = layerwin;
})(jQuery, layer, window)


