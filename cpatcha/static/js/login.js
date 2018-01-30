/**
 * 登录 公共处理JS
 */
var UserLogin = {

    /**
     * 页面显示信息
     */
    pageMessage: {
        "01": "请输入您的用户名!",
        "02": "请输入您的密码!",
        "03": "请输入验证码!",
        "04": "验证码错误，请重新输入!",
        "05": "您输入的用户不存在，请重新输入!",
        "1": "登录用户名错误",
        "2": "登录密码错误",
        "3": "登录验证码错误",
        "4": "登录其他错误",
        "5": "该用户所在机构已停用，无权登录",
        "6": "该用户已禁用",
        "7": "该用户所在机构没有分配应用权限",
        "8": "该用户所在机构的学校账号已到期",
        "9": "机构账号开始使用时间未开始",
        "99": "登录成功!"
    },

    /**
     * 初始化
     */
    init: function (key) {
        $("#passwdValue").blur(function () {
            if ($(this).val() == "") {
                $(this).val("请输入密码");
                if ($(this).attr("type") == "password") {
                    $(this).hide();
                    $('#pwd_text').show();
                    $('#pwd_text').val("请输入密码");
                } else {
                    var pass = $('#pwd_text').val();
                    if (pass.length < 1) {
                        $(this).hide();
                        $('#pwd_text').show();
                    }
                }
            }
        });
        $("#pwd_text").focus(function () {
            if ($(this).val() == "请输入密码") {
                $(this).val("");
                if ($(this).attr("type") == "text") {
                    $(this).hide();
                    $('#passwdValue').show();
                    $('#passwdValue').val("");
                    $('#passwdValue').focus();//加上
                } else {
                    var pass = $('#passwdValue').val();
                    if (pass.length < 1) {
                        $(this).hide();
                        $('#pwd_text').show();
                    }
                }
            }
        });

        //获取登录返回key值 错误信息提示
        if (key != null && key != "" && key != "null") {
            $("#loginMsg").html(UserLogin.pageMessage[key]);
            $("#loginMsg").addClass("login_error");
            $("#username").focus();
            return false;
        }
    },

    /**
     * 登录提交的事件 1.首先验证登陆表单 2.验证通过则提交表单
     */
    submitLoginForm: function () {
        // 表单验证
        if (UserLogin.validateLoginFrom()) {
            //加密后密码进行赋值提交
            // $("#password").val(hex_md5($("#passwdValue").val()));
            $.ajax({
                type: 'post',
                url: '/api/user/login',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    "username": $("#username").val(),
                    "password": $("#passwdValue").val()
                }),
                success: function (data) {
                    data = JSON.parse(data)
                    if(data["code"] !== 200) {
                        $("#loginMsg").text(UserLogin.pageMessage["2"])
                        $("#loginMsg").addClass("login_error");
                        $("#pwd_text").focus();
                    } else {
                        window.location.href="/home?backurl="+window.location.href
                        $(".top_user").html(data.username)
                    }

                }

            })
        }
    },

    /**
     * 登录表单验证
     */
    validateLoginFrom: function () {
        var userName = $("#username").val();// 登录名
        var passwdValue = $("#passwdValue").val();// 登录密码
        // 验证登录名：1.为空则提示请输入2.先前台验证，后期改为ajax去后台验证该验证码是否存在
        if (userName.length == 0 || userName == undefined || userName == 'undefined' || userName == "请输入用户名") {
            $("#loginMsg").text(UserLogin.pageMessage["01"]);// 请输入您的用户名!
            $("#loginMsg").addClass("login_error");
            $("#username").focus();
            return false;
        }
        // 验证登录密码是否为空
        if (passwdValue.length == 0 || passwdValue == undefined || passwdValue == 'undefined' || passwdValue == "请输入密码") {
            $("#loginMsg").text(UserLogin.pageMessage["02"]);// 请输入您的密码
            $("#loginMsg").addClass("login_error");
            $("#pwd_text").focus();
            return false;
        }
        return true;
    }

}