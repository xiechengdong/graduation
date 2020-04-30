; (function ($, window, name) {
	if ((name in window) && window[name]['json']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			"json": {
				"parse" : function (text) {
					if (typeof JSON !== "undefined") {
						return JSON.parse(text);
					} else {
						return  $.parseJSON(text);
					}
				},
				"stringify" : function (value) {
					if (typeof JSON !== "undefined") {
						return JSON.stringify(value);
					} else {
						return value && value.toString();
					}
				}

			}
		});
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
