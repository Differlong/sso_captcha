import random

from flask import Blueprint, request, json

from cpatcha.models.phone_email_cpatcha import Phone_email_cpatcha

api_phone_email_cpatcha_blueprint = Blueprint(
    'api_phone_email_cpatcha',
    __name__,
    # Prefix of Route URL
    url_prefix='/api/phone_email_cpatcha',
)


@api_phone_email_cpatcha_blueprint.route('/add_phone_cpatcha', methods=['POST'])
def add_phone_cpatcha():
    data = request.get_data().decode()
    json_data = json.loads(data)

    phone = json_data['phone']
    p_cpatcha = random_cpatcha()
    c = Phone_email_cpatcha.find_by(phone=phone)

    if len(phone) > 2 and c is None:
        c = Phone_email_cpatcha.new(dict(
            phone=phone,
            p_cpatcha=p_cpatcha,
        ))
        c = c.__dict__
        c['code'] = 200
        del c['_id']
        del c['email']
        del c['deleted']
        del c['e_cpatcha']
        c_json = json.dumps(c)
        return c_json
    else:
        Phone_email_cpatcha.update(c.id, dict(
            phone=phone,
            p_cpatcha=p_cpatcha,
        ))
        c = Phone_email_cpatcha.find_by(phone=phone)
        c = c.__dict__
        c['code'] = 200
        del c['_id']
        del c['email']
        del c['deleted']
        del c['e_cpatcha']
        c_json = json.dumps(c)
        return c_json


@api_phone_email_cpatcha_blueprint.route('/add_email_cpatcha', methods=['POST'])
def add_email_cpatcha():
    data = request.get_data().decode()
    json_data = json.loads(data)

    email = json_data['email']
    e_cpatcha = random_cpatcha()
    c = Phone_email_cpatcha.find_by(email=email)

    if len(email) > 2 and c is None:
        c = Phone_email_cpatcha.new(dict(
            email=email,
            e_cpatcha=e_cpatcha,
        ))
        c = c.__dict__
        c['code'] = 200
        del c['_id']
        del c['phone']
        del c['deleted']
        del c['p_cpatcha']
        c_json = json.dumps(c)
        return c_json
    else:
        Phone_email_cpatcha.update(c.id, dict(
            email=email,
            e_cpatcha=e_cpatcha,
        ))
        c = Phone_email_cpatcha.find_by(email=email)
        c = c.__dict__
        c['code'] = 200
        del c['_id']
        del c['phone']
        del c['deleted']
        del c['p_cpatcha']
        c_json = json.dumps(c)
        return c_json


@api_phone_email_cpatcha_blueprint.route('/find_cpatcha/', methods=['GET'])
def find_cpatcha():
    phone_or_email = request.args['phone_or_email']

    if phone_or_email.find('@') != -1:
        email = phone_or_email
        if Phone_email_cpatcha.find_by(email=email) is None:
            c_json = json.dumps({'code': 401})
            return c_json
        else:
            c = Phone_email_cpatcha.find_by(email=email).__dict__
            c['code'] = 200
            del c['_id']
            del c['p_cpatcha']
            del c['phone']
            u_json = json.dumps(c)
            return u_json
    else:
        phone = phone_or_email
        if Phone_email_cpatcha.find_by(phone=phone) is None:
            c_json = json.dumps({'code': 401})
            return c_json
        else:
            c = Phone_email_cpatcha.find_by(phone=phone).__dict__
            c['code'] = 200
            del c['_id']
            del c['email']
            del c['e_cpatcha']

            u_json = json.dumps(c)
            return u_json


def random_cpatcha():
    c = random.randint(10000, 999999)
    return c
