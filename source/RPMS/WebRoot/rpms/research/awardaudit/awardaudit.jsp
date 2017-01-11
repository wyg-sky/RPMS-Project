<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String awardtype = request.getParameter("awardtype");
	boolean hiddenLine = false;
	if(!"".equals(awardtype) && !"0001".equals(awardtype)){
		hiddenLine = true;
	}
%>
<script language="JavaScript" type="text/javascript">
	Ext.lion.ScriptLoader('rpms/research/awardaudit/AwardAuditManager.js', false);
	new Ext.lion.rpms.AwardAuditManager({
		viewPath : 'rpms/research/awardaudit/list',
		awardtype : <%=awardtype %>,
		hiddenLine : <%=hiddenLine %>,
		checkflag : true
	});
</script>
