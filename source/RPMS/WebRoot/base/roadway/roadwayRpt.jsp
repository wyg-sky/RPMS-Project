<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@page import="com.lion.system.Constants"%>
<%@page import="com.lion.system.user.model.User"%>
<%@page import="com.opensymphony.oscache.util.StringUtil"%>
<%@page import="com.lion.core.util.StringUtils"%>
<%@page import="com.lion.system.organization.model.Organization"%>
<html>
<%

		StringBuilder condition = new StringBuilder();
		Organization org = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
		User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
		
		
		String reportStatus = request.getParameter("reportStatus");
		if (reportStatus != null && reportStatus.length() >0 && !reportStatus.equalsIgnoreCase("null")) {
			condition.append(" and REPORT_STATUS ='");
			condition.append(reportStatus);
			condition.append("'");
		}
		String produceStatus = request.getParameter("produceStatus");
		if (produceStatus != null && produceStatus.length() >0 && !produceStatus.equalsIgnoreCase("null")) {
			condition.append(" and STATUS_CD ='");
			condition.append(produceStatus);
			condition.append("'");
		}
		String isValid = request.getParameter("isValid");
		if (isValid != null && isValid.length() >0 && !isValid.equalsIgnoreCase("null")) {
			condition.append(" and VALID ='");
			condition.append(isValid);
			condition.append("'");
		}
		String roadwayType = request.getParameter("roadwayType");
		if (roadwayType != null && roadwayType.length() >0 && !roadwayType.equalsIgnoreCase("null")) {
			condition.append(" and ROADWAY_TYPE_CD ='");
			condition.append(roadwayType);
			condition.append("'");
		}
		String reportDate = request.getParameter("reportDate");
		if (reportDate != null && reportDate.length() >0 && !reportDate.equalsIgnoreCase("null")) {
			condition.append(" and REPORT_DATE ='");
			condition.append(reportDate);
			condition.append("'");
		}
		String mine = URLDecoder.decode(org.getId(),"UTF-8");
		String createUser = URLDecoder.decode(user.getUserName(),"UTF-8");
		String params = "org="+mine+";createUser="+createUser+";modifyUser="+createUser;
		String cond ="cond="+condition.toString();
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
	<bios:report rpt="Prds_BaseRoadway_Fill.brt"
		forwardurl="javascript:parent.roadwayManager.afterReportSave();"
		errorforward="javascript:parent.roadwayManager.showTip(false);"
		params="<%=params%>"
		vars="<%=cond%>" />
</body>
</html>


 