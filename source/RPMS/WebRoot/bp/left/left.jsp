<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;

String moduleId = request.getParameter("moduleId");
if (moduleId == null || moduleId.equalsIgnoreCase("null")) {
	out.println("没有取到顶级菜单ID，无法构建菜单树！");
	return;
}
%>
<script language="JavaScript" type="text/javascript">

Ext.lion.ScriptLoader('bp/left/scripts/RightViewPanel.js',
		'bp/left/scripts/LeftNavPanel.js',
		'bp/left/scripts/LeftNavTree.js',
		'ext/extension/ComboBoxTree.js',
		'ext/extension/ComboWindow.js',
		'scripts/GridPanel.js');

    var url = "cmes/loadModuleChildren.html?moduleId=<%=moduleId%>";
    var path ="<%=path%>";
	Ext.onReady(function(){
    	Ext.QuickTips.init();
	    var viewPanel = new RightViewPanel();
    	var navPanel = new LeftNavPanel({viewPanel:viewPanel,url:url,path:path});
		var _container_ht_panel = new Ext.Panel({
	        el:'_container_ht_panel_render_${uuid}',//此处el指向div id 必须唯一
	        layout : 'border',
	        border: false,
	        items : [navPanel,viewPanel]
	    });
		_container_ht_panel.render();
	});
</script>

<div id='_container_ht_panel_render_${uuid}'></div>