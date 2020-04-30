/**
 * 脚本加载入口
 */
; (function (window) {

		'use strict';

		var boot = {
			//读取配置文件设置，debug,mock
			debug: undefined,
			mock: undefined,
			miniui: true,
			loadResources: undefined
		};

		boot._getScriptPath = function (js) {
			var scripts = document.getElementsByTagName('script');
			var path = '';
			for (var i = 0, l = scripts.length; i < l; i++) {
				var obj = scripts[i];
				var src = obj.src;
				if (this._urlMatch(js, src)) {
					path = this._getBasePath(js, src);
					//优先读取页面设置，debug,mock,miniui
					if (obj.getAttribute('debug')) boot.debug = (obj.getAttribute('debug') === 'true');
					if (obj.getAttribute('mock')) boot.mock = (obj.getAttribute('mock') === 'true');
					if (obj.getAttribute('miniui')) boot.miniui = (obj.getAttribute('miniui') !== 'false');
					boot.loadResources = obj.getAttribute('load-resources');
					break;
				}
			}
			var href = location.href;
			//去掉参数
			href = href.split('#')[0];
			href = href.split('?')[0];
			var ss = href.split('/');
			ss.length = ss.length - 1;
			href = ss.join('/');
			if (path.indexOf('https:') == -1 && path.indexOf('http:') == -1 && path.indexOf('file:') == -1 && path.indexOf('\/') != 0) {
				path = href + '/' + path;
			}
			return path;
		}

		boot._urlMatch = function (src, dec) {
			if (!src || !dec) {
				return false;
			}
			var _dec = dec.split('?')[0];
			if (!_dec) {
				return false;
			}
			var idx = _dec.indexOf(src);
			return (idx === _dec.length - src.length);
		};

		boot._getFile = function (url) {
			var _url = url && url.split('#')[0];
			_url = _url && _url.split('?')[0];
			var _paths = _url && _url.split('/');
			return _paths && _paths[_paths.length - 1];
		};

		boot._getFileExt = function (url) {
			var _file = this._getFile(url);
			var _fileParts = _file && _file.split('.');
			if (_fileParts && _fileParts.length > 1) {
				return _fileParts[_fileParts.length - 1];
			} else {
				return null;
			}
		};

		boot._getPath = function (url) {
			var _paths = url && url.split('/');
			_paths.pop();
			return _paths.join('/');
		};

		boot._getBasePath = function (path, url) {
			if (path) {
				return url && url.split(path)[0];
			} else {
				return this._getPath(url);
			}
		};

		boot._getFullPath = function (file) {
			if (file && file.indexOf('//') === -1) {
				var fullPath = this.bootPATH + file;

				if (file.indexOf('/src/') === 0) {
					fullPath = this.bootPATH + '/..' + file;
				}

				console.log(fullPath);
				return fullPath;
			} else {
				return file;
			}
		};

		boot._loadScript = function (file) {
			document.write('<script src="' + this._getFullPath(file) + '"></script>');
		};

		boot._loadCss = function (file) {
			document.write('<link href="' + this._getFullPath(file) + '" rel="stylesheet" type="text/css" />');
		};

		boot._loadResource = function (file) {
			var fielExt = this._getFileExt(file);
			if (fielExt === 'js') {
				this._loadScript(file);
			} else if (fielExt === 'css') {
				this._loadCss(file);
			} else {
				console && console.log && console.log('file not javascript or css', file);
			}
		};

		//===========================================================
		// 加载样式文件

		boot.init = function () {

			this.bootPATH = this._getScriptPath('/core/js/commons/boot.js');

			if (this.miniui) {

				//sssmini_debugger = this.debug;

				this._loadCss('/core/css/miniui.css');

				/* miniui */
				//this._loadCss('/lib-base/miniui/themes/default/miniui.css');
				/* miniui skin */
				//this._loadCss('/lib-base/miniui/themes/metro-white/skin.css');
				/* miniui mode */
				//this._loadCss('/lib-base/miniui/themes/default/medium-mode.css');

			}
			/* Bootstrap 3.3.7 */
			//this._loadCss('/lib/bootstrap/dist/css/bootstrap.min.css');
			/* Font Awesome */
			//this._loadCss('/lib/font-awesome/css/font-awesome.min.css');
			/* Ionicons */
			//this._loadCss('/lib/ionicons/css/ionicons.min.css');
			/* Theme style */
			this._loadCss('/core/css/style.css');

			//===========================================================
			//加载脚本

			//配置文件
			if (this.debug) {
				this._loadScript('/../src/js/configs.js');
			} else {
				this._loadScript('/js/configs.js');
			}

			//jQuery
			this._loadScript('/lib/jquery/dist/jquery.min.js');

			//公共脚本，基础工具类
			if (this.debug) {
				this._loadScript('/../src/js/commons/commons.js');
			} else {
				this._loadScript('/core/js/commons/commons.js');
			}

			if (this.miniui) {
				this._loadScript('/lib-base/miniui/miniui.js');
				if (this.debug) {
					this._loadScript('/../src/js/commons/miniui_extend.js');
				} else {
					this._loadScript('/core/js/commons/miniui_extend.js');
				}
			} else {
				this._loadCss('/lib/layer/dist/theme/default/layer.css');
				this._loadScript('/lib/layer/dist/layer.js');
				this._loadScript('/core/js/commons/wdutil_win_layer.js');
			}

			/* Bootstrap 3.3.7 */
			//this._loadScript('/lib/bootstrap/dist/js/bootstrap.min.js');
			/* Slimscroll */
			//this._loadScript('/lib/jquery-slimscroll/jquery.slimscroll.js');
			/* FastClick */
			//this._loadScript('/lib/fastclick/lib/fastclick.js');


			//===========================================================
			//加载其他资源文件
			if (this.loadResources) {
				var loadResources = this.loadResources.split(/\s*,\s*/);
				for (var i = 0; i < loadResources.length; i++) {
					this._loadResource(loadResources[i]);
				}
			}

			//加入测试数据
			if (this.mock) {

				//mockjs
				this._loadScript('/lib/mockjs/dist/mock-min.js');
				this._loadScript('/../src/js/commons/wssip_mock_extend.js');

				//mockdata
				this._loadScript('/../mock/_all.js');

			}

			delete this.loadResources;
		}

		boot.loadScript = boot._loadScript;

		boot.loadCss = boot._loadCss;

		boot.loadResource = boot._loadResource;

		boot.init();

		window['boot'] = boot;
	}
)(window)


