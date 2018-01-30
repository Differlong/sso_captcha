from flask import Blueprint, render_template, request, session, redirect, url_for
from os import path

from cpatcha.models.user import User

index_blueprint = Blueprint(
    'index',
    __name__,
    # path.pardir ==> ../
    template_folder=path.join(path.pardir, path.pardir, 'templates', 'index'),
    # Prefix of Route URL
    url_prefix='/index',
)


@index_blueprint.route("/")
def index():
    return render_template("index.html")


# @index_blueprint.route("/register")
# def register():
#     return render_template("register.html")
#
#
# @index_blueprint.route("/register1", methods=['POST'])
# def register1():
#     form = request.form
#     # 用类函数来判断
#     u = User.register(form)
#     return redirect(url_for('.index'))
#
#
# @index_blueprint.route("/login", methods=['POST'])
# def login():
#     form = request.form
#     u = User.validate_login(form)
#     if u is None:
#         prompt = '登录失败，请输入正确的用户名和密码'
#         # return redirect(url_for('.index'), prompt=prompt)
#         return render_template("index.html", prompt=prompt)
#     else:
#         # session 中写入 user_id
#         session['user_id'] = u.id
#         # 设置 cookie 有效期为 永久
#         session.permanent = True
#         return redirect('/home')
