(function(){
    $("#valine-thread .vcontrol .text-right").append(
      '<button type="button" title="Cmd|Ctrl+Enter" class="vsubmit vbtn mybtn">回复</button>'
    );

    $("#valine-thread .mybtn").on('click', function() {
        // 判断条件 昵称和邮箱必须写
        if ($(".vnick").val().length === 0) {
            alert('请输入昵称');

            $(".vnick").focus();
            return false;
        }

        if ($(".vmail").val().length === 0) {
            alert("请输入邮箱");

            $(".vmail").focus();
            return false;
        }

        // 启动提交事件
        $("#valine-thread .vbtn:not(.mybtn)").trigger("click");
    });
})();