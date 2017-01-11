<%@ page language="java" pageEncoding="UTF-8"%>

<%
	boolean isgather = Boolean.parseBoolean(request.getParameter("isgather"));
%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('rpms/research/technologycosts/TechnologyCostsManager.js', false);
	var technologyCostsManager = new Ext.lion.rpms.TechnologyCostsManager({
		viewPath : 'rpms/research/technologycosts/report',
		isgather : <%=isgather %>,
		isfill : false,
		org : ''
	});
</script>
