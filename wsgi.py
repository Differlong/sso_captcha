#!/usr/bin/env python3

import sys
from os.path import abspath
from os.path import dirname

import cpatcha

sys.path.insert(0, abspath(dirname(__file__)))
application = cpatcha.configured_app('cpatcha.config.ProdConfig')

