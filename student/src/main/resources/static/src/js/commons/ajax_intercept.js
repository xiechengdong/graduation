jQuery(function (jQuery) {
    // 备份jquery的ajax方法
    var _ajax = $.ajax;
    // 重写ajax方法，先判断登录在执行success函数
    $.ajax = function (opt) {
        // 未登录跳转地址
        var url = site.path.baseUrl + site.url.loginPage;
        if (!opt.contentType) {
            opt.contentType = "application/json; charset=utf-8";
        }
        if (!opt.dataType) {
            opt.dataType = "json";
        }
        if (localStorage.getItem(site.localStorageKey.localStorageAuthorizationKey)) {
            opt.headers = {Authorization: localStorage.getItem(site.localStorageKey.localStorageAuthorizationKey)};
        } else {
            top.window.location.href = url;
        }
        var _success = opt && opt.success || function (a, b) {
        };
        var _opt = $.extend(opt, {
            success: function (data, textStatus) {
                if (401 == data.statusCode) {
                    console.log(data)
                    if (top) {
                        top.window.location.href = url;
                    } else {
                        window.location.href = url;
                    }
                }
                _success(data, textStatus);
            }
        });
        return _ajax(_opt);
    };
});
