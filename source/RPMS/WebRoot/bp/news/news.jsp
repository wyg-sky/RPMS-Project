<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>
<script language="JavaScript" type="text/javascript">

	Ext.lion.ScriptLoader('bp/news/scripts/NewsViewPanel.js',
			'bp/news/scripts/NewsNavPanel.js',
			'bp/news/scripts/NewsNavTree.js',
			'bp/news/scripts/NewsSearch.js',
			'ext/extension/ComboBoxTree.js',
			'ext/extension/ComboWindow.js',
			'scripts/GridPanel.js');
	
	Ext.onReady(function(){
    	Ext.QuickTips.init();
    	
	    var htViewPanel = new NewsViewPanel();
    	var htNavPanel = new NewsNavPanel({viewPanel : htViewPanel});
		var _container_ht_panel = new Ext.Panel({
	        el:'_container_ht_panel_render_Id',//此处el指向div id 必须唯一
	        layout : 'border',
	        border: false,
	        items : [htNavPanel,htViewPanel]
	    });
		_container_ht_panel.render();
	});
</script>

<div id='_container_ht_panel_render_Id'></div>