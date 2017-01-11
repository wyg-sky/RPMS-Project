<%@ page language="java" pageEncoding="UTF-8"%>
<%
	boolean ispromotion = false;
	
	if(!"".equals(request.getParameter("ispromotion")) 
			&& request.getParameter("ispromotion") != null){
		if(Boolean.parseBoolean(request.getParameter("ispromotion"))){
			ispromotion = true;
		}
	}
%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('rpms/research/thesis/ResearchThesisManager.js', false);
	new Ext.lion.rpms.ResearchThesisManager({
		viewPath : 'rpms/research/thesis/list',
		ispromotion : <%=ispromotion %>
	});
</script>
