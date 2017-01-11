<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>
<html>
<head>
</head>
<script language="JavaScript" type="text/javascript">
	Ext.onReady(function(){
	    Ext.QuickTips.init();
		Ext.lion.ScriptLoader('rpms/welcome/projectachievement/ProjectAchievementGridPanel.js', false);
		var projectAchievementManagementSuperTabPanel = new Ext.Panel({
			el : '_projectAchievementManagement_SuperTabPanel_${uuid}',
	        id : '_projectAchievementManagement_SuperTabPanel_Id',
	        border : true,
		    activeTab : 0,
		    frame : false,
		    enableTabScroll : false
		});
		var projectAchievementGridPanel = new ProjectAchievementGridPanel({
			superTabPanel : projectAchievementManagementSuperTabPanel
		});
		projectAchievementManagementSuperTabPanel.add(projectAchievementGridPanel);
		projectAchievementManagementSuperTabPanel.render();
		projectAchievementGridPanel.doLayout();
	});
</script>
<body>
	<div id="_projectAchievementManagement_SuperTabPanel_${uuid}"></div>
</body>
</html>