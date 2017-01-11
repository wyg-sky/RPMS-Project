<!-- 流程监控模块  -->
<%@ page language="java" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
	String uuid = java.util.UUID.randomUUID().toString();
%>
<%@ include file="/common/taglibs.jsp"%>
<script language="JavaScript" type="text/javascript">

    Ext.onReady(function(){
        Ext.QuickTips.init();

        //add by yangming 20100513
         
		Ext.lion.ScriptLoader(
				'ext/portal/Portal.js',
				'ext/extension/amchart/mediapanel.js',
				'ext/extension/ComboBoxTree.js',
				'ext/extension/ComboWindow.js',
				'ext/TreeCheckNodeUI.js',
				'ext/extension/RadioGroup.js',
				'scripts/GridPanel.js',
				'workflow/scripts/FlowNavTree.js',
				'workflow/scripts/monitor/FlowMonitorNavPanel.js',//监控导航
				'workflow/scripts/monitor/FlowMonitorHomePanel.js',//监控首页
				'workflow/scripts/monitor/FlowMonitorCtViewPanel.js',//容器
				'workflow/scripts/monitor/FlowMonitorViewPanel.js',
				'workflow/scripts/monitor/FlowSearchPanel.js',
				//'admin/scripts/portal/util/CookieUtilForPortal.js',
				"workflow/scripts/FlowWorkbenchPanel.js"
				);

        var flowNavPanel = new FlowMonitorNavPanel();
        var flowMonitorCtViewPanel = new FlowMonitorCtViewPanel();

        var _container_flow_panel = new Ext.Panel({
            el : '<%=uuid%>',//此处el指向div id 必须唯一
            bodyBorder : false,
            bodyBorder : false,
            layout : 'border',
            items : [
                flowNavPanel, flowMonitorCtViewPanel
            ]
        });
        
        _container_flow_panel.render();

        flowMonitorCtViewPanel.loadFlowMonitorHomePanel();
        
    });


</script>

<div id='<%=uuid%>'></div>