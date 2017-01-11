<%@page import="com.lion.core.util.DateUtil"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@ page import="com.lion.system.organization.model.Organization" %>
<%@ page import="com.lion.system.Constants" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.lion.system.user.model.User" %>
<%
            Organization organizations= (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
            User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
            
            StringBuilder condition = new StringBuilder();
            
            String query = request.getParameter("query");
            String projectCode  = request.getParameter("projectCode");
            String projectName = request.getParameter("projectName");
            String projectAnnual = request.getParameter("projectAnnual");
            String projectStatus = request.getParameter("projectStatus");
            String proejctType = request.getParameter("proejctType");
            String organization = request.getParameter("organization");
            String platCenter = request.getParameter("platCenter");
            String specialty = request.getParameter("specialty");
            String projectPerson = request.getParameter("projectPerson");
            String projectPersonOrg = request.getParameter("projectPersonOrg");
            String position = request.getParameter("position");
            String title = request.getParameter("title");
            String status = request.getParameter("status");
            String dispatchMonth = request.getParameter("dispatchMonth");
            String projectStage = request.getParameter("projectStage");
            String recommendType = request.getParameter("recommendType");
            
            if(query == null || query.length()<=0 || query.trim().equals("") || query.equalsIgnoreCase("null")){
            	//初始化查询
                condition.append(" and p.project_Code ='' ");
           } 
            
            if(projectCode != null &&!projectCode.trim().equals("")&& projectCode.length() >0 && !projectCode.equalsIgnoreCase("null")){
            	condition.append(" and p.project_Code like '%").append(projectCode).append("%' ");
            }
            if(projectName != null &&!projectName.trim().equals("")&& projectName.length() >0 && !projectName.equalsIgnoreCase("null")){
            	condition.append(" and p.project_Name like '%").append(projectName).append("%' ");
            }
            if(projectAnnual != null &&!projectAnnual.trim().equals("")&& projectAnnual.length() >0 && !projectAnnual.equalsIgnoreCase("null")){
            	condition.append(" and p.project_Annual = '").append(projectAnnual).append("' ");
            }
            if(projectStatus != null &&!projectStatus.trim().equals("")&& projectStatus.length() >0 && !projectStatus.equalsIgnoreCase("null")){
            	condition.append(" and p.status = '").append(projectStatus).append("' ");
            }
            if(proejctType != null &&!proejctType.trim().equals("")&& proejctType.length() >0 && !proejctType.equalsIgnoreCase("null")){
            	condition.append(" and p.proejct_Type = '").append(proejctType).append("' ");
            }
            if(organization != null &&!organization.trim().equals("")&& organization.length() >0 && !organization.equalsIgnoreCase("null")){
            	condition.append(" and p.organization = '").append(organization).append("' ");
            }
            if(platCenter != null &&!platCenter.trim().equals("")&& platCenter.length() >0 && !platCenter.equalsIgnoreCase("null")){
            	condition.append(" and p.plat_Center = '").append(platCenter).append("' ");
            }
            if(specialty != null &&!specialty.trim().equals("")&& specialty.length() >0 && !specialty.equalsIgnoreCase("null")){
            	condition.append(" and p.specialty = '").append(specialty).append("' ");
            }
            if(projectPerson != null &&!projectPerson.trim().equals("")&& projectPerson.length() >0 && !projectPerson.equalsIgnoreCase("null")){
            	condition.append(" and rt.talent_name like '%").append(projectPerson).append("%' ");
            }
            if(projectPersonOrg != null &&!projectPersonOrg.trim().equals("")&& projectPersonOrg.length() >0 && !projectPersonOrg.equalsIgnoreCase("null")){
            	condition.append(" and rt.organization = '").append(projectPersonOrg).append("' ");
            }
            if(position != null &&!position.trim().equals("")&& position.length() >0 && !position.equalsIgnoreCase("null")){
            	condition.append(" and rt.position = '").append(position).append("' ");
            }
            if(title != null &&!title.trim().equals("")&& title.length() >0 && !title.equalsIgnoreCase("null")){
            	condition.append(" and rt.title = '").append(title).append("' ");
            }
            if(status != null &&!status.trim().equals("")&& status.length() >0 && !status.equalsIgnoreCase("null")){
            	condition.append(" and pd.status = '").append(status).append("' ");
            }
            if(dispatchMonth != null &&!dispatchMonth.trim().equals("")&& dispatchMonth.length() >0 && !dispatchMonth.equalsIgnoreCase("null")){
            	condition.append(" and pd.dispatch_Month = '").append(dispatchMonth).append("' ");
            }
            if(projectStage != null &&!projectStage.trim().equals("")&& projectStage.length() >0 && !projectStage.equalsIgnoreCase("null")){
            	condition.append(" and pd.project_Stage = '").append(projectStage).append("' ");
            }
            if(recommendType != null &&!recommendType.trim().equals("")&& recommendType.length() >0 && !recommendType.equalsIgnoreCase("null")){
            	condition.append(" and p.recommend_Type = '").append(recommendType).append("' ");
            }
           
            String con ="condition="+condition.toString();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>

    <bios:report rpt="RPMS_PROJECT_TOTAL.brt"    vars="<%=con%>"  />
    
</body>
</html>


 