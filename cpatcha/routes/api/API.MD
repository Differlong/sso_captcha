# sso_cpatcha 接口文档
```

域名: http://codeai.xin
端口: 8000

```

## 目录：

[1、登录](#1登录)<br/>
[2、登出](#2登出)<br/>
[3、查询用户](#3查询用户)<br/>
[4、增加用户](#4增加用户)<br/>
[5、停用用户](#5停用用户)<br/>
[6、重置密码](#6重置密码)<br/>
[7、发送验证码](#7发送验证码)<br/>
[8、查询验证](#8查询验证)<br/>





## 接口列表：

### 1、登录

#### 请求URL:  
```
http://codeai.xin:8000/api/user/login
```

#### 请求方式: 
```
POST
```


#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   | 用户名 |
|password      |Y       |string  | 密码 |

#### 返回示例：

```javascript
{
    "code": 200,
    "created_time": 1517323364,
    "email": "",
    "id": "5a708464f9a3350a57c35e86",
    "phone": "15910690458",
    "updated_time": 1517323364,
    "user_role": 3,
    "username": "test_root"
}
```

### 2、登出

#### 请求URL：
```
http://codeai.xin:8000/api/user/logout
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |int   |userid |

#### 返回示例：
```javascript
{
  code: 200
}
```

### 3、查询用户

#### 请求URL：
```
http://codeai.xin:8000/api/user/find_user
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   |用户名 |

#### 返回示例：

```javascript
{
    "code": 200,
    "created_time": 1517323364,
    "deleted": false,
    "email": "",
    "id": "5a708464f9a3350a57c35e86", 
    "phone": "15910690458", 
    "updated_time": 1517323364,
    "user_role": 3, 
    "username": "test_root"
}
```

### 4、增加用户

#### 请求URL：
```
http://codeai.xin:8000/api/user/add_user
```


#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   | 用户名 |
|password      |Y       |string  | 密码 |
|phone      |Y       |string  | 手机号 |

#### 返回示例：

```javascript
{
    "code": 200,
    "created_time": 1517452564,
    "email": "",
    "id": "5a727d14f9a3350bf6dab68a",
    "phone": "15910690459",
    "updated_time": 1517452564,
    "user_role": 3,
    "username": "test_admin"
}
```

### 5、停用用户

#### 请求URL：
```
http://codeai.xin:8000/api/user/stop_user
```


#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   | 用户名 |


#### 返回示例：

```javascript
{
    "code":200
}
```

### 6、重置密码

#### 请求URL：
```
http://codeai.xin:8000/api/user/pw_reset
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  |用户名|


#### 返回示例：

```javascript
{
    "code":200
}
```


### 7、发送验证码

#### 请求URL：
```
http://codeai.xin:8000/api/phone_email_cpatcha/add_email_cpatcha
http://codeai.xin:8000/api/phone_email_cpatcha/add_phone_cpatcha
```


#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|phone      |Y       |string  |手机号|
|email      |Y       |string  |邮箱|

#### 返回示例：

```javascript
{
    "code": 200,
    "created_time": 1517324455,
    "e_cpatcha": 489774,
    "email": "15910690458@qq.com",
    "id": "5a7088a7f9a3350bf6dab688",
    "updated_time": 1517324455
}
```


### 8、查询验证

#### 请求URL：
```
http://codeai.xin:8000/api/phone_email_cpatcha/find_cpatcha/
```

#### 请求方式：
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|phone_or_email      |Y       |string   |手机号或邮箱 |

#### 返回示例：

```javascript
{
    "code": 200,
    "created_time": 1517324561,
    "deleted": false,
    "id": "5a708911f9a3350bf6dab689",
    "p_cpatcha": 539536,
    "phone": "15910690458",
    "updated_time": 1517324561
}
```
