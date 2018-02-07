from flask import Flask, redirect, url_for
# from cpatcha.config import DevConfig
# from cpatcha.routes import index
from flask_restful import Api

from cpatcha.routes import index, home
from cpatcha.config import Config
from cpatcha.routes.api.phone_email_cpatcha import PhoneEmailCpatchaApi
from cpatcha.routes.api.user import UserApi


def configured_app(object_name):
    app = Flask(__name__)
    restful_api = Api(app)
    restful_api.add_resource(
        UserApi,
        # '/api/user',
        '/api/user/<string:username>',
        '/api/user/login',
        '/api/user/logout',
        '/api/user/add_user',
        '/api/user/stop_user',
        '/api/user/start_user',
        '/api/user/password_resend',
        endpoint='restful_api_user'
    )
    restful_api.add_resource(
        PhoneEmailCpatchaApi,
        '/api/phone_email_cpatcha/<string:phone_or_email>',
        '/api/phone_email_cpatcha/add_phone_cpatcha',
        '/api/phone_email_cpatcha/add_email_cpatcha',
        '/api/phone_email_cpatcha/overdue_cpatcha',
        endpoint='restful_api_phone_email_cpatcha'
    )

    # Get the config from object of DecConfig
    # 使用 onfig.from_object() 而不使用 app.config['DEBUG'] 是因为这样可以加载 class DevConfig 的配置变量集合，而不需要一项一项的添加和修改。
    app.config.from_object(object_name)
    app.register_blueprint(index.index_blueprint)
    app.register_blueprint(home.home_blueprint)

    # 指定 URL='/' 的路由规则
    # 当访问 HTTP://server_ip/ GET(Default) 时，call home()
    @app.route('/')
    def get():
        return redirect(url_for("index.index"))

    return app


# 运行代码
if __name__ == '__main__':
    app = configured_app('cpatcha.config.ProdConfig')
    # 自动 reload jinja
    app.jinja_env.auto_reload = True
    # config = dict(
    #     debug=True,
    #     host='0.0.0.0',
    #     port=3000,
    #     threaded=True,
    # )
    # app.run(**config)
    app.run()
