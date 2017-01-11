<%@ page language="java" pageEncoding="UTF-8"%>
<%
	//String fileType = request.getParameter("tileType");
%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('rpms/research/projectfile/ProjectFileManager.js', false);
	new Ext.lion.rpms.ProjectFileManager({
		viewPath : 'rpms/research/projectfile/list'
	});
</script>
