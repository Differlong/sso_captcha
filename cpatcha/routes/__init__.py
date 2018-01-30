from flask import session

from cpatcha.models.user import User


def current_user():
    uid = session['user_id']
    u = User.find_by(id=uid)
    return u