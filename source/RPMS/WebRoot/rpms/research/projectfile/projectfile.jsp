<%@ page language="java" pageEncoding="UTF-8"%>
<%
	boolean buttHid = false;
	String isshow = request.getParameter("isshow");
	String viewPath = "rpms/research/projectfile/list";
	
	if(!"".equals(isshow) && isshow != null){
		if(Boolean.parseBoolean(isshow)){
			buttHid = true;
			viewPath = "rpms/research/projectfile/listshow";
		}
	}
%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('rpms/research/projectfile/ProjectFileManager.js', false);
	new Ext.lion.rpms.ProjectFileManager({
		viewPath : '<%=viewPath %>',
		buttHid : <%=buttHid %>
	});
</script>
