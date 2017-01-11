<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="com.lion.system.Constants,com.lion.system.user.model.User,com.lion.system.framework.model.LoginInfo" %>
<%
	User user = (User) session.getAttribute(Constants.USER_AUTH);
	LoginInfo loginInfo = (LoginInfo) session.getAttribute(Constants.LOGININFO);
	String layout = (String) request.getParameter("layout");
	String layoutText = "布局定义";
	if("1".equals(layout)) {
		layoutText = "完成";
	}
	String runMode = "1";
	if (loginInfo != null) {
		runMode = loginInfo.getRunMode();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@ include file="/common/meta.jsp"%>
<title>国家企业技术中心信息管理平台</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/drag.css">
<!-- bootstrap javascript支持包 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/bootstrap.min.js"></script>
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
<!-- 返回顶部图片样式 -->
<link id="scrollUpTheme" rel="stylesheet" href="${ctx}/framework/portal/css/themes/image.css">
<!-- 公共组件 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/common.js"></script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/selectInput.js"></script>
<!-- jquery基础包,必须在bootstrap之前引入 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/jquery-1.9.1.js"></script>
<!-- bootstrap javascript支持包 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/google_drag.js"></script>
<!-- my97 datepicker日期控件 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/calendar/WdatePicker.js"></script>
<!-- ajax表单 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/jquery.form.js"></script>
<!-- 修改密码调用的js -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/customjs/changePwd.js"></script>
<!-- 回到顶部调用的js -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/jquery.scrollUp.min.js"></script>
<style type="text/css">
	#nav_keleyi_com{position:relative;top:0;z-index:99999}
</style>
<script>
	/* scrollUp Minimum setup */
	/*  $(function () {
		$.scrollUp();
	}); */
	/* scrollUp full options*/
	 $(function () {
	    $.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        topDistance: '100', // Distance from top before showing element (px)
	        topSpeed: 300, // Speed back to top (ms)
	        animation: 'fade', // Fade, slide, none
	        animationInSpeed: 200, // Animation in speed (ms)
	        animationOutSpeed: 200, // Animation out speed (ms)
	        scrollText: '', // Text for element
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	    });
	}); 
</script>
<script type="text/javascript">
function menuFixed(id) {
    var obj = document.getElementById(id);
    var _getHeight = obj.offsetTop;

    window.onscroll = function () {
        changePos(id, _getHeight);
    }
}
function changePos(id, height) {
    var obj = document.getElementById(id);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < height) {
        obj.style.position = 'relative';
    } else {
        obj.style.position = 'fixed';
    }
}
</script>
<script type="text/javascript">
    window.onload = function () {
        menuFixed('nav_kel'+'eyi_com');
    }
</script>

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
<script type="text/javascript">
	var layout = '<%=layout%>';
	//更改布局方式重新加载页面
	function changeScale(scale) {
		$('#modules').load('changeScale.html', {
			scale : scale
		}, function() {
			_table = document.getElementById("t_1");
			_IG_initDrag(_table);
			$("#setting").slideToggle("slow");
		});
	}
	
	$(function() {
		//加载数据
		$('#modules').load('getHtml.html?layout=<%=layout%>', function() {
			if(layout == '1') {
				_table = document.getElementById("t_1");
				_IG_initDrag(_table);
			}
		});

		//滑动更改布局
		$("#contentDefine").click(function() {
			if(layout != '1') {
				window.location.href ="${ctx}/framework/portal.html?layout=1";
			} else {
				window.location.href ="${ctx}/framework/portal.html?layout=0";
			}
		});
	});
	
	function expandColumn(div) {
		$(div.parentNode.lastChild).toggle(300);
	}
	function expandAllColumn() {
		$(".mc").toggle(300);
	}
</script>
</head>
<body style="background:url(../framework/portal/images/beijing.jpg) repeat-x;">
	<div id="bannner">
		<!-- logo和功能区 -->
		<div class="top">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1004px" height="187px">
				<param name="movie" value="${ctx}/framework/portal/images/portaltop.swf"/>
				<param name="quality" value="high"/>
				<param name="wmode" value="transparent" />
				<embed src="${ctx}/framework/portal/images/portaltop.swf" mce_src="${ctx}/framework/portal/images/portaltop.swf"
					wmode="transparent" menu="false" quality="high"
					allowscriptaccess="sameDomain" width="1004px" height="187px"
					type="application/x-shockwave-flash"
					pluginspage="http://www.macromedia.com/go/getflashplayer" />
			</object>
			<div id="banner_top">
				<table cellspacing=0 cellpadding=0 border=0 id="banner_table" >
					<tr>
						<td class="banner_table_td">
							<img src="${ctx}/framework/portal/images/home.png" width="15px" height="15px" />
						</td>
						<td class="banner_table_td">
							<a href="${ctx}/framework/portal.html">首页</a>
						</td>
						<td class="banner_table_td">
							<img src="${ctx}/framework/portal/images/content.gif" width="15px" height="15px" />
						</td>
						<td class="banner_table_td" > 
							<a id="contentDefine" href="#"><%=layoutText %></a>
						</td>
						<td class="banner_table_td">
							<img src="${ctx}/framework/portal/images/password.png" width="15px" height="15px" />
						</td>
						<td class="banner_table_td">
							<a id="changePassword" href="#changePwd_window" data-toggle="modal">密码修改</a>
						</td>
						<td class="banner_table_td">
							<img src="${ctx}/framework/portal/images/singlelink.gif" width="15px" height="15px" />
						</td>
						<td class="banner_table_td">
							<a id="singleSetting" href="#singleSettingDialog" data-toggle="modal">单点设置</a>
						</td>
						<td class="banner_table_td">
							<img src="${ctx}/framework/portal/images/quit.png" width="15px" height="15px" />
						</td>
						<td class="banner_table_td">
							<a href="${ctx}/framework/out.html">退出</a>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 菜单 -->
		<div id="nav_keleyi_com" class="nav" ondblclick="expandAllColumn()">
			<div class="le"></div>
			<div class="ri"></div>
			<div class="dao">
			<div class="navwen">
			<ul class="hang">
				<c:forEach items="${menu}" var="menu" varStatus="status">
					<li class="bag"><a href=javascript:openSystem("${menu[1]}")>${menu[0]}</a>
					</li>
					<c:if test="${status.last != true}">
						<li class="line"></li>
					</c:if>
				</c:forEach>
			</ul>
			</div>
			<div class="date">
				<div class="zb"></div>
				<div class="shij"><span>欢迎您：<font color="red"><%=user.getUserName()%></font>&nbsp;${sys_date}</span></div>
				<div class="rb"></div>
			</div>
			</div>
		</div>
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
	<!-- 主内容区 -->
	<div id="modules" style="padding-top: 3px;"></div>
	<%@ include file="bottom.jsp"%>
</body>
</html>
