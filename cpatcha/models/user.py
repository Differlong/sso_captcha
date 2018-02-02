from cpatcha.models import Model
import hashlib


class User(Model):
    @classmethod
    def valid_names(cls):
        names = super().valid_names()
        names = names + [
            # (字段名, 类型, 默认值)
            ('username', str, ''),
            ('password', str, ''),
            ('phone', str, ''),
            ('email', str, ''),
            ('user_role', int, 3),
            ('isEffective', bool, True),
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

