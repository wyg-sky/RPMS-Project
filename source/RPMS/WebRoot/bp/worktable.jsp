<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>
<script language="JavaScript" type="text/javascript">
	
	
	Ext.onReady(function(){
	    Ext.QuickTips.init();
	   	
	   	Ext.lion.ScriptLoader("<c:url value='/bp/scripts/WtbNavTree.js'/>",false);
		Ext.lion.ScriptLoader("<c:url value='/bp/scripts/WtbNavPanel.js'/>",false);
		Ext.lion.ScriptLoader("<c:url value='/bp/scripts/WtbViewPanel.js'/>",false);
		Ext.lion.ScriptLoader("<c:url value='/bp/scripts/WtbWorkbenchPanel.js'/>",false);
		Ext.lion.ScriptLoader("<c:url value='/bp/scripts/WtbReportPanel.js'/>",false);

		Ext.lion.ScriptLoader("<c:url value='/FVSD_RUNTIMESPACE/HOME/worktable_cfg.js'/>",false);

		var wtbNavPanel = new WtbNavPanel({
			bps : ${bps},
			typeCode : '${typeCode}'
		});
		var wtbViewPanel = new WtbViewPanel({
			bps : ${bps},
			typeCode : '${typeCode}'
		});
		var _container_wtb_panel${uuid} = new Ext.Panel({
	        el:'${uuid}',//此处el指向div id 必须唯一
	        layout: 'column',
	        border: false,
	        autoScroll :true,
	     	bodyStyle: 'padding: 2px 0 0 2px ',
	        autoWidth: false,
	        items : [
     	        wtbNavPanel,
     	        {width:1,border:false},
     	       	wtbViewPanel,
     	       {width:1,border:false}
	     	]
	    });
		_container_wtb_panel${uuid}.render();
	});
	
</script>

<div id='${uuid}'></div>