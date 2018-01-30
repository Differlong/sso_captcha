/**
 * 用户统计和用户管理操作相关处理
 */
var yhtj = {
		
	/**
	 * 添加用户页面
	 * @param dialog_id 弹出对话框ID
	 */
	adduserDialog: function(){
		$('#dlg_qb').dialog('open'); 
	},
	
	/**
	 * 更新用户页面
	 * @param dialog_id 弹出对话框ID
	 */
	updateuserDialog: function(id,username,nickname,phone,email,status,password){
		$("#id_update").val(id);
		$("#username_update").val(username);
		$("#nickname_update").val(nickname);
		$("#phone_update").val(phone);
		$("#email_update").val(email);
		
		if(status){
			$("input[name='status'][value=1]").attr("checked",true);
		}else{
			$("input[name='status'][value=0]").attr("checked",true);
		}
		$('#dlg_update').dialog('open'); 
	},
	
	/**
	 * 添加用户
	 */
	adduser: function(){
		var U3Url = $("#U3Url").val();
		var username = $("#username1").val();
		var password = $("#password").val();
		$.ajax({
            type: "POST",
            url:  U3Url+"/1.0/user/adduser",
            data: {
            	username:username,
            	password:password
            },
            dataType: "json",
            success: function(data){
            	if(data.code == 0){
            		 $.messager.alert('成功','添加用户成功！','info',function(){
         		    	window.location.reload();
//         		    	$.get(U3Url+"/1.0/user/query?username="+username);
         		    	$("#username").val(username);
         		    	$("#nickname").val("");
         				$("#phone").val("");
         				$("#email").val("");
         		    	$('#book_index_form').submit();
         		    });
            	}else{
        		    $.messager.alert('',data.error);
            	}
            }
        }); 
	},
	
	
	/**
	 * 更新用户信息
	 */
	updateuser: function(){
		$.messager.confirm('确认','您确定更新用户的基本信息吗？',function(r){ 
		    if (r){
				var U3Url = $("#U3Url").val();
				var id = $("#id_update").val();
				var username = $("#username_update").val();
				var nickname = $("#nickname_update").val();
				var phone = $("#phone_update").val();
				var email = $("#email_update").val();
				var status = $("input[name='status'][checked]").val();
				$.ajax({
		            type: "POST",
		            url:  U3Url+"/1.0/user/updateuser",
		            data: {
		            	      id : id,
		            	username : username,
		            	nickname : nickname,
		            	   phone : phone,
		            	   email : email,
		            	  status : status
		            },
		            dataType: "json",
		            success: function(data){
		            	if(data.code == 0){
		            		 $.messager.alert('成功','更新用户成功！','info',function(){
		         		    	window.location.reload();
		         		    	$("#username").val(username);
		         		    	$("#nickname").val("");
		         				$("#phone").val("");
		         				$("#email").val("");
		         		    	$('#book_index_form').submit();
		         		    });
		            	}else{
		        		    $.messager.alert('',data.error);
		            	}
		            }
		        }); 
		    }
		});    
	},
	
  	/**
  	 * 记录查询条件重置
  	 */
	reset: function(){
		$("#username").val("");
		$("#nickname").val("");
		$("#phone").val("");
		$("#email").val("");
	},
	/**
  	 * 还原密码
  	 */
	oldpasswd : function(id,username){
		$.messager.confirm('确认','您确定要给用户'+username+'还原密码吗？',function(r){ 
			if (r){	
				var U3Url = $("#U3Url").val();
				$.ajax({
		            type: "POST",
		            url:  U3Url+"/1.0/user/oldpasswd",
		            data: {
		            	id: id
		            },
		            dataType: "json",
		            success: function(data){
		            	if(data.code == 0){
		            		 $.messager.alert('成功','还原密码成功！','info',function(){
		         		    	window.location.reload();
		         		    });
		            	}else{
		        		    $.messager.alert('',data.error);
		            	}
		            }
		        });
			}
		});    
	},
    /**
	 * 解除短信验证码限制
	 */
    clear_sms_limit : function (phone, user) {
        $.messager.confirm('确认','您确定要给用户'+user+'解除短信验证码限制吗？',function(r){
            if (r){
                var U3Url = $("#U3Url").val();
                $.ajax({
                    type: "POST",
                    url:  U3Url+"/1.0/user/clear_phone_limit",
                    data: {
                        phone: phone
                    },
                    dataType: "json",
                    success: function(data){
                        if(data.code == 0){
                            $.messager.alert('成功','解除短信验证码限制！','info',function(){
                                window.location.reload();
                            });
                        }else{
                            $.messager.alert('',data.error);
                        }
                    }
                });
            }
        });
    },
	/**
  	 * 重置密码
  	 */
	resetpasswd : function(id,username){
		$.messager.confirm('确认','您确定要给用户'+username+'重置密码为1234qwer吗？',function(r){ 
			if (r){	
				var U3Url = $("#U3Url").val();
				$.ajax({
		            type: "POST",
		            url:  U3Url+"/1.0/user/resetpasswd",
		            data: {
		            	id: id
		            },
		            dataType: "json",
		            success: function(data){
		            	if(data.code == 0){
		            		 $.messager.alert('成功','重置密码成功！','info',function(){
		         		    	window.location.reload();
		         		    });
		            	}else{
		        		    $.messager.alert('',data.error);
		            	}
		            }
		        });
			}
		});    
	},
	/**
  	 * 激活用户
  	 */
	active : function(id,username){
		$.messager.confirm('确认','您确定要激活用户 '+username+' 吗？',function(r){ 
		    if (r){
		    	 var U3Url = $("#U3Url").val();
					$.ajax({
			            type: "POST",
			            url: U3Url + "/1.0/user/active",
			            dataType: "json",
			            data: {
			            	id: id
			            },
			            success: function(data){
			            	if(data.code == 0){
			            		 $.messager.alert('成功','激活成功！','info',function(){
			         		    	window.location.reload();
			         		    });
			            	}else{
			        		    $.messager.alert('',data.error);
			            	}
			            }
			        });
		    }
		});    
	   
	},
	statusclick : function(obj){
			   var status = $(obj).val();
			   if(status == 1 ){
					$("input[name='status'][value=1]").attr("checked",true);
					$("input[name='status'][value=0]").attr("checked",false);
				}else{
					$("input[name='status'][value=0]").attr("checked",true);
					$("input[name='status'][value=1]").attr("checked",false);
				}
	}
}