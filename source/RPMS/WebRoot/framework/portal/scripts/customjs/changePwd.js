$(function(){
	//单点设置
	$("#singleSettingSubmit").click(function( event ) {
		//序列化表格
		var queryString = $('#singleSettingForm').formSerialize(); 
		 
		//提交表单
		$.post('singleSetting.html', queryString,function(){
			$("#singleSettingDialog").modal("hide");
		}); 
	});
	
	/**
	 *密码修改的click事件
	 */
	$('#changePwdSubmit').click(function() {
		var oldpwd = $("#oldpwd").val();
		var newpwd = $("#newpwd").val();
		var newpwdconfirm = $("#newpwdconfirm").val();
		
		if(oldpwd == null || oldpwd.length<1){
			$("#errormsg").html("旧密码不允许为空.");
			return;
		}
		
		if(newpwd == null || newpwd.length<1){
			$("#errormsg").html("新密码不允许为空.");
			return;
		}
		
		if(newpwdconfirm == null || newpwdconfirm.length<1){
			$("#errormsg").html("确认密码不允许为空.");
			return;
		}
		//若两次输入的密码不同,则弹出提示
		if(newpwd != newpwdconfirm){
			$("#errormsg").html("两次输入的新密码不同,请重新输入.");
			return;
		}
		
		//提交修改
		$.post('changePassword.html',{oldPW:oldpwd,newPW:newpwd},function(){
			$("#oldpwd").val('');
			$("#newpwd").val('');
			$("#newpwdconfirm").val('');
			$('#changePwd_window').modal('hide');
		});
	
	});

	$( "#oldpwd" ).blur(function() {
		var oldpwd = $("#oldpwd").val();
		console.info(oldpwd);
		
		if(oldpwd == null || oldpwd.length<1){
			$("#errormsg").html("旧密码不允许为空.");
		}
	});
	
	$( "#newpwd" ).blur(function() {
		var newpwd = $("#newpwd").val();
		
		if(newpwd == null || newpwd.length<1){
			$("#errormsg").html("新密码不允许为空.");
			return;
		}
	});
	
	$( "#newpwdconfirm" ).blur(function() {
		var newpwd = $("#newpwd").val();
		var newpwdconfirm = $("#newpwdconfirm").val();
		
		if(newpwdconfirm == null || newpwdconfirm.length<1){
			$("#errormsg").html("确认密码不允许为空.");
		}
		//若两次输入的密码不同,则弹出提示
		if(newpwd != newpwdconfirm){
			$("#errormsg").html("两次输入的新密码不同,请重新输入.");
		}
	});
	
	
});