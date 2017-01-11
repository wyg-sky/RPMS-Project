<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>
<html>
<head>
</head>
<script language="JavaScript" type="text/javascript">
	Ext.onReady(function(){
	    Ext.QuickTips.init();
		Ext.lion.ScriptLoader('rpms/welcome/projectstatus/ProjectStatusGridPanel.js', false);
		var projectStatusManagementSuperTabPanel = new Ext.Panel({
			el : '_projectStatusManagement_SuperTabPanel_${uuid}',
	        id : '_projectStatusManagement_SuperTabPanel_Id',
	        border : true,
		    activeTab : 0,
		    frame : false,
		    enableTabScroll : false
		});
		var projectStatusGridPanel = new ProjectStatusGridPanel({
			superTabPanel : projectStatusManagementSuperTabPanel
		});
		projectStatusManagementSuperTabPanel.add(projectStatusGridPanel);
		projectStatusManagementSuperTabPanel.render();
		projectStatusGridPanel.doLayout();
	});
</script>
<body>
	<div id="_projectStatusManagement_SuperTabPanel_${uuid}"></div>
</body>
</html>