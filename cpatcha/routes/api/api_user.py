from flask import Blueprint, request, json, session, jsonify

from cpatcha.models.user import User

api_user_blueprint = Blueprint(
    'api_user',
    __name__,
    # Prefix of Route URL
    url_prefix='/api/user',
)


@api_user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_data().decode('utf-8')
    json_data = json.loads(data)
    username = json_data['username']
    password = json_data["password"]
    u = User.find_by(
        username=username,
        password=User.salted_password(password),

    )
    if u is None:
        u_json = json.dumps({'code': 401})
        return u_json
    else:
        # session 中写入 user_id
        session['user_id'] = u.id
        # 设置 cookie 有效期为 永久
        session.permanent = True
        u = u.__dict__
        u['code'] = 200
        del u['_id']
        del u['password']
        del u['deleted']
        u_json = json.dumps(u)
        return u_json


@api_user_blueprint.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_data().decode()
    json_data = json.loads(data)

    username = json_data['username']
    password = json_data['password']
    phone = json_data['phone']
    if len(username) > 2 and User.find_by(username=username) is None:
        password = User.salted_password(password)
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
        u_json = json.dumps(u)
        return u_json
    else:
        u_json = json.dumps({'code': 401})
        return u_json


@api_user_blueprint.route('/find_user/', methods=['GET'])
def find_user():
    username = request.args['username']
    if User.find_by(username=username) is None:
        u_json = json.dumps({'code': 401})
        return u_json
    else:
        u = User.find_by(username=username).__dict__
        u['code'] = 200
        del u['_id']
        del u['password']
        u_json = json.dumps(u)
        return u_json
