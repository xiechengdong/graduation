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

        data.id= getUrlParam("pid");
        console.log(data);
        var jsonParams = JSON.stringify(data);
        mini.ajax({
            url:  'http://25x535820c.qicp.vip:39011/stu/manageModifyTeacherInfo',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: "post",
            data: jsonParams,
            success: function (data) {
                console.log(data);
                if (!data || !data.status || data.code!=20000) {
                    if(data.message){wdutil.win.alert(data.message);}
                    return;
                }
                wdutil.win.alert('修改成功');
                //window.CloseOwnerWindow(data);
            }
        });
    },
    goBack: function () {
        window.location.href = "/pages/teacher/list.html";
    },
};
//初始化函数
$(function () {
    mini.parse();
    var  userId = getUrlParam("pid");
    getByUserID(userId);
    fromAction.init();

});

function getByUserID(userId) {
    console.log(userId);
    var temform = new mini.Form("#formPanel");
    wdutil.ajax.post({
        url: 'http://25x535820c.qicp.vip:39011/stu/findByTeacherId/' + userId,
        success: function (text) {
            console.log(text);
            var o = mini.decode(text);
            temform.setData(o.data);
            temform.setEnabled(true);
            console.log(o);
        }
    });
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
