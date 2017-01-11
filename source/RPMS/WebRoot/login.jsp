<%@ include file="common/taglibs.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>login</title>
<link href="${ctx}/styles/default/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/framework/common/Global.js"></script>
<script type="text/javascript" src="${ctx}/framework/common/Login.js"></script>
<script type="text/javascript" src="${ctx}/scripts/jquery/jquery-1.7.2.js"></script>
</head>
<script type="text/javascript">
	
	function moduleClick(sys_num){
		document.getElementById("info.moduleCode").value=sys_num;
		if("002"==sys_num){//科研项目
			//document.getElementById("sysbase_text").style.color="#585858";
			//document.getElementById("rpms_text").style.color="#085dad";
			//document.getElementById("sysbase").src="${ctx}/images/login/3.png";
			//document.getElementById("rpms").src="${ctx}/images/login/1-1.png";
			
		}else if("001"==sys_num){//系统管理
			document.getElementById("sysbase_text").style.color="#FF0000";
			//document.getElementById("rpms_text").style.color="#585858";
			//document.getElementById("rpms").src="${ctx}/images/login/1.png";
			//document.getElementById("sysbase").src="${ctx}/images/login/3-1.png";
		}
	}
	function changeImg(){
		if(document.getElementById("user.loginName").value!=""){
			document.getElementById("user.loginName").className="input-bg";
		}else if(document.getElementById("user.loginName").value==""){
			document.getElementById("user.loginName").className="name";
		}
		if(document.getElementById("user.password").value!=""){
			document.getElementById("user.password").className="input-bg";
		}else if(document.getElementById("user.password").value==""){
			document.getElementById("user.password").className="password";
		}
	}
	function changeNameClass(){
		document.getElementById("user.loginName").className="input-bg";
	}
	function changePassClass(){
		document.getElementById("user.password").className="input-bg";
	}
	$(function() {
		$(window).keypress(function(key){
			if(13 == key.keyCode || '13' == key.keyCode){
				login();
			}
			
		});
	});
	function saveName(){
		document.getElementById("remName").className="jname1";
		document.getElementById("remName").style.color="#FF0000";
		saveUsername(this);
	}
	function savePass(){
		document.getElementById("remPass").className="jmima1";
		document.getElementById("remPass").style.color="#FF0000";
		savePassword(this);
	}
	function deletePassword(){
		deleteCookie("cmesPassword");
		document.getElementById("remPass").style.color="#000000";
	}
	function initPage(){
		if(getCookie("cmesUsername")!="" && getCookie("cmesUsername")!=null){
			document.getElementById("user.loginName").value=getCookie("cmesUsername");
			document.getElementById("remName").className="jname1";
			document.getElementById("user.loginName").className="input-bg";
		}
		if(getCookie("cmesPassword")!="" && getCookie("cmesPassword")!=null){
			document.getElementById("user.password").value=getCookie("cmesPassword");
			document.getElementById("remPass").className="jmima1";
			document.getElementById("user.password").className="input-bg";			
		}
		
		moduleClick('002');
		/* if(getCookie("sysNum")!="" && getCookie("sysNum")!=null){
			moduleClick(getCookie("sysNum"));
		} else {
			moduleClick('002');
		} */
	}
	function saveSysNum() {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("sysNum",document.getElementById("info.moduleCode").value,expires,"<c:url value="/"/>");
	}
	function login(){
		//saveSysNum();
		/*
		if(document.getElementById("remName").className=="jname1"){
			saveUsername(this);
		}
		if(document.getElementById("remPass").className=="jmima1"){
			savePassword(this);
		}*/
		loginClick();
	}
	document.body.onload=initPage;
</script>

<body>
<div class="bg">
	<div style="float:left;margin-top:100px;margin-left:50px;color:red">
  		 办公电话：0538-7823265,0538-7823264
  		QQ群：428990988
  	</div>
  <div class="login">
    <div class="logo"></div>
    <form method="post" name="loginForm" action="${ctx}/login.html">
    <ul class="inpp">
      <li class="yhm"><input name="user.loginName" type="text" id="user.loginName"/></li>
      <li class="mm"><input name="user.password" type="password" id="user.password"/></li>
    </ul>
    <ul class="xuanz">
      <li ><span class="jzyhm"></span><font><a href="javascript:saveName()" id="remName">记住用户名</a></font></li>
      <li ><span class="jzmm"></span><font><a href="javascript:savePass()" id="remPass">记住密码</a></font></li>
      <li class="wmima"><span class="wjmm"></span><font><a href="javascript:deletePassword()">忘记密码</a></font></li>
    </ul>
    <div class="xtgl"><a href="javascript:moduleClick('001')" id="sysbase_text" >系统管理</a></div>
    <div class="but"><input name="button" type="button" onclick="login()"/></div>
     <input type="hidden" name="info.moduleCode" id="info.moduleCode" value="001"/>
	<input type="hidden" name="info.moduleJs" id="info.moduleJs" value="system"/>
	<input type="hidden" name="info.loginMode" id="info.loginMode" value="2"/>
	<input type="hidden" name="info.runMode" id="info.runMode" value="2"/>
    </form>
  </div>
</div>
 <script type="text/javascript">
	var loginMsg = '${message}';
	if(loginMsg != ''){
		alert(loginMsg);
	}
</script>
</body>
</html>
