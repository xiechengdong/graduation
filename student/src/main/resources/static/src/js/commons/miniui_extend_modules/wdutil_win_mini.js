/**
 * 消息框，弹窗工具类
 * 基于miniui实现
 * 依赖：jQuery,miniui
 */
; (function ($, mini, window, wdutil, name) {

	'use strict';

	if (typeof $ === 'undefined') {
		throw new Error("jQuery not loaded!");
	}

	if (typeof mini === 'undefined') {
		throw new Error("miniui not loaded!");
	}

	var miniwin = {
		/** 顶层窗口 */
		getTop:function() {
			var topwin = top["wonderstopwin"] || top || window;

			return topwin;
		},
		/** 顶层mini组件,用于显示全屏的弹出信息框等。 */
		getTopMini:function() {
			return (this.getTop() && this.getTop().mini) || mini;
		},
		/** 顶层body,用于显示全屏的遮罩等。 */
		getTopBody:function() {
			return this.getTop().document.body;
		},
		/**
		 * 通用弹窗
		 * @param text 文本
		 * @param title 标题
		 * @param cls 图标class
		 * @param cb 回调函数
		 * @returns {*}
		 * @private
		 */
		_show:function(text, title, cls, cb){
			var me = this;

			if (!text) {
				text = "";
			} else {
				text = mini.clone(text);
				if(mini.isArray(text)) text = text.join('<br/>');
				text = text.replace("\n", "<br/>")
			}
			title = mini.clone(title) || "提示信息";
			return this.getTopMini().showMessageBox({
				title : title,
				iconCls : cls,
				buttons : [ "ok" ],
				message : text,
				callback : function(action) {
					if (typeof (cb) == "function") {
						cb.apply(this, arguments);
					}
				}
			});
		},
		info:function(text, title, callback){
			if (typeof (title) == "function" && callback == undefined) {
				callback = title;
				title = "提示信息";
			}
			return this._show(text, title, "mini-messagebox-info", callback);
		},
		alert:function(text, title, callback){
			if (typeof (title) == "function" && callback == undefined) {
				callback = title;
				title = "提示信息";
			}
			return this._show(text, title, "mini-messagebox-warning", callback);
		},	
		warn:function(text, title, callback){
			return this.alert(text, title, callback);
		},		
		error:function(text, title, callback){
			if (typeof (title) == "function" && callback == undefined) {
				callback = title;
				title = "错误信息";
			}
			return this._show(text, title, "mini-messagebox-error", callback);
		},
		mask:function(msg, title){
			msg = mini.clone(msg);
			if(title){
				return this.getTopMini().loading(msg, title);
			}else{
				this.getTopMini().mask({
					el: this.getTopBody(),
					cls: 'mini-mask-loading',
					html: msg?msg:"..."
			    });
			}
			
		},
		unmask:function(id){
			if(id){
				this.getTopMini().hideMessageBox(id);
			}else{
				this.getTopMini().unmask(this.getTopBody());
			}
		},
		confirm:function(msg, title, callback) {
			var me = this;
			msg = mini.clone(msg) || "";
			if (typeof (title) == "function" && callback == undefined) {
				callback = title;
				title = "确认信息";
			}
			this.getTopMini().confirm(msg.replace("\n", "<br/>"), title, function(action) {
				if (typeof (callback) == "function") {
					if (action == "ok") {
						callback.apply(this, [true]);
					} else {
						callback.apply(this, [false]);
					}
				}
			});
		},
		prompt:function(msg, callback, isMulti) {
			var me = this;
			msg = mini.clone(msg) || "";
			this.getTopMini().prompt(msg.replace("\n", "<br/>"), "请输入", function(action, value) {
				if (typeof (callback) == "function") {
					if (action == "ok") {
						callback.apply(this, [value]);
					}
				}
			}, isMulti);
		},
		__win_parameter: {},
		open:function(param){
			param = param || {};
			if (param.type == "win"){
				//默认浏览器窗口
				var ob = {
						height : 600,
						width : 800,
						top : 0,
						left : 0,
						toolbar : 0,
						menubar : 0,
						scrollbars : 0,
						resizable : 0,
						location : 'no',
						status : 1
				};
				wdutil.copy(param, ob);
				var maxHeight = screen.availHeight - 20;
				var maxWidth = screen.availWidth;
				if (ob.height > maxHeight)
					ob.height = maxHeight;
				if (ob.width > maxWidth)
					ob.width = maxWidth;
				ob.top = (maxHeight - ob.height) / 2;
				ob.left = (window.screen.width - ob.width) / 2;
				var s = "";
				for ( var key in ob) {
					s += key + "=" + ob[key] + ",";
				}
				s += "depended=yes";
				
				if (!param.data) {
					param.data = {};
				}
				if (!(param.ignorenull == false)) {
					param.ignorenull = true;
				}
				var paramstr = "";
				for ( var key in param.data) {
					if (!param.data[key] && param.ignorenull)continue;
					paramstr = paramstr + "&" + key +"=" + EncodeUtf8(param.data[key]);	
				}
				return window.open(param.url + "?e=1" + paramstr, "newwin", s);
			} else {
				var defaultParam = {
					title : '信息',// 标题
					width : 800,// 宽度
					height : 600,// 高度
					allowResize : true,// 允许尺寸调节
					allowDrag : true,// 允许拖拽位置
					showCloseButton : true,// 显示关闭按钮
					showMaxButton : true,// 显示最大化按钮
					showModal : true// 显示遮罩(模态)
				};
				if (param.max) {
					delete param.max;
					param._onload = param.onload;
					param.onload = function() {
						this.max();
						if (typeof (param._onload) == 'function') param._onload.apply(this);
					}
				}
				wdutil.copy(defaultParam, param, true, true);//追加默认参数
				this.getTop()["currentwin"] = window;
				//if(param.uid)this.__win_parameter[param.uid] = param.data;
				//* edited by rinco ,解决win中在开win丢失参数的问题
				if(param.uid) {
					if (this.getTop().__win_parameter == undefined) this.getTop().__win_parameter = {};
					this.getTop().__win_parameter[param.uid] = param.data;
				}
				//*/
				var win = mini.open(param);
				return win;
			}
		},
		openMini:function(param){
			param = param || {};
			var defaultParam = {
				title : '信息',// 标题
				width : 800,// 宽度
				height : 600,// 高度
				allowResize : true,// 允许尺寸调节
				allowDrag : true,// 允许拖拽位置
				showCloseButton : true,// 显示关闭按钮
				showMaxButton : true,// 显示最大化按钮
				showModal : true// 显示遮罩(模态)
			};
			var max = param.max;
			delete param.max;
			var url = param.url;
			param.url = "about:blank";

		    if (url && url.indexOf("_winid") == -1) {
		    	param.data = $.extend(param.data || {}, {"_winid": mini._WindowID});
		    }
			
			var _onload = param.onload;
			param.onload = function() {
				var	iframe = this.getIFrameEl();
				var	contentWindow = iframe.contentWindow;
				var	contentDocument = contentWindow.document;
				
				mini['url_html'] = mini['url_html'] || {};
				
				if (!mini['url_html'][param.uid || param.data._winid]) {
					$.get(url,param.data,function(html){
						contentDocument.open('text/html', 'replace');
						contentDocument.write(html);
						contentDocument.close();
						mini['url_html'][param.uid || param.data._winid] = html;
					},"html");
					
				} else {
					contentDocument.open('text/html', 'replace');
					contentDocument.write(mini['url_html'][param.uid || param.data._winid]);
					contentDocument.close();
				}


				if (max) this.max();
				if (typeof (_onload) == 'function') _onload.apply(this);
			}
			wdutil.copy(defaultParam, param, true, true);//追加默认参数
			this.getTop()["currentwin"] = window;
			//if(param.uid)this.__win_parameter[param.uid] = param.data;
			//* edited by rinco ,解决win中在开win丢失参数的问题
			if(param.uid) {
				if (this.getTop().__win_parameter == undefined) this.getTop().__win_parameter = {};
				this.getTop().__win_parameter[param.uid] = param.data;
			}
			//*/
			var win = mini.open(param);
			return win;
		},
		/**
		 *刷新页面
		 */
		doSomethingAfterAjax:function(){
			if (mini && mini.callMiniLayout) mini.callMiniLayout();
		},
		getParameter:function(uid) {
			//return this.getTop()["currentwin"].miniwin.__win_parameter[uid];
			//* edited by rinco ,解决win中在开win丢失参数的问题
			return this.getTop().__win_parameter[uid];
			//*/
		},
		_logoutflag:false,
		relogin:function(){
			var me = this;
			if(this._logoutflag) return;
			this._logoutflag = true;
			this.alert("未登录或已超时，请重新登录","提示信息",function(){
				setTimeout(function(){
					me.getTop().location = site.url.login;
				},1);
			});
		}
	}
	window[name] = miniwin;

	wdutil.win = miniwin;
})(jQuery, mini, window, wdutil, 'miniwin')
