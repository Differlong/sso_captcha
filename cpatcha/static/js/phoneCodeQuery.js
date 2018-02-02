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
            setFormValues(phone_or_email, data)
        }

    })
}


var cpatchaResend = function () {
    var phone_or_email = $(".name").text()
    if (phone_or_email.indexOf('@') === -1) {
        sendPhoen(phone_or_email)
    } else {
        sendEmail(phone_or_email)

    }

}

var cpatchaOverdue = function () {
    var phone_or_email = $('.name').text()
    if (phone_or_email.indexOf('@') === -1) {
        overduePhoen(phone_or_email)
    } else {
        overdueEmail(phone_or_email)

    }
}

function sendPhoen(phone) {
    $.ajax({
        type: 'post',
        url: '/api/phone_email_cpatcha/add_phone_cpatcha',
        contentType: 'application/json',
        data: JSON.stringify({
            "phone": phone,
        }),
        success: function (data) {
            setFormValues(phone, data)
        }

    })
}

function sendEmail(email) {
    $.ajax({
        type: 'post',
        url: '/api/phone_email_cpatcha/add_email_cpatcha',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": email,
        }),
        success: function (data) {
            setFormValues(email, data)
        }

    })
}

function overduePhoen(phone) {
    $.ajax({
        type: 'put',
        url: '/api/phone_email_cpatcha/overdue_cpatcha',
        contentType: 'application/json',
        data: JSON.stringify({
            "phone": phone,
        }),
        success: function (data) {
            if (data.code === 200) {
                var cpatcha = $('.cpatcha').text()
                $('.cpatcha').html(cpatcha + "(已过期)")
            } else {
                console.log('过期手机', data.code)
            }

        }

    })
}

function overdueEmail(email) {
    $.ajax({
        type: 'put',
        url: '/api/phone_email_cpatcha/overdue_cpatcha',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": email,
        }),
        success: function (data) {
            if (data.code === 200) {
                var cpatcha = $('.cpatcha').text()
                $('.cpatcha').html(cpatcha + "(已过期)")
            } else {
                console.log('过期邮箱', data.code)
            }

        }

    })
}

function setFormValues(phone_or_email, data) {
    if (phone_or_email.indexOf('@') === -1) {
        var name = data.phone
        var cpatcha = data.p_cpatcha
    } else {
        var name = data.email
        var cpatcha = data.e_cpatcha

    }
    if (data.isEffective === false) {
        var cpatcha = cpatcha + "(已过期)"
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
var __main = function () {
    $("table").hide()
    $(".btn_t1").click(function () {
        submitQueryForm()
    })
    $(".btn_resend").click(function () {
        cpatchaResend()
    })
    $(".btn_overdue").click(function () {
        cpatchaOverdue()
    })

}

$(document).ready(function () {
    __main()
})
