; (function (window) {
	var site = {
		_mid:'',
		skin:'metro-white',
		mode:'medium',
		_murl:'',
		debug:true,
		mock:false,
		path: {
			base: '/ggfwzc/auth',
			//base: '/wssip-framework-root/wssip-ui/static',
			//pages: '/wssip-framework-root/wssip-projects-modules/wssip-ui/static/pages',
			// base: '/wssip-ui/static',
			//pages: '/demo/pages',
			styles: 'css',
			scripts: 'js',
			images: 'images',
			components: 'lib'
		},
		url: {
			//login: '/main/login.html',
			loginCheck: '/user/login',
			logout: '/user/logout',
			captcha: '/anon/captcha',
			menu: '/admin/auth/menu',
			user: '/admin/auth/user',
			//menu: '/data/admin/auth/menu.json',
			//user: '/data/admin/auth/user.json',
			dictionary:'/common/dict/queryList',
			alifont: '//at.alicdn.com/t/font_49730_zi0pabqek69.css'
		},
		crypto: {
			password_rsa_eanble: true,
			publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArlkh/e5woZcPcFQDdiaezh/IUui8IUu7rezH0lUo17Lwf64bUl9sW958x9JWZ1GFc2GDdlkQPQ+rJMwgD/VznThPdm5HJPEVacekbcupYzBoobZLiZKqjdvWwrkGnJgFJc3sMLN/DJ8yZ3bqXawScX3fXg0SYMLhCAQ+Zj8rkxPUue1GSvZ1CpCSIYNjjsyLfTYhr3fpCEkLKJWNimbC0pyF+ok8hrjTFGFpgqhYRm/YhsTb0fLtxUVxcxRqT5af3lRaNiuKD72p+ytAp7i/izV/3oDpj81mfnfehukADGehfBQ/kBwnHSL6IkyCrl/ZA6d9k3q+fyJIAPPX1udp3wIDAQAB'
		},
		alertEnabled: true
	};
	window.site = site;

	/**
	 * 历史遗留, 废弃不要使用
	 * @type {{DICRELATE_URL: string, mode: string, debug: boolean, _mid: string, skin: string, base: string, _murl: string}}
	 */
	var GSiteInfo = {
		base:site.path.base,
		DICRELATE_URL:site.url.dictionary,
		_mid:'',
		skin:'metro-white',
		mode:'medium',
		_murl:'',
		debug:true
	};

	window.GSiteInfo = GSiteInfo;

	//工具方法, 废弃！！
	site.path.buildUrl = function(url) {
		if (url && url.indexOf('//')===-1) {
			return this.base + url;
		}
		return url;
	};

	//工具方法, 废弃！！
	site.path.buildDataUrl = function(url) {
		if (url && url.indexOf('//')===-1) {
			return this.data + url;
		}
		return url;
	};
})(window);


