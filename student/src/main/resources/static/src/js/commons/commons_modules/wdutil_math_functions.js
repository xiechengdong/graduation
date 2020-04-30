; (function ($, window, name) {
	if ((name in window) && window[name]['math']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			math : {
				sumAsInt : function() {
					var sum = 0;
					for (var i = 0; i < arguments.length; i++) {
						if (arguments[i]) {
							var value = 0;
							try {
								if (!isNaN(arguments[i]))
									value = parseInt(arguments[i], 10);
							} catch (e) {

							}
							sum += value;
						}
						;
					}
					return sum;
				},
				sumAsFloat : function(decimalPlaces) {
					var sum = 0;
					for (var i = 1; i < arguments.length; i++) {
						if (arguments[i]) {
							var value = 0;
							try {
								if (!isNaN(arguments[i]))
									value = parseFloat(arguments[i]);
							} catch (e) {

							}
							sum += value;
						}
						;
					}
					if (!decimalPlaces)
						decimalPlaces = 2;
					return sum.toFixed(decimalPlaces);
				},
				least : function() {
					var val = arguments[0];
					for (var i = 1; i < arguments.length; i++) {
						if (val > arguments[i]) {
							val = arguments[i]
						}
					}
					return val;
				},
				greatest : function() {
					var val = arguments[0];
					for (var i = 1; i < arguments.length; i++) {
						if (val < arguments[i]) {
							val = arguments[i]
						}
					}
					return val;
				}
			}
		}
	);
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
