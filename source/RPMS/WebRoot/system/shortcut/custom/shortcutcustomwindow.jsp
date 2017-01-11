<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<script language="JavaScript" type="text/javascript">
	Ext.onReady(function(){
	    Ext.QuickTips.init();
	    Ext.lion.ScriptLoader('system/shortcut/custom/ShortCutCustomWindow.js',false);
		
		var shortCutCustomWindow = new ShortCutCustomWindow({
			userId : FW.userId,
			userName : FW.userName,
			systemId : FW.moduleId
		});
		
		shortCutCustomWindow.show();
	});
</script>
<div id='_shortCutCustom_SuperTabPanel_' style='height:100%;width:100%'></div>