# sso_captcha
# About
整个项目分两部分：前端项目接口、后端管理接口，共10多个。涉及登录、注册、登出、添加验证码、用户权限等，
构成一个完整的流程。
# 说明
>  sso_cpatcha 接口文档: [接口文档地址](https://github.com/bailicangdu/node-elm/blob/master/API.md) 

>  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！

>  开发环境 macOS 10.12.4  python 3.6  Mongodb 3.4.2

>  部署环境 阿里云 Ubuntu 16.04 64位

>  项目展示地址：[后台管理系统地址](http://www.codeai.xin:8000/)

## 技术栈
python + flask + MongoDB + pymongo + jQuery + easy-ui

## 目标功能

- [x] 用户停用 -- 完成
- [x] 重置密码 -- 完成
- [x] 重新发送验证码 -- 完成
- [x] 验证码过期 -- 完成
- [x] 登录、登出 -- 完成
- [x] 修改密码 -- 完成
- [x] 用户信息 -- 完成
- [x] 管理员权限验证 -- 完成
- [x] 超级管理员 -- 完成
- [x] 前后台路由同构 -- 完成
- [x] 部署上线 -- 完成


# API接口文档

## [接口文档地址](https://github.com/bailicangdu/node-elm/blob/master/API.md)

### v1.1

user
用户身份
重置密码
用户停用

phone
重新发送验证码
验证码过期

### v1.0
#### 后端功能通过 rest ful 接口实现
##### 实现如下接口：

1.登录

2.登出

3.查询用户

4.增加用户

5.停用用户

6.权限管理

7.重置密码

8.发送验证码

9.查询验证


#### 前端由HTML组成静态页，通过Ajax获取后端数据
 配合jQuery完成业务开发
 