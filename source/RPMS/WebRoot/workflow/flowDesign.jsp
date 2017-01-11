<!-- 流程设计器 -->
<%@ page language="java" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
%>
<%@ include file="/common/taglibs.jsp"%>
<html xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <title>工作流定义</title>
	<link href="<c:url value='/ext/resources/css/ext-all.css'/>" rel="stylesheet" type="text/css" />
	
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-base.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-all.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-lang-zh_CN.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/extension/CheckColumn.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/extension/ComboBoxTree.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/extension/ComboWindow.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/extension/TreeCheckNodeUI.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/extension/Ext.ux.tree.TreeLoader.js'/>"></script>
	<link href="<c:url value='/workflow/flowdesign/images/dom/dom.css'/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value='/styles/style-default.css'/>" rel="stylesheet" type="text/css" />
	<script charset="UTF-8" src="flowdesign/js/FlowWorkSpace.js" language="javascript"></script>
	<script language="JavaScript" type="text/javascript" src="scripts/design/flowDesignInit.js"></script>
	<script language="JavaScript" type="text/javascript" src="scripts/design/flowDesign.js"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/bp/scripts/BpWorkbenchPanel.js'/>"></script>
	<script language="JavaScript" event="onload" for="window"> 
	Ext.BLANK_IMAGE_URL = "<c:url value='/ext/resources/images/default/s.gif'/>";
	//屏蔽IE右键功能 
		function Click(){ window.event.returnValue=false; } 
		document.oncontextmenu=Click; 
		//onselectstart="return false;"
	</script> 
  </head>
  <body style="margin: 0px;overflow: hidden;">

  </body>
</html>
