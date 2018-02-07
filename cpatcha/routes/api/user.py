from flask import request, jsonify, session
from flask.ext.restful import Resource
from cpatcha.models.user import User


class UserApi(Resource):
    def get(self, username=None):
        if username is not None:
            u = User.find_by(username=username)
            if not u:
                return jsonify({'code': 401})

            u = u.__dict__
            u['code'] = 200
            del u['_id']
            del u['password']
            u_json = jsonify(u)
            return u_json
        else:
            return jsonify({'code': 401})

    def post(self):
        if request.json is None:
            # 登出/logout
            session.pop('user_id', None)
            u_json = jsonify({'code': 200})
            return u_json
        else:
            username = request.json.get('username')
            password = request.json.get('password')
            phone = request.json.get('phone')
            # 登录/login
            if username and password is not None:
                u = User.find_by(
                    username=username,
                    password=User.salted_password(password),

                )
                if u is None:
                    return jsonify({'code': 401})
                else:
                    # session 中写入 user_id
                    session['user_id'] = u.id

                    # 设置 cookie 有效期为 永久
                    session.permanent = True
                    u = u.__dict__
                    u['code'] = 200
                    del u['_id']
                    del u['password']
                    return jsonify(u)
            # 添加用户add_user
            if phone is not None:
                if len(username) > 2 and User.find_by(username=username) is None:
                    password = User.salted_password(password)
                    print('aaa', password)
                    u = User.new(dict(
                        username=username,
                        password=password,
                        phone=phone,
                    ))
                    u = u.__dict__
                    u['code'] = 200
                    del u['_id']
                    del u['password']
                    del u['deleted']
                    u_json = jsonify(u)
                    return u_json
                else:
                    u_json = jsonify({'code': 401})
                    return u_json

    def put(self):
        print('666', request.json)
        username = request.json.get('username')
        password = request.json.get('password')
        print('pppp', password)

        u = User.find_by(username=username)
        if u is None:
            return jsonify({'code': 401})
        elif username is not None and password is None:
            if u.isEffective is False:
                # 启用用户/start_user
                User.update(u.id, dict(
                    isEffective=True,
                ))
                return jsonify({'code': 200})
            else:
                # 停用用户/stop_user
                User.update(u.id, dict(
                    isEffective=False,
                ))
                return jsonify({'code': 200})
        elif username is not None and password is not None:
            # 重置密码`qwer1234`
            password = User.salted_password(password)
            User.update(u.id, dict(
                password=password,
            ))
            return jsonify({'code': 200})
        else:
            return jsonify({'code': 401})
