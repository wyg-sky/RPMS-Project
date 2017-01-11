<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@ page import="com.lion.system.organization.model.Organization" %>
<%@ page import="com.lion.system.user.model.User" %>
<%@ page import="com.lion.system.Constants" %> 
<%

	StringBuilder disuseID = new StringBuilder();
	User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
	Organization organization = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
	String disuseID1 = request.getParameter("id");
	if (disuseID1 != null && disuseID1.length() >0 && !disuseID1.equalsIgnoreCase("null")) {
		if(!disuseID1.contains(",")){
			disuseID.append(" and p.id =");
			disuseID.append(disuseID1);
		}else{
			disuseID.append(" and p.id in (");
			disuseID.append(disuseID1);
			disuseID.append(") ");
		}
	}
	String projectCode = request.getParameter("projectCode");
	if (projectCode != null && projectCode.length() >0 && !projectCode.equalsIgnoreCase("null")) {
		disuseID.append(" and p.project_Code like '%");
		disuseID.append(projectCode);
		disuseID.append("%'");
    }
	String projectName = request.getParameter("projectName");
	if (projectName != null && projectName.length() >0 && !projectName.equalsIgnoreCase("null")) {
		projectName = URLDecoder.decode(projectName,"UTF-8");
		disuseID.append(" and p.project_Name like '%");
		disuseID.append(projectName);
		disuseID.append("%'");
    }
	String projectAnnual = request.getParameter("projectAnnual");
	if (projectAnnual != null && projectAnnual.length() >0 && !projectAnnual.equalsIgnoreCase("null")) {
		projectAnnual = URLDecoder.decode(projectAnnual,"UTF-8");
		disuseID.append(" and p.project_Annual = '");
		disuseID.append(projectAnnual);
		disuseID.append("'");
    }
	String proejctType = request.getParameter("proejctType");
	if (proejctType != null && proejctType.length() >0 && !proejctType.equalsIgnoreCase("null")) {
		proejctType = URLDecoder.decode(proejctType,"UTF-8");
		disuseID.append(" and p.proejct_Type = '");
		disuseID.append(proejctType);
		disuseID.append("'");
    }
	String platCenter = request.getParameter("platCenter");
	if (platCenter != null && platCenter.length() >0 && !platCenter.equalsIgnoreCase("null")) {
		disuseID.append(" and p.plat_Center= '");
		disuseID.append(platCenter);
		disuseID.append("'");
    }
	String platInstitution = request.getParameter("platInstitution");
	if (platInstitution != null && platInstitution.length() >0 && !platInstitution.equalsIgnoreCase("null")) {
		disuseID.append(" and p.plat_Institution= '");
		disuseID.append(platInstitution);
		disuseID.append("'");
    }
	String specialty = request.getParameter("specialty");
	if (specialty != null && specialty.length() >0 && !specialty.equalsIgnoreCase("null")) {
		disuseID.append(" and p.specialty= '");
		disuseID.append(specialty);
		disuseID.append("'");
    }
	String business = request.getParameter("business");
	if (business != null && business.length() >0 && !business.equalsIgnoreCase("null")) {
		disuseID.append(" and p.business = '");
		disuseID.append(business);
		disuseID.append("'");
    }
	
	String chargeDepartnent = request.getParameter("chargeDepartnent");
	if (chargeDepartnent != null && chargeDepartnent.length() >0 && !chargeDepartnent.equalsIgnoreCase("null")) {
		disuseID.append(" and p.charge_departnent = '");
		disuseID.append(chargeDepartnent);
		disuseID.append("'");
    }
	String status = request.getParameter("status");
	if (status != null && status.length() >0 && !status.equalsIgnoreCase("null")) {
		disuseID.append(" and p.status = '");
		disuseID.append(status);
		disuseID.append("'");
    }
	String projectStage = request.getParameter("projectStage");
	if (projectStage != null && projectStage.length() >0 && !projectStage.equalsIgnoreCase("null")) {
		disuseID.append(" and p.project_stage = '");
		disuseID.append(projectStage);
		disuseID.append("'");
    }
    String params = "usrId="+user.getId();
	String condition ="condition="+disuseID.toString();
	
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
	<bios:report rpt="Rpms_Project.brt" rptwidth="1600" rptskin="mate" vars="<%=condition%>"  params="<%=params%>"/>
</body>
</html>


 