<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="com.lion.system.user.model.User" %>
<%@ page import="com.lion.system.Constants" %> 
<%@ page import="java.net.*" %>
<%@ page import="com.lion.system.organization.model.Organization" %>
<%
	StringBuilder disuseID = new StringBuilder();
	String disuseID1 = URLDecoder.decode(request.getParameter("id"),"UTF-8");
	User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
	Organization organization = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
	if(!user.getLoginName().equals("admin")){
		disuseID.append(" and t.organization ='");
		disuseID.append(organization.getId());
		disuseID.append("'");
	}
	if (disuseID1 != null && disuseID1.length() >0 && !disuseID1.equalsIgnoreCase("null")) {
		if(!disuseID1.contains(",")){
			disuseID.append(" and t.id =");
			disuseID.append(disuseID1);
		}else{
			disuseID.append(" and t.id in (");
			disuseID.append(disuseID1);
			disuseID.append(")  order by t.location_cd");
		}
	} else {
		String locationCd = URLDecoder.decode(request.getParameter("locationCd"),"UTF-8");
		if (locationCd != null && locationCd.length() >0 && !locationCd.equalsIgnoreCase("null")) {
			disuseID.append(" and t.location_cd like '%");
			disuseID.append(locationCd);
			disuseID.append("%' ");
		}
		String locationName = URLDecoder.decode(request.getParameter("locationName"),"UTF-8");
		if (locationName != null && locationName.length() >0 && !locationName.equalsIgnoreCase("null")) {
			disuseID.append(" and t.location_name like '%");
			disuseID.append(locationName);
			disuseID.append("%' ");
		}
		disuseID.append("order by t.location_cd");
	}
	String condition ="condition="+disuseID.toString();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
	
	<bios:report rpt="Base_Location.brt" rptwidth="1000" rptskin="mate" vars="<%=condition%>"/>
	
</body>
</html>


 