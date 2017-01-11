<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>
<html>
<head>
</head>
<script language="JavaScript" type="text/javascript">
	Ext.onReady(function(){
	    Ext.QuickTips.init();
		Ext.lion.ScriptLoader('rpms/welcome/projectnotice/ProjectFileGridPanel.js', false);
		var projectFileManagementSuperTabPanel = new Ext.Panel({
			el : '_projectFileManagement_SuperTabPanel_${uuid}',
	        id : '_projectFileManagement_SuperTabPanel_Id',
	        border : true,
		    activeTab : 0,
		    frame : false,
		    enableTabScroll : false
		});
		var projectFileGridPanel = new ProjectFileGridPanel({
			superTabPanel : projectFileManagementSuperTabPanel
		});
		projectFileManagementSuperTabPanel.add(projectFileGridPanel);
		projectFileManagementSuperTabPanel.render();
		projectFileGridPanel.doLayout();
	});
</script>
<body>
	<div id="_projectFileManagement_SuperTabPanel_${uuid}"></div>
</body>
</html>