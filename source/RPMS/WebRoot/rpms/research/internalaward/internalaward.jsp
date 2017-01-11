<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String awardtype = request.getParameter("awardtype");
	boolean hiddenLine = false;
	if(!"".equals(awardtype) && !"0001".equals(awardtype)){
		hiddenLine = true;
	}
%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('rpms/research/internalaward/InternalAwardManager.js', false);
	new Ext.lion.rpms.InternalAwardManager({
		viewPath : 'rpms/research/internalaward/list',
		awardtype : <%=awardtype %>,
		hiddenLine : <%=hiddenLine %>,
		checkflag : true,
		approve : true
	});
</script>
