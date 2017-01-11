<%@ page language="java" pageEncoding="UTF-8"%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('base/attendance/AttendanceManager.js', false);
	new Ext.lion.prds.AttendanceManager({
		viewPath : 'base/attendance/list'
	});
</script>