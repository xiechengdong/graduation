; (function ($, window, name) {
	if ((name in window) && window[name]['get']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			get : function(id, el) {
				if (!el) {
					return document.getElementById(id);
				}
				var tags = el.getElementsByTagName("*");
				var count = tags.length;
				for (var i = 0; i < count; i++) {
					var _ = tags[i].id;
					if (id == _) {
						return tags[i];
					}
				}
				return null;
			},
			show : function(idstr, el) {
				var obj = this.get(idstr, el);
				if (obj) {
					obj.style.display = "";
				}
			},
			hide : function(idstr, el) {
				var obj = this.get(idstr, el);
				if (obj) {
					obj.style.display = "none";
				}
			},
			enable : function(idstr, el) {
				var obj = this.get(idstr, el);
				if (obj) {
					obj.disabled = "";
				}
			},
			disable : function(idstr, el) {
				var obj = this.get(idstr, el);
				if (obj) {
					obj.disabled = "disabled";
				}
			},
			setData : function(data, el) {
				for ( var key in data) {
					if (typeof (data[key]) == "function") {

					} else if (typeof (data[key]) == "object") {

					} else {
						try {
							var obj = this.get(key, el);
							if (obj && obj.tagName) {
								var tname = obj.tagName.toLowerCase();
								if (tname == "input" || tname == "select") {
									obj.value = data[key];
								} else {
									obj.innerText = data[key];
								}
							}
						} catch (e) {
							// alert(e.message);
						}
					}

				}
			}
		}
	);
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
