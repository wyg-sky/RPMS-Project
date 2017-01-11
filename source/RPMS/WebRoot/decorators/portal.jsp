<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="com.lion.system.Constants" %>
<%@ page import="com.lion.system.user.model.User" %>
<%
User user = (User)session.getAttribute(Constants.USER_AUTH);

%>
<head>
<!-- HTTP 1.1 -->
<meta http-equiv="Cache-Control" content="no-store" />
<!-- HTTP 1.0 -->
<meta http-equiv="Pragma" content="no-cache" />
<!-- Prevents caching at the Proxy Server -->
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="generator" content="ForceView Service Desk 3.0" />
<!-- leave this for stats please -->
<meta name="heading" content="<fmt:message key='webapp.tagline'/>" />
<link rel="icon" href="${ctx}/framework/portal/css/images/favicon.ico" />
<!-- bootstrap 样式表,由于该文件对所有html标签进行了全局样式定义,请务必保证此文件首先引入 -->
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/bootstrap.min.css">
<!-- 谷歌样式包 -->
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/todc-bootstrap.css">
<!-- 拖拽样式表 -->
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/drag.css">
<!-- 自定义样式表 -->
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/style.css">
<!-- 自定义表格样式 -->
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/table.css">
<!-- 公共组件 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/common.js"></script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/selectInput.js"></script>
<!-- jquery基础包,必须在bootstrap之前引入 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/jquery-1.9.1.js"></script>
<!-- bootstrap javascript支持包 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/bootstrap.min.js"></script>
<!-- my97 datepicker日期控件 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/calendar/WdatePicker.js"></script>
<!-- ajax表单 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/jquery.form.js"></script>
<!-- 修改密码调用的js -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/customjs/changePwd.js"></script>

<script type="text/javascript">
	$(function(){
		$("#settingSbmitBtn").click(function(){
			scale = $("#custom").val();
			scale = scale.replace(/\:/g,"v");
			changeScale(scale);
		});
	});
	function openSystem(url) {
		window.opener=null;	
		window.open(url, "amin","fullscreen=0,width="+(screen.availWidth-8)+",height="+(screen.availHeight-34)+",toolbar =0, menubar=0, scrollbars=1, resizeable=0, location=0, status=0");
		window.open('','_self');	
		setTimeout(function(){window.close();}, 500);
	}
</script>

<title><decorator:title /></title>
<decorator:head />
</head>
<body class="bodybg">
	<decorator:getProperty property="body.id" writeEntireProperty="true"/>
	<decorator:getProperty property="body.class" writeEntireProperty="true"/>
	
	<div id="bannner">
		<!-- 布局设置 -->
		<div id="setting" style="background: #f1f1f1;height: 140px;position: absoulte;z-index: 999;display: none;">
			<table id="setting_table" >
			 	<tr>
					<td colspan="5" style="font-weight: bold;height: 30px;color: #565656;">请选择主页布局</td>
				</tr>
				<tr>
					<!-- 1:3 -->
					<td>
						<a href="#" onclick="changeScale('1v3')">
							<img src="${ctx}/framework/portal/css/images/setting/1.gif">
						</a>
					</td>
					<!-- 1:2:2 -->
					
					<!-- 1:1:1 -->
					<td>
						<a href="#" onclick="changeScale('1v1v1')">
							<img src="${ctx}/framework/portal/css/images/setting/111.gif">
						</a>
					</td>
					<!-- 3:2 -->
					<td>
						<a href="#" onclick="changeScale('3v2')">
							<img src="${ctx}/framework/portal/css/images/setting/8.gif">
						</a>
					</td>
					<!-- 2:2 -->
					<td>
						<a href="#" onclick="changeScale('2v2')">
							<img src="${ctx}/framework/portal/css/images/setting/9.gif">
						</a>
					</td>
					<!-- custom -->
					<td style="width: 480px"></td>
				</tr>
			</table>
		</div>
		<!-- logo和功能区 -->
		<div  id="banner_top">
			<table cellspacing=0 cellpadding=0 border=0 id="banner_table" >
				<tr>
					<td class="user_left"></td>
					<td class="banner_table_td">
						<a href="${ctx}/system/portal.html">首页</a>
					</td>
					<td class="sx">|</td>
					<td class="banner_table_td" > 
						<a id="contentDefine" href="#">更改布局</a>
					</td>
					<td class="sx">|</td>
					<td class="banner_table_td">
						<a id="changePassword" href="#changePwd_window" data-toggle="modal">密码修改</a>
					</td>
					<td class="sx">|</td>
					<td class="banner_table_td">
						<a id="singleSetting" href="#singleSettingDialog" data-toggle="modal">单点设置</a>
					</td>
					<td class="sx">|</td>
					<td class="banner_table_td">
						<a href="${ctx}/framework/out.html">退出登录</a>
					</td>
					<td class="user_right"></td>
				</tr>
			</table>
			<!-- 欢迎信息 -->
			<div id="welcome">
				欢迎您：<%=user.getUserName()%>　 当前是：${sys_date}
			</div>
		</div>

		<!-- 菜单 -->
		<table id="menu" >
			<tr>
			<td>
			<ul class="menu_ul">
				<c:forEach items="${menu}"  var="menu"  varStatus="status">
					<li>
						<a href=javascript:openSystem("${menu[1]}")>${menu[0]}</a>
					</li>
					<c:if test="${status.last != true}">
					<li class="sx">|</li>
					</c:if>
				</c:forEach>
			</ul>
			</td>
			</tr>
		</table>
	
		<!-- 修改密码 -->
		<div id="changePwd_window" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-header">
		    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		    <h3 id="myModalLabel" style="color: #666666">密码修改</h3>
		  </div>
		  <div class="modal-body">
		    <table class="changepwd">
				<tbody>
				<tr>
					<td align="right"><label>旧密码：</label></td>
					<td align="center">
						<input type="password" id="oldpwd"/>
						<font color="red">*</font> 
					</td>
				</tr>
				<tr>
					<td align="right"><label>新密码：</label></td>
					<td align="center">
						<input type="password" id="newpwd"/> 
						<font color="red">*</font>	
					</td>
				</tr>
				<tr>
					<td align="right"><label>新密码确认：</label></td>
					<td align="center">
						<input type="password" id="newpwdconfirm"/> 
						<font color="red">*</font>	
					</td>
				</tr>
				<tr>
					<td colspan="2" style="height: 10px;">
						<label id="errormsg" style="color: red;text-align: center;"/>
					</td>
				</tr>
				</tbody>
			</table>
		  </div>
		  <div class="modal-footer">
		    <button id="changePwdClose" class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		    <button id="changePwdSubmit" class="btn btn-primary">确定</button>
		  </div>
		</div>
				
		
		<!-- 单点设置 -->
		<div id="singleSettingDialog" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-header">
		    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		    <h3 id="myModalLabel" style="color: #666666">单点设置</h3>
		  </div>
		  <div class="modal-body">
		   <form method="post" action="singleSetting.html" id="singleSettingForm">
			<table id="singleSetting" class="changepwd" border="0" cellspacing="0" cellpadding="0" >
				<thead>
					<tr>
						<td height="28">系统名称</td>
						<td>用户名</td>
						<td>密码</td>
					</tr>
				</thead>
				<tbody>
				<tr><td height="6"></td></tr>
				<c:forEach items="${menu}" var="menu" varStatus="status">
					<c:choose>
						<c:when test="${status.index % 2 == 0}">
							<tr class="tr_odd">
						</c:when>
						<c:otherwise>
							<tr class="tr_even">
						</c:otherwise>
					</c:choose>
						<td>
							${menu[0]}
							<input type="hidden" value="${menu[6]}" name="system_id"/>
						</td>
						<td>
							<input type="text" value="${menu[4]}" name="singleUsername"/>
						</td>
						<td>
							<input type="password" value="${menu[5]}" name="singlePassword"/>
						</td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
			</form>
		  </div>
		  <div class="modal-footer">
		    <button id="singleSettingClose" class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		    <button id="singleSettingSubmit" class="btn btn-primary">确定</button>
		  </div>
		</div>
	</div>	
	<!-- 页面 -->
	<decorator:body />
	<center>
	<!-- 页脚 -->
	<div id="footer" align=center >
		山东能源新矿集团版权所有&copy;2013
	</div>
	</center>
</body>
</html>
