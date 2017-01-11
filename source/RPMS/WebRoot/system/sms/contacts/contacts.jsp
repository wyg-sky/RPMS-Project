<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('system/sms/contacts/ContactsManager.js', false);
	new Ext.lion.system.ContactsManager({
		viewPath : 'system/sms/contacts/list'
	});
</script>
