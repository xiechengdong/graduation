; (function ($, window, name) {
	if ((name in window) && window[name]['isDate']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			/**
			 * 是否日期类型
			 * @param value
			 * @returns {boolean}
			 */
			isDate : function(value) {
				return !!(value && value.getFullYear);
			},
			/**
			 * 是否数组
			 * @param value
			 * @returns {boolean}
			 */
			isArray : function(value) {
				return !!(value && !!value.unshift);
			},
			/**
			 * 是否数字
			 * @param value
			 * @returns {boolean}
			 */
			isNumber : function(value) {
				return !isNaN(value) && typeof value == 'number';
			},
			/**
			 * 是否为空
			 * @param obj
			 * @returns {boolean}
			 */
			isEmpty : function(obj) {
				if (obj) {
					for ( var key in obj) {
						return false;
					}
				}
				return true;
			},
			/**
			 * 创建命名空间
			 */
			namespace : function(ns) {
				if (typeof (ns) != "string")
					return;
				var o = null;
				var ni = null;
				ns = ns.split(".");
				for (var i = 0; i < ns.length; i++) {
					try {
						var ni = ns[i];
						o = (o ? (o[ni] = o[ni] || {}) : (eval(ni + "=" + ni + "||{}")));
					} catch (e) {
						o = eval(ni + "={}");
					}
				}
			},
			clone : function(source) {
				if (typeof (source) != 'object')
					return source;
				if (source == null)
					return null;
				if (this.isDate(source)) {
					var desc = new Date();
					return desc;
				}

				if (this.isArray(source)) {
					var desc = [];
					for (var i = 0, l = source.length; i < l; i++) {
						desc.push(this.clone(source[i]));
					}
					return desc;
				}
				var text = JSON.stringify(source);
				var obj = JSON.parse(text);
				return obj;
			},
			copy : function(source, dest, copyAll, ignoreExists) {
				if (typeof (source) != 'object' || typeof (dest) != 'object')
					return;
				if (source == null)
					return;
				if (this.isArray(source)) {
					dest = this.clone(source);
					return;
				}
				if (this.isDate(source) && this.isDate(dest)) {
					desc.setTime(source.getTime());
					return;
				}
				for ( var key in source) {
					var typesource = typeof (source[key]);
					var typedest = typeof (dest[key]);
					if (typedest == 'undefined' && !copyAll)
						continue;// 只复制匹配的字段
					if (ignoreExists && typedest != 'undefined')
						continue;// 忽略存在的属性
					if (typesource == "function") {
					} else if (typesource == "object") {
						if (source[key] == null) {
							dest[key] = null;
						} else if (this.isArray(source[key])) {
							dest[key] = this.clone(source[key]);
						} else {
							if (!dest[key]) {
								dest[key] = this.clone(source[key]);
							} else {
								this.copy(source[key],dest[key],copyAll,ignoreExists);
							}
						}
					} else {
						dest[key] = source[key];
					}
				}
			}
		}
	);
	window[name] = wdutil;

})(jQuery, window, 'wdutil')
