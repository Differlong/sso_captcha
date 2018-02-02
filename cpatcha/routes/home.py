from flask import Blueprint, render_template, request, session, redirect, url_for
from os import path
from cpatcha.routes import current_user, login_required

home_blueprint = Blueprint(
    'home',
    __name__,
    # path.pardir ==> ../
    template_folder=path.join(path.pardir, path.pardir, 'templates', 'home'),
    # Prefix of Route URL
    url_prefix='/home',
)


@home_blueprint.route("/")
@login_required
def home():
    return render_template("home.html")

