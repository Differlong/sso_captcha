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

