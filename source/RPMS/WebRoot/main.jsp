<%@ page language="java" pageEncoding="UTF-8"%>

<html>
<head>

<%@ include file="framework/init.jsp"%>
<%@ page import="com.lion.core.util.ResourceUtil" %>
<% String msgShow = ResourceUtil.getWebServiceProperty("com.cims.mate.msg.show"); %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>国家认定企业技术中心管理信息系统</title>
<script type="text/javascript" src="${ctx}/ext/ext-lang-${sessionScope.locale}.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/scripts/locale/fvsd-lang_${sessionScope.locale}.js" charset="utf-8"></script>
<script language="JavaScript" type="text/javascript" src="${ctx}/ext/extension/util/NumberUtil.js"></script>
<script type="text/javascript" >

//屏蔽通知
Ext.onReady(function(){ 
	if(FW.moduleCode=='015'){//只有材料系统可见
		if(<%=msgShow%>==true){
		var msgWin= new Ext.Window({
	        title : '通知',
	        modal :true,
	        width: 830,
	        height: 600,
	        modal:true,
		    resizable:false,
		    draggable:false,
		    buttonAlign : 'center',
	        closeAction : 'hide',
	        html : '<iframe src="msg.htm" width="100%" height="100%" scrolling="auto" frameborder="0"></iframe>',
	        	buttons : [{
					text : '关闭',
					handler : function(){
						msgWin.hide();
					}
				}]
	            }).show(); 
		}
	}else if(FW.moduleCode=='016'){
		
		var title = "";
		var content = "";
		var tdate = "";
		var noticePerson = "";
		var bln = false;
		
		Ext.Ajax.request({
			url : 'oams/getOamsNotice.html',
			method : 'post',
			async : false,
			params : {
				currentDate : FW.currentDate
			},
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				bln = json.bln;
				title = json.title;
				content = json.content;
				tdate = json.tdate;
				noticePerson = json.noticePerson;
			}
		});
		
		if(bln){
			var src = "oamsmsg.jsp?title="+title+"&content="+content+"&tdate="+tdate+"&noticePerson="+noticePerson;
			var msgWin= new Ext.Window({
		        title : '通知',
		        modal :true,
		        width: 830,
		        height: 600,
		        modal:true,
			    resizable:false,
			    draggable:false,
			    buttonAlign : 'center',
		        closeAction : 'hide',
		        html : '<iframe src="'+src+'" width="100%" height="100%" scrolling="auto" frameborder="0"></iframe>',
		        	buttons : [{
						text : '关闭',
						handler : function(){
							msgWin.hide();
						}
					}]
		     }).show(); 
		}
	}
});


</script>
</head>
<style type="text/css">
<!--
body {
	font-family: Arial, Helvetica, sans-serif, "宋体", "微软雅黑";
	font-size: 12px;
	color: #333;
	text-decoration: none;
	background: #d9e7ff url(images/head_back.png) repeat-x left top;
}

body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td,button{
	padding: 0;
	margin: 0;
}

fieldset,img,button {
	border: 0;
}

input,label,select,option,textarea,button,fieldset,legend {
	font: 12px/ 18px Verdana, Simsun, Helvetica, Arial, sans-serif;
}

ul {
	list-style: none;
}

a {
	color: #325e7f;
	text-decoration: none;
}

a:link,a:visited {
	text-decoration: none;
}

a:hover {
	text-decoration: none;
	color: #d00;
}
-->
<!--

/***右侧用户信息**/
.head_rset {
	position: absolute;
	z-index: 3;
	right: 10px;
	top: 4px;
	height: 25px;
	line-height: 25px;
	vertical-align: middle;
	text-align: right;
}

.head_rset .usadmin {
	padding: 2px 10px;
}

.head_rset a {
	margin-left: 6px;
	margin-right: 8px;
}

.head_rset a img {
	vertical-align: middle;
	margin-right: 4px;
}

#tool_bar {
	line-height: 20px;
	font-size: 12px;
}

-->
</style>
<body>
<div id="desktop-body" oncontextmenu="return false"><div id="desktop-body-login"></div></div>
<div class="head_rset">
<ul id="tool_bar">
	<span class="usadmin"><a>欢迎您，<%=user.getUserName()%></a><a href="javascript:FW.showOnlineUser()" isTop=true alt="显示在线用户" title="显示在线用户"> 在线人数：<%=OnLineUser.getOnLineCount()%></a></span>
	<!-- <a href="javascript:FW.showPortal();" isTop=true method="showPortal" alt="首页" title="首页">
		<img src="images/head/home.png" width="16" height="16" />首页</a> -->
	<a href="javascript:isRefresh =  true;window.location.reload();" isTop=true alt="刷新(F5)" title="刷新(F5)">
		<img src="images/head/refresh.gif" width="16" height="16" />刷新</a>
	<!-- <a href="javascript:FW.showUserInfo();" isTop=true method="showUserInfo" userId="<%=user.getId()%>" alt="个人信息(ctrl+2)" title="个人信息(ctrl+2)">
		<img src="images/head/userinfo.gif" width="16" height="16" />个人信息</a>-->
	<a href="javascript:FW.changePassword();" isTop=true method="changePassword" alt="修改密码(ctrl+3)" title="修改密码(ctrl+3)">
		<img src="images/head/password.gif" width="16" height="16"/>修改密码</a>
	<!-- <a href="javascript:FW.shortCutManager();" isTop=true method="changePassword" alt="快捷方式(ctrl+4)" title="快捷方式(ctrl+4)">
		<img src="images/head/shortcut.png" width="16" height="16"/>快捷方式</a>
	<a href="javascript:FW.showChatWin();" isTop=true method="changePassword" alt="即时通讯(ctrl+5)" title="即时通讯(ctrl+5)">
		<img src="images/head/chat.png" width="16" height="15"/>即时通讯</a>
	<a href="javascript:FW.systemThemeManager();" isTop=true method="changePassword" alt="系统风格(ctrl+6)" title="系统风格(ctrl+6)">
		<img src="images/head/systemstyle.png" width="16" height="15"/>系统风格</a>
	<a href="javascript:FW.fullWindow();" isTop=true method="fullWindow" alt="全屏(ctrl+7)" title="全屏(ctrl+7)">
		<img src="images/head/full.png" width="16" height="16"/>全屏</a>
	<a href="javascript:FW.lockWindow();" isTop=true method="lockWindow" alt="锁屏(ctrl+~)" title="锁屏(ctrl+~)">
		<img src="images/head/lock.gif" width="16" height="16"/>锁屏</a> -->
	<a href="javascript:FW.logOut();" isTop=true method="logout" alt="退出(ctrl+q)" title="退出(ctrl+q)">
		<img src="images/head/out.gif" width="16" height="16" />退出</a>
</ul>
</div>

</div>
<div id="shortMessageDiv"></div>
</body>
</html>