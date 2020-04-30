; (function ($, window, name) {
	if ((name in window) && window[name]['string']) {
		return;
	}

	var wdutil = $.extend(
		window[name] || {}, {
			'string' : {
				/*
				获取身份证中的日期
				中华人民共和国身份证，15，18位
				 */
				'getBirthdayOfId' : function(idcard) {
					if (idcard && idcard.length==18) {
						return idcard.substr(6,4) + '-' + idcard.substr(10,2) + '-' + idcard.substr(12,2);
					} else if (idcard && idcard.length==15) {
						return '19' + idcard.substr(6,2) + '-' + idcard.substr(8,2) + '-' + idcard.substr(10,2);
					} else {
						return null;
					}
				},
				/*
				获取身份证中的性别
				中华人民共和国身份证，15，18位
				 */
				'getSexOfId' : function(idcard) {

					if (idcard && (idcard.length==18 || idcard.length==15)) {
						var idx = (idcard.length==18)?16:14;
						//身份证，奇数男，偶数女
						var sex = idcard.substr(idx,1) % 2;
						//性别代码1 - 男，2 - 女
						return (sex)?'1':'2';
					} else {
						return null;
					}
				},
				emptyFun : function() {}
			}
		}
	);

	window[name] = wdutil;

	//ie11以下不支持startsWith、endsWith，在此增加这两个方法
	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function (prefix){
			return this.slice(0, prefix.length) === prefix;
		};
	}

	if (typeof String.prototype.endsWith != 'function') {
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}

})(jQuery, window, 'wdutil')
