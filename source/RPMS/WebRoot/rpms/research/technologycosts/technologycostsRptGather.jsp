<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@page import="com.lion.system.Constants"%>
<%@page import="com.lion.system.user.model.User"%>
<%@page import="com.opensymphony.oscache.util.StringUtil"%>
<%@page import="com.lion.core.util.StringUtils"%>
<%@page import="com.lion.rpms.base.researchplat.model.ResearchPlat"%>
<%@page import="com.lion.system.department.model.Department"%>
<%@ page import="java.text.SimpleDateFormat" %>
<html>
<%		
		String params="";
		SimpleDateFormat sdfDay = new SimpleDateFormat("yyyy-MM");
		
		//ResearchPlat researchPlat = (ResearchPlat)session.getAttribute("PlatUtil");
		
		String costsMonths = request.getParameter("costsMonths");
		
		if (costsMonths != null && costsMonths.length() >0 && !costsMonths.equalsIgnoreCase("null")) {
			params += ";costsMonths="+costsMonths;
		}else{
			params +=";costsMonths="+sdfDay.format(new Date());
		}
%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
	<bios:report rpt="Rpms_Technology_Costs_Gather.brt" params="<%=params%>"/>
</body>
</html>


 