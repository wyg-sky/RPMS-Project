<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('system/example/user/UserManager.js', false);
	new Ext.lion.system.UserManager({
		viewPath : 'system/example/user/list'
	});
</script>