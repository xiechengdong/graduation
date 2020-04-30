; (function ($, window, name) {
	if ((name in window) && window[name]['url']) {
		return;
	}

	var defaultSiteConfig = {
		path: {
			base: '',//基础路径
			pages: 'pages',//页面路径
			styles: 'css',//css路径
			scripts: 'js',//javascript路径
			images: 'images',//图片路径
			components: 'lib'//ui库路径
		},
		url: {
			login: '/main/login.html',//登陆页面
			loginCheck: '/auth/login',//登陆验证
			logout: '/auth/logout',//登出
			captcha: '/auth/captcha',//验证码
			menu: '/auth/menu',//菜单
			user: '/auth/user',//用户信息
			dictionary:''
		}
	};

	var methods = $.extend(
		window[name] || {}, {
			"url": {
				/**
				 * 得到配置路径
				 * @param path，配置名称
				 * @returns {{mode, path, debug, _mid, skin, alertEnabled, url, crypto, _murl}|{mode, path, debug, skin, url}|site.path|{images, components, pages, data, styles, scripts, base}|site.path|site.path|*}
				 */
				"getPath" : function (path) {
					//获取config.js 配置
					var pathConfig = window.site && window.site.path && window.site.path[path];
					if (pathConfig === undefined) {
						//获取默认配置
						pathConfig = defaultSiteConfig.path[path];
					}
					//配置的path处理
					if (pathConfig !== undefined) {
						//base直接返回
						if (path === 'base') {
							return pathConfig;
						} else {
							path = pathConfig;
						}
					}

					//递归获取base
					var base = this.getPath('base');

					//除了base，以外，相对路径，需要加上base
					if (base && !path.startsWith('/')) {
						return base + '/' + path;
					} else {
						return path;
					}
				},
				"getBasePath" : function () {
					return this.getPath('base');
				},
				"getPagesPath" : function () {
					return this.getPath('pages');
				},
				"getStylesPath" : function () {
					return this.getPath('styles');
				},
				"getImagesPath" : function () {
					return this.getPath('images');
				},
				"getComponentsPath" : function () {
					return this.getPath('components');
				},
				'getConfigUrl' : function(url) {
					var configUrl = window.site && window.site.url && window.site.url[url] || defaultSiteConfig.url[url];
					if (configUrl) console.log('getConfigUrl', url, configUrl);
					return configUrl;
				},
				/**
				 * 获取路径，如果存在配置路径则取出配置路径
				 * @param url
				 * @returns {*}
				 */
				'getUrl' : function(url) {
					var configUrl = this.getConfigUrl(url);
					if (configUrl) {
						url = configUrl;
					}
					if (url && url.indexOf('//')===-1) {
						url = this.getBasePath() + url;
					}
					return url;
				},
				"getPageUrl" : function (url) {
					var configUrl = this.getConfigUrl(url);
					if (configUrl) {
						url = configUrl;
					}
					if (url && url.indexOf('//')===-1) {
						url = this.getPagesPath() + url;
					}
					return url;
				},
				'getLoginUrl' : function() {
					return this.getPageUrl('login');
				},
				'getLoginCheckUrl' : function() {
					return this.getUrl('loginCheck');
				},
				'getLogoutUrl' : function() {
					return this.getUrl('logout');
				},
				'addUrlParam' : function(url, params) {
					var u = Url(url);
					u.params = $.extend(u.params || {} , params);
					return u.toString();
				},
				'getParam' : function(paramName) {
					return this.curUrl && this.curUrl.params[paramName];
				},
				'init' : function() {
					if (!this.curUrl) {
						this.curUrl = Url();
					}
				}
			}
		});

	$(function () {
		methods.url.init();
	});

	window[name] = methods;

})(jQuery, window, 'wssip')
