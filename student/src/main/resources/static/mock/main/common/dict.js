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

