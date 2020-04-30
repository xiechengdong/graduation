/*!
 * 权限检查
 *
 */
; (function( factory ) {

	"use strict";


	//标准模块化写法, 可以在这里加入模块依赖
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}

}(function( $ ) {

	var options = {};

	var methods = {
		/**
		 * 弹出登陆窗,未完成
		 */
		login: function () {
			console.log('登陆');
			var loginUrl = wssip.url.getLoginUrl();
			loginUrl = wssip.url.addUrlParam(loginUrl, {'winmode' : 'popup'});
			wdutil.win.open({
				type:'mini', //mini.open方式，自动居中和拼接参数到url
				uid:'relogin',//唯一码，用于参数传递
				data:{},//传递参数, 列表页面和窗体页面是不同页面，不能直接访问变量，可以通过这种方式传递参数
				url:loginUrl,
				title:'用户登陆',
				height : 400,
				width :	480,
				showMaxButton: false,	  //显示最大化按钮
				showCloseButton: true,   //显示关闭按钮
				allowResize: false,		  //允许尺寸调节
				showModal: true,		 //显示遮罩
				//窗口关闭事件
				ondestroy: function (action) {
					var iframe = this.getIFrameEl();
					if (action == "close" ) {
						return true;
					} else {
						return true;
					}
				},//ondestroy
				onload:	function ()	{
					var	iframe = this.getIFrameEl();
				}
			});
			return;
		},
		/**
		 * 跳转登陆页面
		 */
		goLogin: function () {
			var loginUrl = wssip.url.getUrl('login');
			setTimeout(function(){
				top.location = loginUrl;
			},10);
		},
		/**
		 * 判断是否拥有权限
		 * @param authority
		 * @param callback
		 * @returns {*}
		 */
		hasAuthority: function (authority, callback) {
			var me = this;
			if (typeof callback === 'function') {
				if (!this._isDataLoaded()) {
					this._load(function () {
						callback.call(me, me._authorizeHasAuthority(authority));
					});
					return true;
				}
			}
			return me._authorizeHasAuthority(authority);
		},
		/**
		 * 判断是否拥有角色
		 * @param role
		 * @param callback
		 * @returns {*}
		 */
		hasRole: function (role, callback) {
			var me = this;
			if (typeof callback === 'function') {
				if (!this._isDataLoaded()) {
					this._load(function () {
						callback.call(me, me._authorizeHasRole(role));
					});
					return true;
				}
			}
			return me._authorizeHasRole(role);
		},
		/**
		 * 检查权限，刷新整个页面
		 * @returns {*|void}
		 */
		checkAuth: function () {
			var me = this;
			return me._checkAuth();
		},
		_load: function (callback, reload) {
			var me = this,
				userUrl = wssip.url.getUrl('user');

			//第一各参数如果不是function,则认为第一个参数是reload标志
			if (typeof callback !=='function') {
				callback = null;
				reload = callback;
			}

			//是否重新加载，否则跳过加载
			if (this._isDataLoaded() && reload !== true) {
				callback && callback.call(me);
				return;
			}

			//加载后处理队列
			if (me.afterLoad === undefined) me.afterLoad = [];

			//把加载后处理放到队列中
			callback && me.afterLoad.push(callback);

			//如果正在加载，这返回
			if (me.loading) return;

			//标记加载状态，防止重复加载
			me.loading = true;

			//请求用户数据wdutil.request
			$.ajax({
				type: 'post',
	            url: userUrl,
				dataType: 'json',
				success: function (data) {
					console.log('user load finished!');
					//数据格式处理
					if (typeof data === "string") data = wdutil.json.parse(data);
					if (data && data.data) data = data.data;
					me.data = data;
					me.loading = false;
					//加载结束后响应后续操作，如果有队列执行队列所有操作
					if(me.afterLoad && me.afterLoad.length) {
						while(me.afterLoad && me.afterLoad.length) {
							me.afterLoad.pop().call(me);
						}
					} else {
						//如果没有回调，默认检查权限
						me._checkAuth();
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					delete me.data;
					me.loading = false;
					console.log('request error!', XMLHttpRequest, textStatus, errorThrown);
				}
			});
		},
		_isDataLoaded: function(){

			//判断是否加载数据，TODO 需要加入超时检查
			return this.data !== undefined && this.data !== null;

		},
		_authorizeHasAuthority: function (authorityString) {
			var me = this;
			var getAuthority = /hasAuthority\((.*)\)/.exec(authorityString);
			var authority = getAuthority && getAuthority[1];
			if (!authority) authority = authorityString;
			//console.log(authority);

			if (this._isDataLoaded() && this.data.authorities) {
				for(var i=0;i<this.data.authorities.length;i++) {
					if (this.data.authorities[i].authority === authority) {
						return true;
					}
				}
			}

			return false;
		},
		_authorizeHasRole: function (roleString) {
			var getRole = /hasRole\((.*)\)/.exec(roleString);
			var role = getRole && getRole[1];
			if (!role) role = roleString;
			//console.log(role);
			if (this._isDataLoaded() && this.data.roles) {
				for(var i=0;i<this.data.roles.length;i++) {
					if (this.data.roles[i].code === role) {
						return true;
					}
				}
			}

			return false;
		},
		_checkAuth: function () {
			var me = this;
			//先加载用户数据
			if (!this._isDataLoaded()) {
				this._load(function () {
					this._checkAuth();
				})
				return;
			}

			$('[data-authorize]').not(":disabled").not(":hidden").each( function() {
				var element = $(this);
				var authc = methods._checkElement(element);
				if (!authc) {
					if (element.is('body')) {
						me.goLogin();
					} else {
						element.hide();
					}
				}
			});
		},
		_checkElement: function (element) {
			var authorizesSring = element.attr('data-authorize');

			if (!authorizesSring)
				return false;

			return methods._orAuthorizes(authorizesSring);
		},
		_orAuthorizes: function (authorizesSring) {
			var authorizes = authorizesSring.split(/\s+or\s+/);
			for (var i = 0; i < authorizes.length; i++) {
				authorizes[i] = $.trim( authorizes[i].toString() );//.toString to worked on IE8
				// Remove any parsing errors
				if (authorizes[i] !== '') {
					if (methods._andAuthorizes(authorizes[i])) return true;
				}
			}
			return false;
		},
		_andAuthorizes: function (authorizesSring) {
			var authorizes = authorizesSring.split(/\s+and\s+|\s*,\s*/);
			for (var i = 0; i < authorizes.length; i++) {
				authorizes[i] = $.trim( authorizes[i].toString() );//.toString to worked on IE8
				if (authorizes[i]) {
					var auth = false;
					if (authorizes[i].indexOf("hasAuthority") == 0) {
						auth = methods._authorizeHasAuthority(authorizes[i]);
					} else if (authorizes[i].indexOf("hasRole") == 0) {
						auth = methods._authorizeHasRole(authorizes[i]);
					} else {
						auth = methods._authorizeHasAuthority(authorizes[i]);
					}
					if (!auth) {
						return false;
					}
				}
			}
			return true;
		},
		_empty: null
	}


	$.extend(
		window['wssip'] || {}, {
			'auth' : methods
		}
	);

	$(function () {
		if ($('[data-authorize]').length) {
			methods._checkAuth();
		} else {
			console.log('need not auth!')
		}
	});

	return $;
}));
