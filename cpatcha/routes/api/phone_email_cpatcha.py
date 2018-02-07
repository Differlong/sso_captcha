import random

from flask import request, jsonify, json
from flask_restful import Resource

from cpatcha.models.phone_email_cpatcha import Phone_email_cpatcha


class PhoneEmailCpatchaApi(Resource):
    def get(self, phone_or_email=None):
        if phone_or_email is None:
            return jsonify({'code': 401})
        else:
            if phone_or_email.find('@') != -1:
                email = phone_or_email
                if Phone_email_cpatcha.find_by(email=email) is None:
                    c_json = jsonify({'code': 401})
                    return c_json
                else:
                    c = Phone_email_cpatcha.find_by(email=email).__dict__
                    c['code'] = 200
                    del c['_id']
                    del c['p_cpatcha']
                    del c['phone']
                    return jsonify(c)
            else:
                phone = phone_or_email
                if len(phone) < 2:
                    return jsonify({'code': 401})

                if Phone_email_cpatcha.find_by(phone=phone) is None:
                    return jsonify({'code': 401})
                else:
                    c = Phone_email_cpatcha.find_by(phone=phone).__dict__
                    c['code'] = 200
                    del c['_id']
                    del c['email']
                    del c['e_cpatcha']

                    return jsonify(c)

    def post(self):
        phone = request.json.get('phone')
        email = request.json.get('email')
        cpatcha = Phone_email_cpatcha.random_cpatcha()

        if request.json is None:
            return jsonify({'code': 401})
        elif phone is not None:
            c = Phone_email_cpatcha.find_by(phone=phone)
            # 发送手机验证码
            if len(phone) > 2 and c is None:
                c = Phone_email_cpatcha.new(dict(
                    phone=phone,
                    p_cpatcha=cpatcha,
                    isEffective=True,
                ))
                c = c.__dict__
                c['code'] = 200
                del c['_id']
                del c['email']
                del c['e_cpatcha']
                c_json = jsonify(c)
                return c_json
            else:
                Phone_email_cpatcha.update(c.id, dict(
                    phone=phone,
                    p_cpatcha=cpatcha,
                    isEffective=True,
                ))
                c = Phone_email_cpatcha.find_by(phone=phone)
                c = c.__dict__
                c['code'] = 200
                del c['_id']
                del c['email']
                del c['e_cpatcha']
                c_json = jsonify(c)
                return c_json
        elif email is not None:
            # 发送邮箱验证码
            c = Phone_email_cpatcha.find_by(email=email)
            if len(email) > 2 and c is None:
                c = Phone_email_cpatcha.new(dict(
                    email=email,
                    e_cpatcha=cpatcha,
                    isEffective=True,

                ))
                c = c.__dict__
                c['code'] = 200
                del c['_id']
                del c['phone']
                del c['p_cpatcha']
                c_json = jsonify(c)
                return c_json
            else:
                Phone_email_cpatcha.update(c.id, dict(
                    email=email,
                    e_cpatcha=cpatcha,
                    isEffective=True,
                ))
                c = Phone_email_cpatcha.find_by(email=email)
                c = c.__dict__
                c['code'] = 200
                del c['_id']
                del c['phone']
                del c['p_cpatcha']
                c_json = jsonify(c)
                return c_json

    def put(self):
        phone_or_email = request.json

        if 'email' in phone_or_email.keys():
            email = phone_or_email.get('email')
            if Phone_email_cpatcha.find_by(email=email) is None:
                return jsonify({'code': 401})
            else:
                c = Phone_email_cpatcha.find_by(email=email)
                Phone_email_cpatcha.update(c.id, dict(
                    isEffective=False,
                ))
                return jsonify({'code': 200})
        else:
            phone = phone_or_email.get('phone')

            if len(phone) < 2:
                return jsonify({'code': 401})

            if Phone_email_cpatcha.find_by(phone=phone) is None:
                return jsonify({'code': 401})
            else:
                c = Phone_email_cpatcha.find_by(phone=phone)
                Phone_email_cpatcha.update(c.id, dict(
                    isEffective=False,
                ))

                return jsonify({'code': 200})
