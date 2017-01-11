<%@ page language="java" pageEncoding="UTF-8"%>
<script language="JavaScript" type="text/javascript">
	var form = new Ext.lion.LionForm({
		viewPath : 'system/example/singlesystem/listqueryform'
	});
	
	var dataGrid = new Ext.lion.LionGrid({
		viewPath : 'system/example/singlesystem/listgrid',
		queryForm : form
	});
	
	var tbar = new Ext.lion.LionToolbar({
		viewPath : 'system/example/singlesystem/listbar',
		scope : dataGrid
	});
	
	var win = FW.addToWin( [ tbar, form, dataGrid ]);
</script>