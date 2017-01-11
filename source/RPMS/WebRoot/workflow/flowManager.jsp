<!-- 流程设计模块页面  -->
<%@ page language="java" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
	String elid = java.util.UUID.randomUUID().toString();
%>
<%@ include file="/common/taglibs.jsp"%>
<script language="JavaScript" type="text/javascript">
var projectPath = '<%=path%>';

    Ext.onReady(function(){
        Ext.QuickTips.init();

        //add by yangming 20100513
        Ext.lion.CssLoader("<c:url value='/ext/TreeGrid.css'/>");
         
        Ext.lion.ScriptLoader(
       		'ext/extension/ComboBoxTree.js',
   			'ext/extension/ComboWindow.js',
   			'ext/TreeCheckNodeUI.js',
   			'ext/extension/RadioGroup.js',
   			'ext/extension/XmlTreeLoader.js',
   			'ext/TreeGrid.js',
   			'scripts/GridPanel.js',
   			'scripts/util/ParseXML.js',
            'workflow/scripts/FlowNavTree.js',
			'workflow/scripts/design/FlowDesignNavPanel.js',
			'workflow/scripts/design/FlowMainCtViewPanel.js',
			'workflow/scripts/design/FlowDesignViewPanel.js',
			'workflow/scripts/design/FlowManagerHome.js',
			'workflow/scripts/design/ImportGuideWin.js',
			'workflow/scripts/BpTypeView.js',
			'workflow/scripts/BpTypeAddOrEdit.js',
			'workflow/scripts/BpStateView.js',
			'workflow/scripts/BpStateAddOrEdit.js',
			'workflow/scripts/BpStateAddOrEdit.js',
			//'workflow/scripts/BpCategoryView.js',
			//'workflow/scripts/BpCategoryAddOrEdit.js',
			//'workflow/scripts/BpCloseCodeView.js',
			//'workflow/scripts/BpCloseCodeAddOrEdit.js',
			"workflow/scripts/FlowWorkbenchPanel.js"
        );

        var flowNavPanel = new FlowDesignNavPanel();
        var flowMainViewPanel = new FlowMainCtViewPanel();

        var _container_flow_panel = new Ext.Panel({
            el : '<%=elid%>',//此处el指向div id 必须唯一
            bodyBorder : false,
            bodyBorder : false,
            layout : 'border',
            items : [
                flowNavPanel, flowMainViewPanel
            ]
        });
        
        _container_flow_panel.render();

        flowMainViewPanel.loadFlowManagerHome();
        
    });


</script>

<div id='<%=elid%>'></div>