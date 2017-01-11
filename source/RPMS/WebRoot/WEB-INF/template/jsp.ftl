<%@ page language="java" pageEncoding="UTF-8"%>

<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('${generateInfo.systemName}/${generateInfo.packageName}/${generateInfo.className}Manager.js', false);
	new Ext.lion.${generateInfo.systemName}.${generateInfo.className}Manager({
		viewPath : '${generateInfo.systemName}/${generateInfo.packageName}/list'
	});
</script>
