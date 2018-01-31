import os
from datetime import timedelta


class Config(object):
    """Base config class."""
    SECRET_KEY = os.urandom(24)
    TEMPLATES_AUTO_RELOAD = True
    SEND_FILE_MAX_AGE_DEFAULT = 0
    threaded = True


class ProdConfig(Config):
    """Production config class."""
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)


class DevConfig(Config):
    """Development config class."""
    # Open the DEBUG

    DEBUG = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
