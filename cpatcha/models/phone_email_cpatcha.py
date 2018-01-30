from cpatcha.models import Model


class Phone_email_cpatcha(Model):
    @classmethod
    def valid_names(cls):
        names = super().valid_names()
        names = names + [
            # (字段名, 类型, 默认值)
            ('phone', str, ''),
            ('email', str, ''),
            ('p_cpatcha', int, None),
            ('e_cpatcha', int, None),
        ]
        return names

