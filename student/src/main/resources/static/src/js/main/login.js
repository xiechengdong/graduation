var login = {

    // 登录/注册
    loginOrRegist: function (account, password) {
        var data = {};
        data.name = account;
        data.password = password;
        var jsonParams = JSON.stringify(data);
        $.ajax({
            url:  'http://25x535820c.qicp.vip:39011/admin/adminlogin',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "post",
            data: jsonParams,
            success: function (data) {
                if (!data || data.code!=20000) {
                    $("#error").text(data.message);
                    return;
                }
                //登录成功跳转
                window.location.href = "/pages/backstage/backstage_index.html";
            }
        });
    },
    // 初始化函数
    init: function () {
        // 确定按钮点击事件
        $("#showTooltips").click(function () {
            var account = $('#account').val();
            var password = $('#password1').val();
            if (account == "" || account == null) $("#error").text('请输入账户');
            else if (password == "" || password == null) $("#error").text('请输入密码');
            else {
                if (site && site.crypto && site.crypto.password_rsa_eanble) {
                    account = wdutil.crypto.rsa.encrypt(account);
                    password = wdutil.crypto.rsa.encrypt(password);
                }
                login.loginOrRegist(account, password);
            }
        });
    },
};
$(function () {
    login.init();
});
