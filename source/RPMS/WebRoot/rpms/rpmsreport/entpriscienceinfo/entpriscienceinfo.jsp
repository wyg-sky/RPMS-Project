<%@ page language="java" pageEncoding="UTF-8"%>

<%
	String collect = request.getParameter("collect");
	String viewPath = "rpms/rpmsreport/entpriscienceinfo/list";
	if("true".equals(collect)){
		viewPath = "rpms/rpmsreport/entpriscienceinfocollect/list";
	}
%>

<script language="JavaScript" type="text/javascript">
    Ext.lion.ScriptLoader('rpms/rpmsreport/entpriscienceinfo/EntpriScienceInfoManager.js', false);
   	var entpriScienceInfoManager =  new Ext.lion.rpms.EntpriScienceInfoManager({
        viewPath : '<%=viewPath %>',
        collect:<%=collect %>
    });
</script>