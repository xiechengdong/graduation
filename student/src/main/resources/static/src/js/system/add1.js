var fromAction = {
    form: null,

    init: function () {
        this.form = new mini.Form("#formPanel");
        this.form.setChanged(false);

    },
    save: function () {
        // 校验表单数据
        this.form.validate();
        //提交表单数据
        if (this.form.isValid() == false) {
            //wdutil.win.warn(this.form.getErrorTexts()[0]);
            wdutil.win.warn("信息填写不完整或格式不对，请重新输入！");
            return false;
        }
        var data = this.form.getData(true, false);

        console.log(data);
        var jsonParams = JSON.stringify(data);
        mini.ajax({
            url:  'http://25x535820c.qicp.vip:39011/systemInfo/save',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "post",
            data: jsonParams,
            success: function (data) {
                console.log(data);
                if (!data || data.code!=20000) {
                    if(data.message){wdutil.win.alert(data.message);}
                    return;
                }
                wdutil.win.alert('操作成功');
                //window.CloseOwnerWindow(data);
            }
        });
    },
    goBack: function () {
        window.location.href = "/pages/system/list.html";
    },
};
//初始化函数
$(function () {
    mini.parse();
    fromAction.init();

});
