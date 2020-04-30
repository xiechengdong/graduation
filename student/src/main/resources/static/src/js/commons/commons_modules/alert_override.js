/**
 * 重写alert, 屏蔽原生javascript,alert函数
 * 解决部分软件试用期提示问题
 * 可选依赖config.js
 * 参数:
 *   site.alertEnabled: true|false[默认]
 */
; (function (window, alert_fun) {

	if (alert_fun in window) {
		return;
	}

	window[alert_fun] = window['alert'];

	window['alert'] = function (message) {

		if (
			typeof site !== "undefined" && site && site.alertEnabled &&
			message &&
			message.indexOf("\u8bd5" + "\u7528") == -1 &&
			message.indexOf("\u5230" + "\u671f") == -1
		) {
			window[alert_fun](message);
		} else if (console && console.log) {
			console.log(message);
		}
	};

})(window, '__alert_fun__');
