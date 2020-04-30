; (function (Mock) {

	var errorMessage = function(errorCount) {
		errorCount = errorCount + 1;
		$(document.body).data('login_err_count', errorCount);
		if (errorCount<5) {
			return wssip.mock.message("用户名或密码错误，你还有" + (5-errorCount) + "次机会" , 300, {"errorCount":  errorCount});
		} else {
			return wssip.mock.message("你已经连续5次错误，请5分钟后重试", 300, {"errorCount":  errorCount});
		}
	}

	//登陆检查
	wssip.mock.mock('loginCheck','post', function (options) {
		/*
		*获取页面请求参数，get/post参数获取方式一样，不支持文件上传的数据获取
		*由于是模拟ajax，js还在当前页面执行，也可以直接读取页面控件值
		*/
		var username = options.params['username'],
			password = $('[name="password"]').val(),//options.params['password']
			captcha = options.params['captcha']
		var errorCount = $(document.body).data('login_err_count') || 0;
		var captcha_saved = $(document.body).data('login_captcha');
		//输出日志
		console.log("options.params", options.params);
		//用户名判断
		if (errorCount>=1 && captcha !== captcha_saved) {
			//返回错误信息
			return wssip.mock.message("验证码输入错误", 300, {"errorCount":  errorCount});
		}
		//用户名判断
		if (username !== 'system') {
			//返回错误信息
			//返回错误信息
			return errorMessage(errorCount);
		}
		//密码判断
		if (password !== 'system') {
			console.log("password", password);
			//返回错误信息
			return errorMessage(errorCount);
		}
		//返回登陆成功信息
		return wssip.mock.object(null, "/pages/main/index.html");
	});

	//登出
	wssip.mock.object('logout', {
		"userId|1000000-1009999": 1
	});

	wssip.mock.mock('/captcha',function(option){//拦截captcha请求
		var captcha = Mock.mock({'regexp': /\w{4}/}).regexp;
		$(document.body).data('login_captcha', captcha);
		return Mock.mock({
			imgUrl: Mock.Random.dataImage('85x32', captcha)
		});
	});


	$(function () {
		//验证码刷新
		var refreshCaptcha = function() {
			//显示验证码
			$('img.captcha').parents('div.row').first().removeClass('hide');

			//模拟验证码刷新
			var url = wssip.url.getUrl('/captcha');
			url = wssip.url.addUrlParam(url, {rnd: Math.random()});

			$.get(url, function(data){
				var data = JSON.parse(data);
				$('img.captcha').attr('src',data.imgUrl);

			});

		};

		//绑定图片点击事件
		$(function () {
			var bindClick = function() {
				var $captcha = $('img.captcha');
				//mock加载比控件加载找，所以可能组件还不存在，需要延迟绑定事件
				if ($captcha.length>0) {
					$captcha.off('click');
					$captcha.on('click', refreshCaptcha);
				} else {
					setTimeout(bindClick, 100);
				}
			};
			bindClick();

		});

	});

})(Mock)

