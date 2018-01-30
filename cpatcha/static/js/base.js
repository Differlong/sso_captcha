/**
 * 基础公共js封装
 */
var BaseJs = {  
	
	/**
	 * 复选框选中
	 * @param name 复选框名称
	 */
	checkedAll: function(name){
		$("input[name='"+name+"']").prop("checked", function( i, val ) {  
            return !val;  
		}); 
	},
	
	/**
	 * value 是否可用
	 * @param value
	 * @returns {Boolean}
	 */
	checkValidatorData: function(value){
		if( typeof value == 'undefined' )
			 return false;
		 else if( value == null )
			 return false;
		 else if( value == 'null' )
			 return false;
		 else if( value == '' )
			 return false;
		 return true;
	},
	
	/**
	 * 对象是否可用
	 * @returns {Boolean}
	 */
	checkValidatorObject: function(obj){
		if( typeof obj == 'undefined' )
			return false;
		else if( obj == null )
			return false;
		else if( obj == '' )
			return false;
		return true;
	},
	
	/**
	 * 获取radio选中值
	 * @param radioName
	 * @returns
	 */
	getRadioVal: function(radioName){
		var obj = document.getElementsByName(radioName);
		if(obj == null)return null;
		for(var i = 0;i < obj.length;i++){        
			if(obj[i].checked){    
				return obj[i].value;        
			}        
		}
		return null;
	},
	
	/**
	 * 获取复选框选中值
	 * @param name
	 * @returns {Array}
	 */
	getCheckboxVal: function(name){
		var check_arr = document.getElementsByName(name);
		var val_arr = new Array();
		for( var i = 0; i < check_arr.length; i++ ){
			if( check_arr[i].checked==true ){
				val_arr.push(check_arr[i].value);
			}
		}
		return val_arr;
	},
	
	/**
	 * js 数据的hash表结构
	 */
	hashTable: function(){  
	    this._hash = new Object();  
	    this.add = function(key, value){  
	        if (typeof(key) != "undefined") {  
	            if (this.contains(key) === false) {  
	                this._hash[key] = typeof(value) == "undefined" ? null : value;  
	                return true;  
	            }  
	            else {  
	                return false;  
	            }  
	        }  
	        else {  
	            return false;  
	        }  
	    };  
	    this.remove = function(key){  
	        delete this._hash[key];  
	    };  
	    this.count = function(){  
	        var i = 0;  
	        for (var k in this._hash) {  
	            i = i + 1;  
	        }  
	        if (i == 0)   
	            return "0";  
	        return i;  
	    };  
	    this.items = function(key){  
	        return this._hash[key];  
	    };  
	    this.contains = function(key){  
	        return typeof(this._hash[key]) != "undefined";  
	    };  
	    this.clear = function(){  
	        for (var k in this._hash) {  
	            delete this._hash[k];  
	        }  
	    };
	    this.createParamUrl = function(){
	    	var values = "";
	    	for (var key in this._hash) {
	    		values += ("&" + key + "=" + this._hash[key]);
	    	}
	    	return values;
	    }
	},
	
	/***
	 * js 获取传入页面的值 
	 * @param parame 参数名
	 * @returns
	 */
	getRequestParame: function(parame){  
	    var url = location.search; //获取url中"?"符后的字串  
	    var theRequest = new Object();  
	    if (url.indexOf("?") != -1) {  
	        var str = url.substr(1);  
	        strs = str.split("&");  
	        for (var i = 0; i < strs.length; i = i + 1) {  
	            theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];  
	        }  
	    }  
	    return theRequest[parame];  
	},
	
	/**
	 * 以指定字符串开始
	 * @param str 字符串
	 * @param sub 首部字符串
	 * @returns {Boolean}
	 */
	strStartsWith: function(str, sub){
		return (str.indexOf(sub) == 0);  
	},
	
	/**
	 * 是否包含某字符串
	 * @param str
	 * @param sub
	 * @returns {Boolean}
	 */
	strContains: function(str, sub){
		return (str.indexOf(sub) != -1);  
	},
	
	/**
	 * 是否是数字型数据
	 * @param str
	 * @returns
	 */
	isNumber: function(str){
		if (/^\d+$/.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否是自然数型数据
	 * @param str
	 * @returns
	 */
	isInt: function(str){
		if (/^(\+|-)?\d+$/.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否为字母和数字（字符集）
	 * @param str
	 * @returns
	 */
	isLetters: function(str){
		if (/^[A-Za-z0-9]+$/.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否为英文字母（字符集）
	 * @param str
	 * @returns
	 */
	isLetter: function(str){
		if (/^[A-Za-z]+$/.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否为大写字母（字符集）
	 * @param str
	 * @returns
	 */
	isUpper: function(str){
		if (/^[A-Z]+$/.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否为小写字母（字符集）
	 * @param str
	 * @returns
	 */
	isLower: function(str){
		if (/^[a-z]+$/.test(str)){return str;}else{return false;};
	},
	
	/**
	 * 是否为正确的网址
	 * @param str
	 * @returns
	 */
	isUrl: function(str){
		var myReg = /^((http:[/][/])?\w+([.]\w+|[/]\w*)*)?$/;    
		if(myReg.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否为正确的Email形式
	 */
	isEmail: function(str){
		var myReg = /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;    
	    if(myReg.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 是否为正确的手机号码
	 */
	isMobile: function(str){
		var regu =/(^[1][3][0-9]{9}$)|(^0[1][3][0-9]{9}$)/;   
	    var re = new RegExp(regu);   
	    if (re.test(str)){return str;}else{return false;}
	},
	
	/**
	 * 字符串转json对象
	 * @param strJson json字符串
	 */
	evalJSON : function (strJson){
		 return eval( "(" + strJson + ")");
	},
	
	/**
	 * easyui messager消息窗口 在屏幕上方显示一条消息窗口
	 * @param title 消息标题
	 * @param msg   消息内容
	 */
	showMessager: function(title , msg) {
		$.messager.show({
			title:title,
			msg:msg,
			timeout:3000,
			showType:'slide',
			style:{
				right:'',
				top:document.body.scrollTop+document.documentElement.scrollTop,
				bottom:''
			}
		});
	},
	
	/**
	 * 将javascript数据类型转换为json字符串
	 * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
	 * @return 返回json字符串
	 */
	 toJSON : function (object){
	   var type = typeof object;
	   if ('object' == type){
		   if (Array == object.constructor)
			   type = 'array';
		   else if (RegExp == object.constructor)
			   type = 'regexp';
		   else
			   type = 'object';
	   	}
	    switch(type) {
	    	case 'undefined':
	    	case 'unknown':
	    		return;
	    		break;
	    	case 'function':
	    	case 'boolean':
	    	case 'regexp':
	    		return object.toString();
	    		break;
	    	case 'number':
	    		return isFinite(object) ? object.toString() : 'null';
	    		break;
	    	case 'string':
	    		return '"' + object.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,
	    				function(){  
	                 	var a = arguments[0];                   
	                 	return  (a == '\n') ? '\\n':  
	                       (a == '\r') ? '\\r':  
	                       (a == '\t') ? '\\t': "" 
	             			}) + '"';
	    		break;
	    	case 'object':
	    		if (object === null) return 'null';
	    		var results = [];
	    		for (var property in object) {
	    			var value = this.toJSON(object[property]);
	    			if (value !== undefined)
	    				results.push(this.toJSON(property) + ':' + value);
	    		}
	    		return '{' + results.join(',') + '}';
	    		break;
	    	case 'array':
	    		var results = [];
	    		for(var i = 0; i < object.length; i++) {
	    			var value = this.toJSON(object[i]);
	    			if (value !== undefined) results.push(value);
	    		}
	    		return '[' + results.join(',') + ']';
	    		break;
	      }
	  },
	  
	  /**
	   * 页面载入效果显示
	   * @param text 显示文本
	   */
	  loadding: function(text){
		  $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
		  $("<div class=\"datagrid-mask-msg\"></div>").html(text).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
	  },
	  
	  /**
	   * 页面载入效果 更换内容
	   * @param text 显示文本
	   */
	  loaddingReplace: function(text){
		  $(".datagrid-mask-msg").html(text);
	  },
	  
	  /**
	   * 关闭加载框
	   */
	  loaddingClose: function(){
		  $(".datagrid-mask").remove();
		  $(".datagrid-mask-msg").remove();
	  }
	
	
	
};  

/**
 * 去除两端空格
 */
String.prototype.trim = function() { 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};

/**
 * 去除左侧空格
 */
String.prototype.ltrim = function() { 
	return this.replace(/(^\s*)/g, ""); 
} 

/**
 * 去除右侧空格
 */
String.prototype.rtrim = function() { 
	return this.replace(/(\s*$)/g, ""); 
} 

/**
 * 数组扩展方法 最大值
 * @returns
 */
Array.prototype.max = function(){  
    var i, max = this[0];  
    for (i = 1; i < this.length; i++) {  
        if (max < this[i])   
            max = this[i];  
    }  
    return max;  
      
};

/**
 * 数组扩展方法 最小值
 * @returns
 */
Array.prototype.min = function(){  
    var i, min = this[0];  
    for (i = 1; i < this.length; i++) {  
        if (min > this[i])   
            min = this[i];  
    }  
    return min;  
      
};

/**
 * 添加元素
 */
Array.prototype.append = function(value){  
	this[this.length] = value; 
}; 

/**
 * 数组扩展方法 位置插入
 * @returns
 */
Array.prototype.insertAt = function(index, value){  
    var part1 = this.slice(0, index);  
    var part2 = this.slice(index);  
    part1.push(value);  
    return (part1.concat(part2));  
};  

/**
 * 数组扩展方法 位置移除
 * @returns
 */
Array.prototype.removeAt = function(index){  
    var part1 = this.slice(0, index);  
    var part2 = this.slice(index);  
    part1.pop();  
    return (part1.concat(part2));  
};  

/**
 * 数组值 所在位置
 */
Array.prototype.indexOf = function(val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) return i;  
    }  
    return -1;  
};  

/**
 * 删除指定值
 */
Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
};  

/**
 * 清空数组
 */
Array.prototype.clear = function(){ 
	 this.length=0;
}; 

/**
 * 初始化 easy ui dialog参数
 */
try {
	(function (config) {
		config['ok'] = '确定';
		config['cancel'] = '取消';
	})($.messager.defaults);
} catch (e) {
}