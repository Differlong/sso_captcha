var getUsername = function () {
    var username = localStorage.getItem('username')
    $('.top_user').html(username)
}

var setUserRole = function () {
    var user_role = localStorage.getItem('user_role')
    if (Number(user_role) > 0) {
        $('.user_role0').hide()
    } else {
        $('.user_role0').show()
    }

}
var __main = function () {
    getUsername()
    setUserRole()
}
$(document).ready(function () {
    __main()
})