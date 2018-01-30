# import Flask Script object
import os
from flask.ext.script import Manager, Server
from cpatcha import configured_app, models

venv = os.environ.get('SSO_CPATCHA_VENV', 'dev')

app = configured_app('cpatcha.config.%sConfig' % venv.capitalize())
# Init manager object via app object
manager = Manager(app)

# Create a new commands: server
# This command will be run the Flask development_env server
manager.add_command("runserver", Server(host='0.0.0.0', port=4000))


@manager.shell
def make_shell_context():
    """Create a python CLI.

    return: Default import object
    type: `Dict`
    """
    # 确保有导入 Flask app object，否则启动的 CLI 上下文中仍然没有 app 对象
    return dict(app=app,
                Server=Server,
                )


if __name__ == '__main__':
    manager.run()
