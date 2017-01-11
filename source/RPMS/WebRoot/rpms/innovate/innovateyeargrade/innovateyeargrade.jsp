<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.lion.rpms.common.PlatCenterUtil" %>

<script language="JavaScript" type="text/javascript">
Ext.lion.ScriptLoader('rpms/innovate/innovateyeargrade/InnovateYearGradeManager.js', false);
new Ext.lion.rpms.InnovateYearGradeManager({
	viewPath : 'rpms/innovate/innovateyeargrade/list',
	isCenterManager:<%=PlatCenterUtil.isCenterManager(session,new String[]{"0004","2"}) %>
});
</script>
