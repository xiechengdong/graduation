; (function (Mock) {


})(Mock)

﻿; (function (Mock) {


	//数据对象定义
	var item = {
		"id|1000000000-1000099999": 0,
		//姓名，中文姓名
		"name": "@cname",
		//登陆时姓名的拼音
		loginName:'@pinyin(@name)',
		//身份证号码
		'idcard': '@idcard',
		//性别由身份证决定
		birthday:'@birthday(@idcard)',
		//生日由身份证决定
		sex:'@sex(@idcard)',
		//手机号码
		mobile: '@mobile',
		//邮件，由登录名生成
		mail:'@cemail(@loginName, qq.com 163.com gmail.com)',
		//日期时间格式
		'dateData':'@date("yyyy-MM-dd")',
		//日期时间格式
		'timeData':'@time("HH:mm:ss")',
		//日期时间格式
		'timestampData':'@datetime("yyyy-MM-dd HH:mm:ss")',
		//数字范围，后面的数字0只是表明类型，值可以是任意数字
		"intData|1-100000": 0,
		//数字范围，后面的数字0只是表明类型，值可以是任意数字
		"longData|100000-199999": 0,
		//数字范围，后面的数字0只是表明类型，值可以是任意数字
		"shortData|1-60000": 0,
		//数字范围，后面的数字0只是表明类型，值可以是任意数字
		"byteData|1-255": 0,
		//指定整数部分和小数部分范围，后面的数字0.0只是表明类型，值可以是任意数字
		"numberData|1-99999.1-999": 0.0,
		//指定整数部分和小数部分范围，后面的数字0.00只是表明类型，值可以是任意数字
		"moneyData|1-99999.10-99": 0.00,
		//占位符的float类型
		"floatData": "@float",
		//随机区/县名称
		"textData": "@county(true)",
		//随机符合正则表达式的字符串，这个功能强大，可以实现很多格式数据
		"code": /[1-4]/,
		//boolean类型
		"booleanData": "@boolean",
		//url
		"fileName": "@url",
		//颜色
		"color": "@color",
		"enumData|1-100": 0
	};

	//模拟分页查询，返回页面json对象
	wssip.mock.page('/demo/query', item);

	//模拟保存，返回json对象
	wssip.mock.object('/demo/save', item);

	//模拟删除，返回json对象
	wssip.mock.object('/demo/deleteBatch', item);

})(Mock)


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


﻿; (function (Mock) {

	wssip.mock.object('menu', [
		{ "id": "M00", "icon": "fa fa-mortar-board", "name": "示例", "children": [
				{ "id": "M0001", "icon": "fa fa-object-group", "name": "列表页内弹出框1", "url": "/pages/demo/inner/index.html" },
				{ "id": "M0002", "icon": "fa fa-object-group", "name": "列表页内弹出框2", "url": "/pages/demo/inner/index2.html" },
				{ "id": "M0003", "icon": "fa fa-object-ungroup", "name": "列表独立弹出框1", "url": "/pages/demo/standalone/index.html" },
				{ "id": "M0004", "icon": "fa fa-object-ungroup", "name": "列表独立弹出框2", "url": "/pages/demo/standalone/index2.html" },
				{ "id": "M0005", "icon": "fa fa-object-ungroup", "name": "列表独立弹出框3", "url": "/pages/demo/standalone/index3.html" }
			]},
		{ "id": "M01", "icon": "fa fa-bar-chart", "name": "表单", "children": [
				{ "id": "M0101", "icon": "fa fa-tasks", "name": "代码下拉框", "url": "/pages/miniui/demo/combobox/codeselect.html" }
			]},
		{ "id": "M02", "icon": "fa fa-asterisk", "name": "统计指标项生成", "children": [
				{ "id": "M0201", "icon": "fa fa-save", "name": "数据填报", "url": "/demo/account/addJob" },
				{ "id": "M0202", "icon": "fa fa-info-circle", "name": "信息更新", "url": "" },
				{ "id": "M0203", "icon": "fa fa-database", "name": "数据资料开发", "url": "" }
			]},
		{ "id": "M03", "icon": "fa fa-hand-lizard-o", "name": "数据接入", "children": [
				{ "id": "M0301", "icon": "fa fa-upload", "name": "文件导入", "url": "/demo/file-import/index" },
				{ "id": "M0302", "icon": "fa fa-cloud-upload", "name": "数据接入", "url": "/demo/data/access" },
				{ "id": "M0303", "icon": "fa fa-hand-grab-o", "name": "数据抓取", "url": "/demo/data/grab" }
			]},
		{ "id": "M04", "icon": "fa fa-check-square-o", "name": "业务数据审核", "children": [
				{ "id": "M0401", "icon": "fa fa-pie-chart", "name": "汇总报表审核", "url": "/demo/data/review" },
				{ "id": "M0402", "icon": "fa fa-check-square-o", "name": "台账审核", "url": "/demo/account/review" }
			]},
		{ "id": "M05", "icon": "fa fa-info-circle", "name": "台账数据管理", "children": [
				{ "id": "M0501", "icon": "fa fa-book", "name": "台账管理", "url": "/demo/account/index" },
				{ "id": "M0502", "icon": "fa fa-tasks", "name": "台账填写任务", "url": "/demo/account/addJob" },
				{ "id": "M0503", "icon": "fa fa-cloud-upload", "name": "台账上报", "url": "/demo/account/report" }
			]},
		{ "id": "M06", "icon": "fa fa-braille", "name": "数据汇总", "children": [
				{ "id": "M0601", "icon": "fa fa-braille", "name": "逐级汇总", "url": "/demo/data/count" },
				{ "id": "M0602", "icon": "fa fa-braille", "name": "全国汇总", "url": "" }
			]},
		{ "id": "M07", "icon": "fa fa-hand-pointer-o", "name": "报送数据接收", "children": [
				{ "id": "M0701", "icon": "fa fa-hand-stop-o", "name": "台账接收", "url": "/demo/account/accept" },
				{ "id": "M0702", "icon": "fa fa-hand-rock-o", "name": "汇总报表接收", "url": "/demo/data/accept" }
			]},
		{ "id": "M08", "icon": "fa fa-database", "name": "报表数据管理", "children": [
				{ "id": "M0801", "icon": "fa fa-pie-chart", "name": "汇总报表管理", "url": "/demo/data/manage" },
				{ "id": "M0802", "icon": "fa fa-cloud-upload", "name": "汇总报表上报", "url": "/demo/data/report" }
			]},
		{ "id": "M09", "icon": "fa fa-line-chart", "name": "统计数据查询", "children": [
				{ "id": "M0901", "icon": "fa fa-bar-chart", "name": "统计数据查询", "url": "" }
			]},
		{ "id": "M10", "icon": "fa fa-info", "name": "统计资料开发", "children": [
				{ "id": "M1001", "icon": "fa fa-google-wallet", "name": "全国数据", "url": "" },
				{ "id": "M1002", "icon": "fa fa-pencil", "name": "权益维护", "url": "" },
				{ "id": "M1003", "icon": "fa fa-heart", "name": "退役安置", "url": "" },
				{ "id": "M1004", "icon": "fa fa-handshake-o", "name": "就业服务", "url": "" },
				{ "id": "M1005", "icon": "fa fa-trademark", "name": "教育培训", "url": "" },
				{ "id": "M1006", "icon": "fa fa-shield", "name": "军休安置", "url": "" },
				{ "id": "M1007", "icon": "fa fa-medkit", "name": "优待抚恤", "url": "" },
				{ "id": "M1008", "icon": "fa fa-thumbs-up", "name": "英烈褒扬", "url": "" }
			]},
		{ "id": "M11", "icon": "fa fa-tv", "name": "统计数据底册监控", "children": [
				{ "id": "M1101", "icon": "fa fa-eye", "name": "监控门户", "url": "" },
				{ "id": "M1102", "icon": "fa fa-tasks", "name": "任务调度管理", "url": "" },
				{ "id": "M1103", "icon": "fa fa-warning", "name": "警告统计", "url": "" },
				{ "id": "M1104", "icon": "fa fa-comment-o", "name": "日志管理", "url": "" }
			]},
		{ "id": "M12", "icon": "fa fa-gears", "name": "用户系统管理", "children": [
				{ "id": "M1201", "icon": "fa fa-user-o", "name": "用户管理", "url": "" },
				{ "id": "M1202", "icon": "fa fa-users", "name": "组织管理", "url": "" },
				{ "id": "M1203", "icon": "fa fa-key", "name": "权限管理", "url": "" },
				{ "id": "M1204", "icon": "fa fa-comment-o", "name": "日志管理", "url": "" }
			]}
	]);

})(Mock)

; (function (Mock) {

	wssip.mock.object('user', 'post', function (options) {
		var id = options.params['id'] || 1;
		if (id == 1) {
			return {
				"id": 1,
				"loginname": "system",
				"name": "超级管理员",
				"mailFlag": false,
				"phoneFlag": false,
				"realPersonFlag": false,
				"realNameFlag": false,
				"status": 1,
				"enabled": true,
				"removed": false,
				"authorities": [
					{
						"authority": "MENU:APPLICATION"
					},
					{
						"authority": "MENU:APP_CRUD"
					},
					{
						"authority": "MENU:AUTHORIZEENTIC"
					},
					{
						"authority": "MENU:AUTH_ADMIN"
					},
					{
						"authority": "MENU:AUTH_ORGAN"
					},
					{
						"authority": "MENU:CODE_ITEM"
					},
					{
						"authority": "MENU:CODE_TYPE"
					},
					{
						"authority": "MENU:ORGAN"
					},
					{
						"authority": "MENU:ORGAN_AUTH"
					},
					{
						"authority": "MENU:ORGAN_NODE"
					},
					{
						"authority": "MENU:ORGAN_NODE_TYPE"
					},
					{
						"authority": "MENU:PLATEFORM"
					},
					{
						"authority": "MENU:RESOURCE"
					},
					{
						"authority": "MENU:RESOURCE_CRUD"
					},
					{
						"authority": "MENU:ROLE"
					},
					{
						"authority": "MENU:ROLE_ASSIFN"
					},
					{
						"authority": "MENU:ROLE_AUTHORITY"
					},
					{
						"authority": "MENU:SYSTEM"
					},
					{
						"authority": "MENU:TEST"
					},
					{
						"authority": "MENU:USER"
					},
					{
						"authority": "MENU:USERORGANIZE"
					},
					{
						"authority": "MENU:USER_"
					},
					{
						"authority": "MENU:USER_ACTIVATE"
					},
					{
						"authority": "MENU:USER_ASSIGN"
					},
					{
						"authority": "MENU:USER_AUTHORITY"
					},
					{
						"authority": "MENU:USER_LOCK"
					},
					{
						"authority": "MENU:USER_REMOVE"
					},
					{
						"authority": "MENU:USER_UNLOCK"
					},
					{
						"authority": "MENU:test"
					},
					{
						"authority": "MENU:BASE_OPERATION"
					},
					{
						"authority": "MENU:BBBF"
					},
					{
						"authority": "MENU:100000010"
					},
					{
						"authority": "MENU:100000011"
					},
					{
						"authority": "MENU:100000020"
					},
					{
						"authority": "MENU:100000021"
					},
					{
						"authority": "MENU:100000030"
					},
					{
						"authority": "MENU:100000031"
					},
					{
						"authority": "MENU:100000032"
					},
					{
						"authority": "MENU:100000033"
					},
					{
						"authority": "MENU:100000040"
					},
					{
						"authority": "MENU:100000041"
					},
					{
						"authority": "MENU:100000042"
					},
					{
						"authority": "MENU:QHJH"
					},
					{
						"authority": "MENU:DEMO"
					},
					{
						"authority": "MENU:INDEX"
					},
					{
						"authority": "MENU:INDEX2"
					},
					{
						"authority": "MENU:INDEX_LONE"
					},
					{
						"authority": "MENU:INDEX_LONE2"
					},
					{
						"authority": "MENU:MENU_DEMO"
					},
					{
						"authority": "MENU:SELECTOR_AND_QUERY"
					},
					{
						"authority": "MENU:SIMPLE"
					},
					{
						"authority": "MENU:TREE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_SELECTUSER"
					},
					{
						"authority": "ADMIN_ROLE_SELECTROLE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEROLE"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_DELETEROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_SAVEROLEINFOAUTH"
					},
					{
						"authority": "ADMIN_ROLE_ADDROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_PASSWORDRESET"
					},
					{
						"authority": "ADMIN_USER_ADDORREMOVEROLES"
					},
					{
						"authority": "ADMIN_USER_UPDATEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_SAVEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_ACTIVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_LOCKUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_DEBLOCKUSER"
					},
					{
						"authority": "ADMIN_USER_CANCELUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_UPDATENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYUSERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_SAVENODE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_DELETE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_ADDROOTMENU"
					},
					{
						"authority": "CODE_ITEM_QUERY"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "MENU_UPDATEMENUNODE"
					},
					{
						"authority": "MENU_ADDMENUNODE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_APPLICATION_DELETE"
					},
					{
						"authority": "MENU_REMOVEMENU"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_UPDATE"
					},
					{
						"authority": "CODE_TYPE_SAVE"
					},
					{
						"authority": "TEST_ONE"
					},
					{
						"authority": "TEST_TWO"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEMANAGERSINNODE"
					},
					{
						"authority": "ROLE_SYSTEM"
					},
					{
						"authority": "ROLE_CFO"
					},
					{
						"authority": "ROLE_R01"
					},
					{
						"authority": "ROLE_Test"
					},
					{
						"authority": "ROLE_liuliangR"
					}
				],
				"roles": [
					{
						"name": "超级管理员",
						"code": "SYSTEM"
					}
				],
				"accountNonExpired": true,
				"accountNonLocked": true,
				"credentialsNonExpired": true,
				"admin": true,
				"username": "system"
			};
		}
		else if (id == 2) {
			return {
				"id": 2,
				"loginname": "admin",
				"name": "管理员",
				"mailFlag": false,
				"phoneFlag": false,
				"realPersonFlag": false,
				"realNameFlag": false,
				"status": 1,
				"enabled": true,
				"removed": false,
				"authorities": [
					{
						"authority": "MENU:APPLICATION"
					},
					{
						"authority": "MENU:APP_CRUD"
					},
					{
						"authority": "MENU:AUTHORIZEENTIC"
					},
					{
						"authority": "MENU:AUTH_ADMIN"
					},
					{
						"authority": "MENU:AUTH_ORGAN"
					},
					{
						"authority": "MENU:CODE_ITEM"
					},
					{
						"authority": "MENU:CODE_TYPE"
					},
					{
						"authority": "MENU:ORGAN"
					},
					{
						"authority": "MENU:ORGAN_AUTH"
					},
					{
						"authority": "MENU:ORGAN_NODE"
					},
					{
						"authority": "MENU:ORGAN_NODE_TYPE"
					},
					{
						"authority": "MENU:PLATEFORM"
					},
					{
						"authority": "MENU:RESOURCE"
					},
					{
						"authority": "MENU:RESOURCE_CRUD"
					},
					{
						"authority": "MENU:ROLE"
					},
					{
						"authority": "MENU:ROLE_ASSIFN"
					},
					{
						"authority": "MENU:ROLE_AUTHORITY"
					},
					{
						"authority": "MENU:SYSTEM"
					},
					{
						"authority": "MENU:TEST"
					},
					{
						"authority": "MENU:USER"
					},
					{
						"authority": "MENU:USERORGANIZE"
					},
					{
						"authority": "MENU:USER_"
					},
					{
						"authority": "MENU:USER_ACTIVATE"
					},
					{
						"authority": "MENU:USER_ASSIGN"
					},
					{
						"authority": "MENU:USER_AUTHORITY"
					},
					{
						"authority": "MENU:USER_LOCK"
					},
					{
						"authority": "MENU:USER_REMOVE"
					},
					{
						"authority": "MENU:USER_UNLOCK"
					},
					{
						"authority": "MENU:test"
					},
					{
						"authority": "MENU:BASE_OPERATION"
					},
					{
						"authority": "MENU:BBBF"
					},
					{
						"authority": "MENU:100000010"
					},
					{
						"authority": "MENU:100000011"
					},
					{
						"authority": "MENU:100000020"
					},
					{
						"authority": "MENU:100000021"
					},
					{
						"authority": "MENU:100000030"
					},
					{
						"authority": "MENU:100000031"
					},
					{
						"authority": "MENU:100000032"
					},
					{
						"authority": "MENU:100000033"
					},
					{
						"authority": "MENU:100000040"
					},
					{
						"authority": "MENU:100000041"
					},
					{
						"authority": "MENU:100000042"
					},
					{
						"authority": "MENU:QHJH"
					},
					{
						"authority": "MENU:DEMO"
					},
					{
						"authority": "MENU:INDEX"
					},
					{
						"authority": "MENU:INDEX2"
					},
					{
						"authority": "MENU:INDEX_LONE"
					},
					{
						"authority": "MENU:INDEX_LONE2"
					},
					{
						"authority": "MENU:MENU_DEMO"
					},
					{
						"authority": "MENU:SELECTOR_AND_QUERY"
					},
					{
						"authority": "MENU:SIMPLE"
					},
					{
						"authority": "MENU:TREE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_SELECTUSER"
					},
					{
						"authority": "ADMIN_ROLE_SELECTROLE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEROLE"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ROLE_DELETEROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_SAVEROLEINFOAUTH"
					},
					{
						"authority": "ADMIN_ROLE_ADDROLE"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_AUTHORITY_AUTHORIZE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_PASSWORDRESET"
					},
					{
						"authority": "ADMIN_USER_ADDORREMOVEROLES"
					},
					{
						"authority": "ADMIN_USER_UPDATEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_SAVEUSERPERSON"
					},
					{
						"authority": "ADMIN_USER_ACTIVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_LOCKUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_USER_DEBLOCKUSER"
					},
					{
						"authority": "ADMIN_USER_CANCELUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_UPDATENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYUSERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_QUERYMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETENODE"
					},
					{
						"authority": "ADMIN_ORGANNODE_SAVENODE"
					},
					{
						"authority": "ADMIN_ROLE_REMOVEUSER"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_DELETE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_ADDROOTMENU"
					},
					{
						"authority": "CODE_ITEM_QUERY"
					},
					{
						"authority": "CODE_ITEM_UPDATE"
					},
					{
						"authority": "ADMIN_ORGANNODETYPE_SAVEORUPDATEORGANNODETYPE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "CODE_ITEM_SAVE"
					},
					{
						"authority": "CODE_ITEM_DELETE"
					},
					{
						"authority": "MENU_UPDATEMENUNODE"
					},
					{
						"authority": "MENU_ADDMENUNODE"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDMANAGERSINNODE"
					},
					{
						"authority": "ADMIN_APPLICATION_SAVEORUPDATEAPPLICATION"
					},
					{
						"authority": "QUERY"
					},
					{
						"authority": "ADMIN_APPLICATION_DELETE"
					},
					{
						"authority": "MENU_REMOVEMENU"
					},
					{
						"authority": "ADMIN_ORGANNODE_ADDUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_QUERY"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEUSERSINNODE"
					},
					{
						"authority": "CODE_TYPE_UPDATE"
					},
					{
						"authority": "CODE_TYPE_SAVE"
					},
					{
						"authority": "TEST_ONE"
					},
					{
						"authority": "TEST_TWO"
					},
					{
						"authority": "ADMIN_ORGANNODE_DELETEMANAGERSINNODE"
					},
					{
						"authority": "ROLE_SYSTEM"
					},
					{
						"authority": "ROLE_CFO"
					},
					{
						"authority": "ROLE_R01"
					},
					{
						"authority": "ROLE_Test"
					},
					{
						"authority": "ROLE_liuliangR"
					}
				],
				"roles": [
					{
						"name": "超级管理员",
						"code": "SYSTEM"
					}
				],
				"accountNonExpired": true,
				"accountNonLocked": true,
				"credentialsNonExpired": true,
				"admin": true,
				"username": "system"
			};
		}
	});


})(Mock)


; (function (Mock) {

	//登陆检查
	wssip.mock.mock('dictionary', function (options) {
		/*
		*获取页面请求参数，get/post参数获取方式一样，不支持文件上传的数据获取
		*由于是模拟ajax，js还在当前页面执行，也可以直接读取页面控件值
		*/
		var type = options.params['type'],
			parent = options.params['parent'];


		if (type=='1001') {
			return [{"id":"1","text":"代码A"},{"id":"2","text":"代码B"},{"id":"3","text":"代码C"},{"id":"4","text":"代码D"}];
		} else if (type=='1002') {
			if (parent=='1') {
				return [{"id":"a1","text":"关联代码"}];
			} else if (parent=='2') {
				return [{"id":"b1","text":"关联代码b1"}];
			} else if (!parent) {
				return [{"id":"b1","text":"关联代码b1"},{"id":"a1","text":"关联代码"}];
			} else {
				return [];
			}
		} else {

			//返回随机数据
			return wssip.mock.list(null, {"id|1000000000-1000099999": 0, "text": /[a-zA-Z][a-z]{2,19}[0-9]{0,4}/});
		}
	});

})(Mock)


﻿; (function (Mock) {

	//登陆检查
	wssip.mock.mock('dictionary', function (options) {
		/*
		*获取页面请求参数，get/post参数获取方式一样，不支持文件上传的数据获取
		*由于是模拟ajax，js还在当前页面执行，也可以直接读取页面控件值
		*/
		var type = options.params['type'],
			parent = options.params['parent'];


		if (type=='1001') {
			return [{"id":"1","text":"代码A"},{"id":"2","text":"代码B"},{"id":"3","text":"代码C"},{"id":"4","text":"代码D"}];
		} else if (type=='1002') {
			if (parent=='1') {
				return [{"id":"a1","text":"关联代码"}];
			} else if (parent=='2') {
				return [{"id":"b1","text":"关联代码b1"}];
			} else if (!parent) {
				return [{"id":"b1","text":"关联代码b1"},{"id":"a1","text":"关联代码"}];
			} else {
				return [];
			}
		} else {

			//返回随机数据
			return wssip.mock.list(null, {"id|1000000000-1000099999": 0, "text": /[a-zA-Z][a-z]{2,19}[0-9]{0,4}/});
		}
	});

})(Mock)


