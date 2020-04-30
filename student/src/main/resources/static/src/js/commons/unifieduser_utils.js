;(function (window) {
    var unifieduser = {
        baseUrl: "",
        //下拉选择框-码表值获取 根据元素id和码表code加载下拉选择框
        getComboBoxDict: function (id, code, parent, value) {
            mini.ajax({
                type: "post",
                url: site.url.dictionary,
                data: {type: code, parent: parent},
                success: function (text) {
                    var o = mini.decode(text);
                    var ele = mini.get(id);
                    if(ele){
                        ele.setData(o)
                        if (value) {
                            ele.setValue(value);
                        }
                    }
                }
            });
        },
        getDictTextByValue:function(id,code,value){
            mini.ajax({
                type: "post",
                url: site.url.dictionary,
                data: {type: code, parent: undefined},
                success: function (text) {
                    var o = mini.decode(text);
                    var ele = $("#"+id);
                    if(!ele){
                        return;
                    }
                    for(var i=0;i<o.length;i++){
                        if(o[i]["id"]==value){
                            $("#"+id).html(o[i]["text"]);
                            break;
                        }
                    }
                }
            });
        },
        //下拉树-组织机构树
        // getTreeNode: function (id) {
        //     wdutil.ajax.post({
        //         url: site.path.base + '/pxdj/utils/tree',
        //         success: function (text) {
        //             var o = mini.decode(text);
        //             mini.get(id).loadList(o.list, "nodeId", "parentId")
        //         }
        //     });
        // },
        //获取参数 str是指你要获取的参数名
        GetQueryString: function (str) {
            var LocString = String(window.document.location.href);
            var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
            if (tmp = rs) return decodeURIComponent(tmp[2]);
            return "";
        },
        /*关闭窗口*/
        closeWin: function (action) {
            if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
            else window.close();
        },
        // 返回函数
        goBack: function () {
            history.go(-1);
        },
        // 时间格式化函数
        dateFormat: function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        // 字符串格式化时间
        stringDateFormat: function (dateString) {
            dateString = dateString.toString();
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var formatedDate = dateString.replace(pattern, '$1-$2-$3')
            return new Date(Date.parse(formatedDate));
        },
        // 字符串格式化时间字符串
        stringFormatStirng: function (dateString) {
            dateString = dateString.toString();
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            return dateString.replace(pattern, '$1-$2-$3');
        },
        // 字符串格式化时间字符串2
        stringFormatStirng2: function (dateString) {
            dateString = dateString.toString();
            var pattern = /(\d{4})(\d{2})/;
            return dateString.replace(pattern, '$1-$2');
        }
    }
    window.unifieduser = unifieduser;
})(window);
