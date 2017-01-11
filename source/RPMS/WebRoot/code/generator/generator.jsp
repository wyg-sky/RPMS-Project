<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('code/generator/GeneratorManager.js', false);
	var isServer = true;
	Ext.Ajax.request({
		url : 'system/isServer.html',
		method : 'post',
		async : false,
		scope : this,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText || "{}");
			if(json.success) {
				isServer = json.isServer;
			}
		}
	});
	new Ext.lion.system.GeneratorManager({
		viewPath : 'code/generator/tabpanel',
		isServer : isServer
	});
</script>
