<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	var showType = '<%=request.getParameter("showType")%>';
	Ext.lion.ScriptLoader('system/code/CodeManager.js', false);
	new Ext.lion.system.CodeManager({
		viewPath : 'system/code/list'
	});
</script>
