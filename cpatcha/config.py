class Config(object):
    """Base config class."""
    SECRET_KEY = 'aadwqweq'
    TEMPLATES_AUTO_RELOAD = True
    SEND_FILE_MAX_AGE_DEFAULT = 0
    threaded = True


class ProdConfig(Config):
    """Production config class."""
    pass


class DevConfig(Config):
    """Development config class."""
    # Open the DEBUG

    DEBUG = True
