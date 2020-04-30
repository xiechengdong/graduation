; (function (Mock) {

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
