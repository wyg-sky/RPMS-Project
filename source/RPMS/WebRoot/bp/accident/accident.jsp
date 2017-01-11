<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>

<script language="JavaScript" type="text/javascript">
	Ext.onReady(function(){
	    Ext.QuickTips.init();

	    Ext.lion.ScriptLoader('ext/extension/ComboWindow.js',
				'ext/extension/RadioGroup.js',
				'ext/extension/ComboBoxTree.js',
				'/ext/extension/CheckBoxGroup.js',
				'/scripts/util/RequestUtil.js');
	    
	  // Ext.lion.ScriptLoader("<c:url value='ext/extension/ComboWindow.js'/>",false);
		// Ext.lion.ScriptLoader("<c:url value='ext/extension/RadioGroup.js'/>",false);
	   //Ext.lion.ScriptLoader("<c:url value='ext/extension/ComboBoxTree.js'/>",false);
		// Ext.lion.ScriptLoader("<c:url value='/ext/extension/CheckBoxGroup.js'/>",false);
		// Ext.lion.ScriptLoader("<c:url value='/scripts/util/RequestUtil.js'/>",false);
	    
		Ext.lion.ScriptLoader("<c:url value='/bp/accident/scripts/AccidentHomePanel.js'/>",false);
		var accidentManagementSuperTabPanel = new Ext.TabPanel({
			el : '_accidentManagement_SuperTabPanel_${uuid}',//此处el指向div id 必须唯一
	        border : true,
	        height : 510,
		    activeTab : 0,
		    frame : false,
		    enableTabScroll : true,
			plugins : new Ext.ux.TabCloseMenu()
		});
		var accidentHomePanel = new AccidentHomePanel({
			superTabPanel : accidentManagementSuperTabPanel,
			border : true
		});
		accidentManagementSuperTabPanel.add(accidentHomePanel);
		accidentManagementSuperTabPanel.render();
		accidentHomePanel.doLayout();
	});
</script>

<div id='_accidentManagement_SuperTabPanel_${uuid}'></div>
