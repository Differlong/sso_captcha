# 解析器
from flask_restful import reqparse

user_post_parser = reqparse.RequestParser()

user_post_parser.add_argument(
    'username',
    type=str,
    required=True,
    help='username is required!',
)

user_post_parser.add_argument(
    'password',
    type=str,
    required=True,
    help='password is required!',
)

user_post_parser.add_argument(
    'phone',
    type=str,
    required=True,
    help='phone is required!',
)