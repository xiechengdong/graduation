var listAction = {
    grid: null,//结果grid
    getStuUrl: "http://25x535820c.qicp.vip:39011/stu/findAllTea",

    init: function () {
        listAction.drowHtml();

    },
    drowHtml: function () {
        this.grid = mini.get("datagrid1");//结果grid
        //列表查询条件加载
        this.grid.on("beforeload", function (e) {
            flg = 0;
            var data = {
                'content': {
                    'content': mini.get("content").getValue(),
                    // 'number': mini.get("number").getValue(),
                    // 'major':mini.get("major").getValue(),
                    // 'phone': mini.get("phone").getValue(),
                }
            };
            e.data = wdutil.encode(data);
            console.log(e.data);
        });
        listAction.grid.setUrl(listAction.getStuUrl);
        listAction.doQuery();
    },

    onKeyEnter: function (e) {//输入框回车事件
        listAction.grid.reload();
    },

    doReset: function () {//清空查询条件
        listAction.grid.clearRows();
    },

    doQuery: function () {//执行查询
        listAction.grid.load();
    },

    doQueryClear: function () {//执行查询
        mini.get("content").setValue("");
        // mini.get("number").setValue("");
        // mini.get("major").setValue("");
        // mini.get("phone").setValue("");
        listAction.grid.reload();
    },

    //注销
    iscanceled: function(id){
        console.log(id);
        wdutil.ajax.post({
            url: 'http://25x535820c.qicp.vip:39011/stu/delByteaId/'+id,
            //data: {userId: userId},
            success: function (text) {
                wdutil.win.alert("操作成功");
                listAction.grid.reload();
            }
        });
    },

    //重置密码
    resetpsw: function(id){
        wdutil.ajax.post({
            url: 'http://25x535820c.qicp.vip:39011/stu/ResteTeacherPassword/'+id,
            //data: {userId: userId},
            success: function (text) {
                wdutil.win.alert("操作成功");
                //listAction.grid.reload();
            }
        });
    },

    edit: function (userId) {
        window.location.href = "/pages/teacher/add.html?&pid=" + userId;
    },


    onOperatorRenderer: function (e) {
        var html = '';
        html += '<a	class="mini-button mini-button-plain" href="javascript:void(0)"	onclick="listAction.edit('
            + e.row.id
            + ')"><i class="fa fa-pencil fa-fw"></i><span class="mini-button-text">修改</span></a>';
        html += '<a	class="mini-button mini-button-plain" href="javascript:void(0)"	onclick="listAction.resetpsw('
            + e.row.id
            + ')"><i class="fa fa-pencil fa-fw"></i><span class="mini-button-text">重置密码</span></a>';
        html += '<a	class="mini-button mini-button-plain" href="javascript:void(0)"	onclick="listAction.iscanceled('
            + e.row.id
            +')"><i class="fa fa-pencil fa-fw"></i><span class="mini-button-text">注销</span></a>';
        return html;
    },
};
$(function () {
    listAction.init();
});