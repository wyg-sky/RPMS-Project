<%@ page language="java" pageEncoding="UTF-8"%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('base/location/LocationManager.js', false);
	new Ext.lion.base.LocationManager({
		viewPath : 'base/location/list',
		type : '${param.type}'
	});
</script>
