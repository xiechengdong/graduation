var index = {
    init: function () {
        $("#logout").click(function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.open({
                    title: "提示",
                    content: '确认退出？',
                    yes: function (index, layero) {
                        window.location.href = "/pages/main/login.html";
                    },
                    cancel: function (index, layero) {
                        layer.close(index);
                        return false;
                    }
                });
            });
        })
    }
};
$(function () {
    index.init();
});
