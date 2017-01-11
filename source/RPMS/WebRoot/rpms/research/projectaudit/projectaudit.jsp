<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	var isGuanliRole = false;
	Ext.Ajax.request({
		url : 'rpms/isGuanliRole.html',
		params : { 
			loginame : FW.userId
		},
		async : false,
		scope : this,
		success : function(response){
		var json = Ext.util.JSON.decode(response.responseText || "{}");
		isGuanliRole = json.isGuanliRole;
	}});
    Ext.lion.ScriptLoader('rpms/research/projectaudit/ProjectAuditManager.js', false);
    new Ext.lion.rpms.ProjectAuditManager({
        viewPath : 'rpms/research/projectaudit/list',
        isGuanliRole : isGuanliRole
    });
</script>
