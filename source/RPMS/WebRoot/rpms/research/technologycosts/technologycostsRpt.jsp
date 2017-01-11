<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<%@page import="com.opensymphony.oscache.util.StringUtil"%>
<%@page import="com.lion.core.util.StringUtils"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.lion.system.Constants"%>
<%@page import="com.lion.system.organization.model.Organization"%><html><html>
<%		
		String params="";
		String path = "";
		SimpleDateFormat sdfDay = new SimpleDateFormat("yyyy-MM");
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		
		String platCenter = request.getParameter("platCenter");
		String costsMonths = request.getParameter("costsMonths");
		String isgather = request.getParameter("isgather");
		
		if(!"".equals(isgather) && isgather != null){
			if("true".equals(isgather)){
				path = "Rpms_Technology_Costs_Gather.brt";
			}else{
				path = "Rpms_Technology_Costs_View.brt";
			}
		}
		if (platCenter != null && platCenter.length() >0 && !platCenter.equalsIgnoreCase("null")) {
			params += "platCenter="+platCenter;
		}else{
			params += "platCenter="+organization.getId();
		}
		
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
<bios:report rpt="<%=path %>" params="<%=params%>" />
</body>
</html>


