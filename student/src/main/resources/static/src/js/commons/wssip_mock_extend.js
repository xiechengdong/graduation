; (function ($, window, Mock) {
	var random = Mock.Random;


	//扩展数据模板
	random.extend({
		// 根据姓名生产拼音。
		idcard: function() {

			return this.id();

		},
		// 根据姓名生产拼音。
		pinyin: function(name) {

			name = name || this.cname();

			return pinyin.getFullChars(name).toLowerCase();

		},
		// 根据id生成生日。
		birthday: function(id) {

			id = id || this.id();

			return wdutil.string.getBirthdayOfId(id);

		},
		// 根据id生成性别。
		sex: function(id) {

			id = id || this.id();

			return wdutil.string.getSexOfId(id);

		},
		// 根据name,domain生成一个邮件地址。
		cemail: function(name, domain) {
			name = name || this.pinyin(this.cname());
			domain = (domain && this.pick(domain.split(/\s+/))) || (this.word() + '.' + this.tld());
			return name + '@' + domain;
		},
		// 随机生成手机号码。
		mobile: function() {

			return Mock.mock(/(13|15|18)\d{9}/);

		}
	})

})(jQuery, window, Mock)
