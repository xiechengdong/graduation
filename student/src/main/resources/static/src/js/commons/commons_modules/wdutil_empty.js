; (function ($, window, name) {
	//通过第一个成员判断是否重复加载
	if ((name in window) && window[name]['nvl']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			nvl : function() {
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i])
						return arguments[i];
				}
				return "";
			},
			checkDateFmt : function(value) {
				/**
				 * 判断年月日格式
				 * 只支持：yyyyMM yyyyMMdd yyyy-MM yyyy-MM-dd yyyy-M yyyy-M-d
				 */
				var test = value.split("-");
				if (test.length == 3) {
					var format = "yyyy-M";
					if (test[1].length == 2) {
						format = format + "M";
					}
					format = format + "-d";
					if (test[2].length == 2) {
						format = format + "d";
					}
					return format;
				} else if (test.length == 2) {
					var format = "yyyy-M";
					if (test[1].length == 2) {
						format = format + "M";
					}
					return format;
				} else {
					var len = value.length
					if (len == 6)
						return "yyyyMM";
					if (len == 8)
						return "yyyyMMdd";
				}
				return "";
			}
		}
	);
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
