<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.lion.rpms.common.PlatCenterUtil" %>

<script language="JavaScript" type="text/javascript">
Ext.lion.ScriptLoader('rpms/innovate/innovatequartergrade/InnovateQuarterGradeManager.js', false);
new Ext.lion.rpms.InnovateQuarterGradeManager({
	viewPath : 'rpms/innovate/innovatequartergrade/list',
	isCenterManager:<%=PlatCenterUtil.isCenterManager(session,new String[]{"0004","2"}) %>
});
</script>
