/**
 * Created by zhao on 2018/1/29.
 */
var submitQueryForm = function () {
    $.ajax({
        type: 'get',
        url: '/api/user/find_user',
        contentType: 'application/json',
        data: {
            "username": $("#username").val(),
        },
        success: function (data) {
            data = JSON.parse(data)
            if (data.code === 200) {
                $('table').show()
                $(".con_box1_span").hide()
                $(".username").html(data.username)
                $(".phone").html(data.phone)
                $(".type").html(data.user_role)
            } else {
                $(".con_box1_span").show()
                $("table").hide()
                $(".con_box1_span").html('此用户不存在')

            }
        }

    })
}


var __main = function () {
    $("table").hide()
    $(".btn_t1").click(function () {
        submitQueryForm()
    })

}

$(document).ready(function () {
    __main()
})