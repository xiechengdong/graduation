; (function ($, window, name) {
	if ((name in window) && window[name]['joinList']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			joinList : function(list, key, separator) {
				var values = [];
				for (var i = 0, l = list.length; i < l; i++) {
					values.push(list[i][key]);
				}
				if (separator) {
					return values.join(separator);
				} else {
					return values.join(",");
				}

			},
			listToArray : function(list, prop) {
				var array = [];
				for (var i = 0; i < list.length; i++) {
					var value = list[i][prop];
					if (typeof value != "undefined")
						array.push(value);
				}
				return array;
			},
			mergeArray : function(arr1, arr2) {
				var array = [];
				var obj = {};
				if (this.isArray(arr1)) {
					for (var i = 0; i < arr1.length; i++) {
						var value = arr1[i];
						if (obj[value]) {

						} else {
							obj[value] = 1;
							array.push(value);
						}
					}
				}

				if (this.isArray(arr2)) {
					for (var i = 0; i < arr2.length; i++) {
						var value = arr2[i];
						if (obj[value]) {

						} else {
							obj[value] = 1;
							array.push(value);
						}
					}
				}

				return array;
			},
			cleanArray : function(arr1, arr2) {
				var array = [];
				var obj = {};

				if (this.isArray(arr2)) {
					for (var i = 0; i < arr2.length; i++) {
						obj[arr2[i]] = 1;
					}
				}

				if (this.isArray(arr1)) {
					for (var i = 0; i < arr1.length; i++) {
						var value = arr1[i];
						if (obj[value]) {

						} else {
							obj[value] = 1;
							array.push(value);
						}
					}
				}

				return array;
			}
		}
	);
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
