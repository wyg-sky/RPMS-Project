<%@ page language="java" pageEncoding="UTF-8"%>
<script language="JavaScript" type="text/javascript">
	var form = new Ext.lion.LionForm({
		viewPath : 'system/example/singlesystem/editform'
	});
	
	var tbar = new Ext.lion.LionToolbar({
		viewPath : 'system/example/singlesystem/editbar',
		scope : form
	});
	
	var win = FW.addToWin( [ tbar, form ]);
</script>