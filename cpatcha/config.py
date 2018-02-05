import os
from datetime import timedelta


class Config(object):
    """Base config class."""
    SECRET_KEY = os.urandom(24)
    TEMPLATES_AUTO_RELOAD = True
    SEND_FILE_MAX_AGE_DEFAULT = 0
    THREADED = True


class ProdConfig(Config):
    """Production config class."""
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    HOST = '0.0.0.0'
    PORT = 4000


class DevConfig(Config):
    """Development config class."""
    # Open the DEBUG
    # HOST = 'localhost'
    # PORT = 4000
    DEBUG = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
