from functools import wraps

from flask import session, redirect, url_for

from cpatcha.models.user import User


def current_user():
    uid = session.get('user_id')
    u = User.find_by(id=uid)
    return u


def login_required(route_function):
    @wraps(route_function)
    def f(*args, **kwargs):
        u = current_user()
        if u is None:
            return redirect(url_for('index.index'))
        else:
            return route_function(*args, **kwargs)

    return f
