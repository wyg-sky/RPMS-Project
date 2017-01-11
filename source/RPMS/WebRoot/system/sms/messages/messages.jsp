<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('system/sms/messages/MessagesManager.js', false);
	new Ext.lion.system.MessagesManager({
		viewPath : 'system/sms/messages/list'
	});
</script>
