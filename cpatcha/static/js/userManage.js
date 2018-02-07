/**
 * Created by zhao on 2018/1/29.
 */
var submitQueryForm = function () {
    $.ajax({
        type: 'get',
        url: '/api/user/' + $("#username").val(),
        contentType: 'application/json',
        success: function (data) {
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

var logout = function () {
    $.ajax({
        type: 'post',
        url: '/api/user/logout',
    })
}

var pwResend = function () {
    var username = $('.username').text()
    $.messager.confirm('确认', '将用户的密码重置为"qwer1234"？', function (r) {
        if (r) {

            $.ajax({
                type: "put",
                url: "/api/user/password_resend",
                contentType: 'application/json',
                data: JSON.stringify({
                    "username": username,
                    "password": "qwer1234",

                }),
                success: function (data) {
                    if (data.code === 200) {
                        $.messager.confirm('确认', '密码重置成功！')
                    } else {
                        alert(data.code)
                    }
                }
            })
        }
    })
}

var userState = function () {
    var userState = $(".btn_state").text()
    if (userState.indexOf('停用') === -1) {
        startUser()
    } else {
        stopUser()

    }
}

function startUser() {
    var username = $('.username').text()
    $.ajax({
        type: 'put',
        url: '/api/user/start_user',
        contentType: 'application/json',
        data: JSON.stringify({
            "username": username,
        }),
        success: function (data) {
            if (data.code === 200) {
                var username = $('.username').text()
                $('.btn_state').html("停用")
            } else {
                console.log('启用用户', data.code)
            }

        }

    })
}

function stopUser() {
    var username = $('.username').text()
    $.ajax({
        type: 'put',
        url: '/api/user/stop_user',
        contentType: 'application/json',
        data: JSON.stringify({
            "username": username,
        }),
        success: function (data) {
            if (data.code === 200) {
                var username = $('.username').text()
                // $('.username').html(username + "(停用)")
                $('.btn_state').html("启用")
            } else {
                console.log('停用用户', data.code)
            }

        }

    })
}


var __main = function () {
    $("table").hide()
    $(".btn_t1").click(function () {
        submitQueryForm()
    })
    $(".btn_stop").click(function () {
        logout()
    })

    $(".btn_resend").click(function () {
        pwResend()
    })
    $(".btn_state").click(function () {
        userState()
    })

}

$(document).ready(function () {
    __main()
})