from flask import Blueprint, render_template, request, session, redirect, url_for
from os import path

index_blueprint = Blueprint(
    'home',
    __name__,
    # path.pardir ==> ../
    template_folder=path.join(path.pardir, path.pardir, 'templates', 'home'),
    # Prefix of Route URL
    url_prefix='/home',
)


@index_blueprint.route("/")
def home():
    # u =
    return render_template("home.html")
