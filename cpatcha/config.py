class Config(object):
    """Base config class."""
    pass


class ProdConfig(Config):
    """Production config class."""
    pass


class DevConfig(Config):
    """Development config class."""
    # Open the DEBUG
    DEBUG = True
    SECRET_KEY = 'aadwqweq'
    # mongodb connection
    # MONGODB_SETTINGS = {
    #     'db': 'sso_cpatcha',
    #     'host': 'localhost',
    #     'port': 27017,
    # }
