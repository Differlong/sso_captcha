from cpatcha.models import Model
import hashlib


class User(Model):
    @classmethod
    def valid_names(cls):
        names = super().valid_names()
        names = names + [
            # (字段名, 类型, 默认值)
            ('username', str, False),
            ('password', str, ''),
            ('phone', str, ''),
            ('email', str, ''),
            ('user_role', int, 3),
        ]
        return names

    @staticmethod
    def salted_password(password, salt='$!@><?>HUI&DWQa`'):
        def sha256(ascii_str):
            return hashlib.sha256(ascii_str.encode('ascii')).hexdigest()

        hash1 = sha256(password)
        hash2 = sha256(hash1 + salt)
        return hash2

    def hashed_password(self, pwd):

        # 用 ascii 编码转换成 bytes 对象
        p = pwd.encode('ascii')
        s = hashlib.sha256(p)
        # 返回摘要字符串
        return s.hexdigest()

    # @classmethod
    # def register(cls, form):
    #     name = form['username']
    #     password = form['password']
    #     if len(name) > 2 and User.find_by(username=name) is None:
    #         password = User.salted_password(password)
    #         u = User.new(dict(
    #             username=name,
    #             password=password,
    #         ))
    #         return u
    #     else:
    #         return None
    #
    # @classmethod
    # def validate_login(cls, form):
    #     print('paaa',form['password'])
    #     user = User.find_by(
    #         username=form['username'],
    #         password=User.salted_password(form['password'])
    #     )
    #     print('loginpsw',form['username'],User.salted_password(form['password']))
    #     return user
