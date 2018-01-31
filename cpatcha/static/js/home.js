var getUsername = function () {
    var username = localStorage.getItem('username')
    console.log(localStorage.getItem('username'), username)
    $('.top_user').html(username)
}

var __main = function () {
    getUsername()
}
$(document).ready(function () {
    __main()
})