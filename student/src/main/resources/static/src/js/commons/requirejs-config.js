requirejs.config({
	baseUrl: '/wssip-ui/',
	deps: ['src/js/commons/configs'],
	paths: {

		/* 框架组件 */
		'wdutil_core': 'src/js/commons/wdutil_core',
		'wdutil_mini': 'src/js/commons/wdutil_mini',
		'miniui_extend': 'src/js/commons/miniui_extend',
		'wssip-menu': 'src/js/main/menu',

		'PushMenu': 'src/js/commons/PushMenu',
		'Tree': 'src/js/commons/Tree',
		'Layout': 'src/js/commons/Layout',
		'BoxRefresh': 'src/js/commons/BoxRefresh',
		'BoxWidget': 'src/js/commons/BoxWidget',

		/* art-template 是一个渲染性能出众模板引擎，无论在 NodeJS 还是在浏览器中都可以运行。 */
		'art-template': 'lib/art-template/lib/template-web',
		/* Bootstrap 3.3.7 */
		'bootstrap': 'lib/bootstrap/dist/js/bootstrap.min',

		'bootstrap-colorpicker': 'lib/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min',
		/* datepicker */
		'bootstrap-datepicker': 'lib/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
		/* daterangepicker */
		'bootstrap-daterangepicker': 'lib/bootstrap-daterangepicker/daterangepicker',

		'bootstrap-slider': 'lib/bootstrap-slider/bootstrap-slider',

		'bootstrap-switch': 'lib/bootstrap-switch/dist/js/bootstrap-switch.min',

		'bootstrap-timepicker': 'lib/bootstrap-timepicker/js/bootstrap-timepicker',

		'bootstrap-treeview': 'lib/bootstrap-treeview/dist/bootstrap-treeview.min',

		'ckeditor': 'lib/ckeditor/ckeditor',
		
		/* DataTables */
		'datatables.net': 'lib/datatables.net/js/jquery.dataTables.min',
		'datatables.net-bs': 'lib/datatables.net-bs/js/dataTables.bootstrap.min',
		
		/* FastClick 是 FT Labs 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库 */
		'fastclick': 'lib/fastclick/lib/fastclick',

		'ion.rangeSlider': 'lib/ionrangeslider/js/ion.rangeSlider.min',

		'jquery': 'lib/jquery/dist/jquery.min',

		'jquery-dateFormat': 'lib/jquery-dateFormat/dist/jquery-dateFormat.min',
		
		'jquery-form': 'lib/jquery-form/dist/jquery.form.min',

		'jquery-knob': 'lib/jquery-knob/dist/jquery.knob.min',

		'jquery-placeholder': 'lib/jquery-placeholder/jquery.placeholder',//.min

		'placeholder': 'src/js/common/placeholder',

		'jquery-slimscroll': 'lib/jquery-slimscroll/jquery.slimscroll.min',

		'jquery-sparkline': 'lib/jquery-sparkline/dist/jquery.sparkline.min',

		'jquery.cookie': 'lib/jquery.cookie/jquery.cookie',
		
		/* jquery-treegrid */
		'jquery-treegrid': 'lib/jquery-treegrid/js/jquery.treegrid.min',
		'bootstrap-treegrid': 'lib/jquery-treegrid/js/jquery.treegrid.bootstrap3',

		'jquery-validation': 'lib/jquery-validation/src/localization/messages_zh',
		
		'jquery.validationEngine': 'lib/validation-engine-ciaoca/js/languages/jquery.validationEngine-zh_CN',
		
		/* jshash: jshash/md5.min, jshash/ripemd160.min, jshash/sha1.min, jshash/sha256.min, jshash/sha512.min */
		'jshash': 'lib/jshash/build',

		/* layer */
		'layer': 'lib/layer/dist/layer',

		/*miniui*/
		'miniui': 'lib/miniui-3.8.2-wonders/miniui',

		/*日期工具库，daterangepicker等依赖*/
		'moment': 'lib/moment/moment',

		/*文件上传组件依赖包，plupload等依赖*/
		'moxie': 'lib/plupload/js/moxie.min',

		/* 模版引擎 mustache */
		'mustache': 'lib/mustache/mustache.min',

		/* 网页加载进度条 */
		'pace': 'lib/pace/pace.min',

		/* 文件上传组件 */
		'plupload': 'lib/plupload/js/plupload.min',

		'select2': 'lib/select2/dist/js/select2'//.min

	},
    map: {
        '*': {
            'css': 'lib/require-css/css'
        }
    },
	shim: {
		'wdutil_core': {
			deps: ['jquery', 'bootstrap']
		},
		'wdutil_mini': {
			deps: ['jquery', 'bootstrap', 'miniui']
		},
		'miniui_extend': {
			deps: ['jquery', 'bootstrap', 'miniui']
		},

		'PushMenu': {
			deps: ['jquery', 'bootstrap', 'miniui', 'jquery-slimscroll']
		},
		'Tree': {
			deps: ['jquery', 'bootstrap', 'miniui']
		},
		'Layout': {
			deps: ['jquery', 'bootstrap', 'miniui']
		},
		'BoxRefresh': {
			deps: ['jquery', 'bootstrap', 'miniui']
		},
		'BoxWidget': {
			deps: ['jquery', 'bootstrap', 'miniui']
		},
		'wssip-menu': {
			deps: ['jquery', 'bootstrap', 'Tree','PushMenu']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-colorpicker': {
			deps: ['css!lib/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css', 'jquery', 'bootstrap']
		},
		'bootstrap-datepicker': {
			deps: ['css!lib/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css', 'jquery', 'bootstrap', 'lib/bootstrap-datepicker/dist/js/bootstrap-datepicker.min']
		},
		'bootstrap-daterangepicker': {
			deps: ['css!lib/bootstrap-daterangepicker/daterangepicker.css', 'jquery', 'bootstrap', 'moment_cn']
		},
		'bootstrap-slider': {
			deps: ['css!lib/bootstrap-slider/slider.css', 'jquery', 'bootstrap']
		},
		'bootstrap-switch': {
			deps: ['css!lib/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css', 'jquery', 'bootstrap']
		},
		'bootstrap-timepicker': {
			deps: ['css!css/timepicker.css', 'jquery', 'bootstrap']
		},
		'bootstrap-treeview': {
			deps: ['css!lib/bootstrap-treeview/dist/bootstrap-treeview.min.css', 'jquery', 'bootstrap']
		},
		'datatables.net-bs': {
			deps: ['css!lib/datatables.net-bs/css/dataTables.bootstrap.min.css', 'jquery', 'bootstrap', 'datatables.net']
		},
		'jquery-dateFormat': {
			deps: ['jquery']
		},
		'jquery-slimscroll': {
			deps: ['jquery']
		},
		'jquery-treegrid': {
			deps: ['css!lib/jquery-treegrid/css/jquery.treegrid.css', 'jquery', 'bootstrap', 'jquery.cookie']
		},
		'bootstrap-treegrid': {
			deps: ['jquery', 'bootstrap', 'jquery.cookie', 'jquery-treegrid']
		},
		'jquery-validation': {
			deps: ['jquery', 'lib/jquery-validation/dist/jquery.validate.min']
		},
		'jquery-placeholder': {
			deps: ['jquery']
		},
		'placeholder': {
			deps: ['jquery']
		},
		'jquery.validationEngine': {
			deps: ['css!css/validationEngine.jquery.css', 'jquery', 'lib/validation-engine-ciaoca/js/jquery.validationEngine']
		},
		'miniui': {
			deps: [
				//'css!lib/miniui-3.8.2-wonders/themes/default/miniui.css',
				//'css!lib/miniui-3.8.2-wonders/themes/metro-white/skin.css',
				//'css!lib/miniui-3.8.2-wonders/themes/default/medium-mode.css',
				'bootstrap',
				'jquery'
			]
		},
		'select2': {
			deps: ['css!lib/select2/dist/css/select2.min.css']
		}
	}
});

/* 文件上传组件 */
define('plupload_cn',['plupload'],function(plupload){
	plupload.addI18n({"Stop Upload":"停止上传","Upload URL might be wrong or doesn't exist.":"上传的URL可能是错误的或不存在。","tb":"tb","Size":"大小","Close":"关闭","You must specify either browse_button or drop_element.":"您必须指定 browse_button 或者 drop_element。","Init error.":"初始化错误。","Add files to the upload queue and click the start button.":"将文件添加到上传队列，然后点击”开始上传“按钮。","List":"列表","Filename":"文件名","%s specified, but cannot be found.":"%s 已指定，但是没有找到。","Image format either wrong or not supported.":"图片格式错误或者不支持。","Status":"状态","HTTP Error.":"HTTP 错误。","Start Upload":"开始上传","Error: File too large:":"错误: 文件太大:","kb":"kb","Duplicate file error.":"重复文件错误。","File size error.":"文件大小错误。","N/A":"N/A","gb":"gb","Error: Invalid file extension:":"错误：无效的文件扩展名:","Select files":"选择文件","%s already present in the queue.":"%s 已经在当前队列里。","Resoultion out of boundaries! <b>%s</b> runtime supports images only up to %wx%hpx.":"超限。<b>%s</b> 支持最大 %wx%hpx 的图片。","File: %s":"文件: %s","b":"b","Uploaded %d/%d files":"已上传 %d/%d 个文件","Upload element accepts only %d file(s) at a time. Extra files were stripped.":"每次只接受同时上传 %d 个文件，多余的文件将会被删除。","%d files queued":"%d 个文件加入到队列","File: %s, size: %d, max file size: %d":"文件: %s, 大小: %d, 最大文件大小: %d","Thumbnails":"缩略图","Drag files here.":"把文件拖到这里。","Runtime ran out of available memory.":"运行时已消耗所有可用内存。","File count error.":"文件数量错误。","File extension error.":"文件扩展名错误。","mb":"mb","Add Files":"增加文件"});
	return plupload;
});

/* 日期工具库中文 */
define('moment_cn',['moment'],function(moment){
	var zhCn = moment.defineLocale('zh-cn', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY年M月D日',
	        LLL : 'YYYY年M月D日Ah点mm分',
	        LLLL : 'YYYY年M月D日ddddAh点mm分',
	        l : 'YYYY-M-D',
	        ll : 'YYYY年M月D日',
	        lll : 'YYYY年M月D日 HH:mm',
	        llll : 'YYYY年M月D日dddd HH:mm'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' ||
	                meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        } else {
	            // '中午'
	            return hour >= 11 ? hour : hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : '[今天]LT',
	        nextDay : '[明天]LT',
	        nextWeek : '[下]ddddLT',
	        lastDay : '[昨天]LT',
	        lastWeek : '[上]ddddLT',
	        sameElse : 'L'
	    },
	    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s内',
	        past : '%s前',
	        s : '几秒',
	        ss : '%d 秒',
	        m : '1 分钟',
	        mm : '%d 分钟',
	        h : '1 小时',
	        hh : '%d 小时',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 个月',
	        MM : '%d 个月',
	        y : '1 年',
	        yy : '%d 年'
	    },
	    week : {
	        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});
	
	return moment;
});

/* 组件列表包含示例 
requirejs([
	'${resourcepath}/src/js/requirejs-config.js',
	'${resourcepath}/src/js/common/configs.js'], function () {
    requirejs([
    	'art-template', 
    	'bootstrap', 
    	'bootstrap-colorpicker', 
    	'bootstrap-datepicker', 
    	'bootstrap-daterangepicker', 
    	'bootstrap-slider', 
    	'bootstrap-switch', 
    	'bootstrap-timepicker', 
    	'bootstrap-treeview', 
    	'ckeditor', 
    	'datatables.net', 
    	'datatables.net-bs', 
    	'fastclick', 
    	'ion.rangeSlider', 
    	'jquery', 
    	'jquery-dateFormat', 
    	'jquery-form', 
    	'jquery-knob', 
    	'jquery-placeholder', 
    	'jquery-slimscroll', 
    	'jquery-sparkline', 
    	'jquery.validationEngine', 
    	'jquery.cookie', 
    	'jquery-treegrid', 
    	'bootstrap-treegrid', 
    	'jquery-validation', 
    	'jshash.md5', 
    	'jshash.ripemd160', 
    	'jshash.sha1', 
    	'jshash.sha256', 
    	'jshash.sha512', 
    	'layer', 
    	'moment', 
    	'mustache', 
    	'pace', 
    	'plupload_cn', 
    	'select2' ,
    	'./js/adminlte.js'
    	], function(){
    	$(function(){
    		// TODO
    	});
    });
});
*/



