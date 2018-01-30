from flask import Flask, redirect, url_for
# from cpatcha.config import DevConfig
# from cpatcha.routes import index
from cpatcha.routes import index, home
from cpatcha.routes.api import api_user, api_phone_email_cpatcha
from cpatcha.config import Config


def configured_app(object_name):
    app = Flask(__name__)

    # Get the config from object of DecConfig
    # 使用 onfig.from_object() 而不使用 app.config['DEBUG'] 是因为这样可以加载 class DevConfig 的配置变量集合，而不需要一项一项的添加和修改。
    app.config.from_object(object_name)
    # app.secret_key = Config.SECRET_KEY

    app.register_blueprint(index.index_blueprint)
    app.register_blueprint(home.home_blueprint)
    app.register_blueprint(api_user.api_user_blueprint)
    app.register_blueprint(api_phone_email_cpatcha.api_phone_email_cpatcha_blueprint)

    # 指定 URL='/' 的路由规则
    # 当访问 HTTP://server_ip/ GET(Default) 时，call home()
    @app.route('/')
    def get():
        return redirect(url_for("index.index"))

    return app

