<%@ include file="common/taglibs.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title><fmt:message key="webapp.name"/></title>
    <meta name="heading" content="<fmt:message key='login.heading'/>"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<script type="text/javascript" src="${ctx}/framework/common/Global.js"></script>
	<script type="text/javascript" src="${ctx}/framework/common/Login.js"></script>
	<script type="text/javascript" src="${ctx}/scripts/jquery/jquery-1.7.2.js"></script>
	<link rel="shortcut icon" href="${ctx}/images/favicon.ico" type="image/x-icon" />
	<link href="${ctx}/styles/default/login_style.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript">
		function getAttributeValue(o, key) {
			if (!o.attributes)
				return null;
			var attr = o.attributes;
			for ( var i = 0; i < attr.length; i++) {
				if (key.toLowerCase() == attr[i].name.toLowerCase())
					return attr[i].value;
			}
			return null;
		}
		
		function focusInputEle(o) {
			if (o.value == getAttributeValue(o, 'defaultVal')) {
				o.value = '';
				o.style.color = "#002e55";
			}
		}
		
		function blurInputEle(o) {
			if (o.value == '') {
				o.value = getAttributeValue(o, 'defaultVal');
				o.style.color = "#002e55";
			}
		}
		
		$(function() {
			$(window).keypress(function(key){
				if(13 == key.keyCode || '13' == key.keyCode){
					loginClick();
				}
				
			});
		});
	</script>
</head>

<body>
	<div class="bg">
		<div class="logo_cl"></div>
		<div class="login">
		<form method="post" name="loginForm" action="${ctx}/login.html">
			<div class="put">
				<div class="name">
					<input name="user.loginName" type="text" id="user.loginName" onfocus="focusInputEle(this)"
						onblur="blurInputEle(this)" defaultval="请输入用户名" value="admin" size="30" style="color: #002e55"/>
				</div>
				<div class="poswer"><input name="user.password" type="password" onfocus="focusInputEle(this)"
					onblur="blurInputEle(this)" defaultval="密码" value="admin123" size="30" style="color: #002e55"/>
				</div>
			</div>
			
			<div class="but"><a href="javascript:loginClick()"><span class="loginbut"></span></a></div>
			
			<div class=" ico"><a href="#" class="rename" title="记住用户名"><span></span></a> 
				<a href="#" class="repas" title="记住密码"><span></span></a> 
				<a href="#" class="quest" title="忘记密码"><span></span></a>
			</div>
			<input type="hidden" name="info.moduleCode" id="info.moduleCode" value="015"/>
			<input type="hidden" name="info.moduleJs" id="info.moduleJs" value="system"/>
			<input type="hidden" name="info.loginMode" id="info.loginMode" value="2"/>
			<input type="hidden" name="info.runMode" id="info.runMode" value="2"/>
		</form>
		</div>
		
		<div class="copy_cl"><font>新矿信息技术有限公司</font></div>
	</div>
</body>
</html>
