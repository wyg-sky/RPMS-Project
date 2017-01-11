<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="framework/init.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<base href="<%=basePath%>">
<title>数字化矿上业务平台</title>

    <script type="text/javascript" src="${ctx}/scripts/pushlet/ajax-pushlet-client.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/framework/desktop/css/desktop.css" />
    <script type="text/javascript" src="${ctx}/framework/desktop/scripts/StartMenu.js"></script>
    <script type="text/javascript" src="${ctx}/framework/desktop/scripts/TaskBar.js"></script>
    <script type="text/javascript" src="${ctx}/framework/desktop/scripts/Desktop.js"></script>
    <script type="text/javascript" src="${ctx}/framework/desktop/scripts/App.js"></script>
    <script type="text/javascript" src="${ctx}/framework/desktop/scripts/Module.js"></script>
	<script type="text/javascript" src="${ctx}/framework/desktop/scripts/MenuTree.js" ></script>
	<script type="text/javascript" src="${ctx}/framework/desktop/scripts/ActionClock.js" ></script>
	<script type="text/javascript" src="${ctx}/framework/desktop/scripts/Clock.js" ></script>
    <script type="text/javascript" src="${ctx}/framework/desktop/scripts/StartDesktop.js"></script>
</head>
<body scroll="no" onload="init()">
<div id="desktop-body" oncontextmenu="return false">
	<div id="desktop-body-login"></div>
</div>
<div id="x-desktop" onmousemove="showRightMenu(event)">
	<!--<a href="#" style="margin-right:180px;margin-top:10px; float:right;"><img src="${ctx}/framework/desktop/images/title.png"  onmouseover="showMenu()"/></a>-->
	<div id="menu-right" style="right: -180px;">
		<div id="menu-tree-bg">
			<div id="menu-tree">
			</div>
		</div>
	</div>
    <dl id="x-shortcuts">
	    <script type="text/javascript">
	    if(shortcuts) {
	        for(var i = 0; i<shortcuts.length; i++) {
		    	document.write("<dt id='" + shortcuts[i].id + "' moduleId='" + shortcuts[i].id + "' moduleName='" + shortcuts[i].text + "' moduleUrl='" + shortcuts[i].url + "' moduleImgUrl='" + shortcuts[i].icon + "' ><a href='#'><img src='" + shortcuts[i].icon + "' style='width:48px;height:48px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + shortcuts[i].icon + "', sizingMethod='scale');'/><div>");
		    	document.write(shortcuts[i].text);
		    	document.write("</div></a>");
	        }
	    }
	    </script>
    </dl>
</div>

<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
</div>
<div id="shortMessageDiv"></div>
</body>
</html>
