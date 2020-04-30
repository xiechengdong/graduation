;(function (window) {
    var site = {
        localStorageKey: {
            localStorageAuthorizationKey: 'tyjrtyyh_token',
            localStorageAuthorizationTokenKey: 'tyjrtyyh_token_key',
            localStorageUserInfoKey: 'tyjrtyyh_userinfo_key',
        },
        crypto: {
            password_rsa_eanble: false,
            publicKey: 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxuGqhEAzEd13xa01vdSZjAxuueKbOLEZp6+l/Oih3l/tAtYNQZ6aAwouVfJGlqbMxRcTVmBSEDmexYSBoT6DoNWUFbLr+Kklkvq2Y8vHUn6hiT2ddlYfKuYgjo7QwmLZI6Z8kT9CAUoxKVZeS2zWV0rsPLMgPdEPtyndXJQSUTArVQZH/0Aq7DkNO808EmJnS/PZiCWJUPrxLmyHtKPkEdGgK55XGjEuE0mp7/yXUmO/hN2SD3yBmipyl+wq+JLkjm/cc3Qn30uL+OjLhiQoK/TwwcCTQptciUuEtbclXxbEiT5TUzCeYyFqSA08xkX3hl4uYN6xq/DJjvCYIKc13AgMBAAECggEBAICKOw09V46uK1NW4c4QtG/+qoHZoAQU/+TSjbLItMYzNbXK0yxPm50bmOvJCmsAv6uOo9w9P/F3ncYs0sy/c0kgfW2cA++bVDQ6ucKbTRAVXiuk9MU6Rtn4sR/d4pEXkxhPaRxRYiO+ENwe5h+Az1QK8+L458ZNuGf//asZCiPbWoYQuiH/I6nRccHMtS4S2EohicTW/kZ6unh56W7cETXhUj2iskp496ucRM5kW9GpFKR4gRPt/HjPnioA/m34WKk+png+eN3gS4LMOdXZOcPX8J9RFzB17IxtOOzQxrsSwHIXYHQB4CW1CIjXhrAT4DK3He8Q/4Fjqm+/Sg3ccQECgYEA59+sElH0FGs2hEea2N3/HZ6YZ1oWf42KDtNSYMgJzXji/bXTcAJyDZUizHTZtu4l+3Bv6kqZio5DsGIkOl7YMu8lLHGoQ/UBUePmjoQaEazqR7v9ajShXmIxVutlV2qBUwqLSwm49+KP9721SXAU9zk5fyEJosZxnxBGWFAXJYECgYEAxDZIiuzJfPPKyWhXFDyaHBUlJjeQGbh9tC/weYFsRUIjB3jiyQYWVL7vFv7LudcyqxcazWXkbe89juTRXL4p+OyOmYGp/ufjw+Kprt0UU5BXGUq34I1Qh+4ZDbpK627qFKu3HkswdR5rxG00Wvh9ZN94JZxANUHG+QklyZYvnvcCgYEAgcwVeJPju+JgPCARMEDk5GG5EnG9kl1a4P2uaXrQ8fIvrrIvz82upqfLOQRYMyyQmnXQUCi+Vm9YuM3XVc1t3OU9u+lLte7adErM7w5HwYk4BDvZmbAofLsev3c53XtDNYb7fl/M6QYsbRQG/Tr+oX2pD98gk7veMppbpmf+7QECgYBV4ukIHrPnxRM77DdJvWk756mWO/YQvCgSCnX5ycQp4NRSfgDPO6HkwJsJdsiYdXFRYNCznelKkdFhThmyve7DblDRMufFk52obfwWdeFi3qixgnpQiar5hShkUOpgefFu0OdcFE+GxKUpmx+yvlitIgCGfgnBBiThd7aZserwawKBgFfN5oEN7e3muWM5pJ32/r6Kafm9eSIMS6RPlQCSoVEW/m6wHW2Tve7T4OiOi8eDvhXJBuVaLbLnFsi9e5BJn+/Z6bJurjg4m+16ertmVT2bssFc0k2Q4ZAznbWOIRwrXcOgpHAdi+E+/OXV3Ml8BJqYrqhz7DvjWQx0g3Iw4pv4'
        },
        path: {
            baseUrl: "/ggfwzc/auth",
            loginHeader: 'Basic dGVzdDp0ZXN0MTIzNA=='
        },
        url: {
            loginPage: '/pages/main/login.html',
            indexPage: '/pages/main/index.html',
            loginUrl: '/oauth/login',
            logoutUrl: '/system/logout',
            captcha: '/system/captcha',
            userInfo: '/system/user',
        }
    }
    var tyyh = {
        CurrentUserInfo: function () {
            return JSON.parse(localStorage.getItem(site.localStorageKey.localStorageUserInfoKey));
        },
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
    // loadJS(site.path.baseUrl + '/src/js/commons/ajax_intercept.js', function () {
    //     console.log('/src/js/commons/ajax_intercept.js');
    // });
    window.tyyh = tyyh;
    window.site = site;
})(window);

function loadJS(url, callback) {
    var script = document.createElement('script'),
        fn = callback || function () {
        };
    script.type = 'text/javascript';
    //IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                fn();
            }
        };
    } else {
        //其他浏览器
        script.onload = function () {
            fn();
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
