<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	var contextPath = '<%=request.getContextPath()%>';
	Ext.lion.ScriptLoader('system/shortcut/ShortCutManager.js', false);
	new Ext.lion.system.ShortCutManager({
		viewPath : 'system/shortcut/list'
	});
</script>
