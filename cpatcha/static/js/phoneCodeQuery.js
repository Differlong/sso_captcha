var submitQueryForm = function () {
    var phone_or_email = $("#phone_mail").val()
    $.ajax({
        type: 'get',
        url: '/api/phone_email_cpatcha/find_cpatcha',
        contentType: 'application/json',
        data: {
            "phone_or_email": phone_or_email,
        },
        success: function (data) {
            data = JSON.parse(data)
            if (phone_or_email.indexOf('@') !== -1) {
                var name = data.email
                var cpatcha = data.e_cpatcha
            } else {
                var name = data.phone
                var cpatcha = data.p_cpatcha
            }

            if (data.code === 200) {
                $('table').show()
                $(".con_box1_span").hide()
                $(".name").html(name)
                $(".cpatcha").html(cpatcha)
                $(".type").html(data.user_role)
            } else {
                $(".con_box1_span").show()
                $("table").hide()
                $(".con_box1_span").html('此手机号/邮箱不存在')


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
