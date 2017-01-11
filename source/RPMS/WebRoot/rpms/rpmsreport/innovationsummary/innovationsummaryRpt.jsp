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
	String requestContextPath = request.getContextPath();
            Organization organization = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
            User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
            StringBuilder condition = new StringBuilder();
            String platCenter = request.getParameter("platCenter");
            String startDate = request.getParameter("startDate");
            String endDate = request.getParameter("endDate");
            String platName = request.getParameter("platName");
            String status = request.getParameter("status");
            String userName = "";
            String userEmail = "";
            String userMobile = "";
            String orgName = "";
            String reportDate = "";
            if(user != null){
            	userName = user.getUserName();
                userEmail = user.getEmail();
                userMobile = user.getMobile();
            }
            if(organization != null){
            	orgName = organization.getName();
            	/* condition.append(" and orgId = '");
                condition.append(organization.getId());
                condition.append("' "); */
            }
            
            if(platCenter != null && platCenter.length()>0 && !platCenter.trim().equals("")){
                orgName = organization.getName();
                condition.append(" and (platcId in ('");
                condition.append(platCenter);
                condition.append("') or platinId in ('");
                condition.append(platCenter);
                condition.append("')) ");
            }
            if(startDate != null && startDate.length() >0 && !startDate.trim().equals("") && endDate != null && endDate.length() >0 && !endDate.trim().equals("")){
            	condition.append(" and substr(date_time,1,7) ");
            	condition.append("between '");
                condition.append(startDate);
                condition.append("'  and  '");
                condition.append(endDate);
                condition.append("'");
                reportDate+=startDate+"--"+endDate;
            }
            
           if(status == null || status.length()<=0 || status.trim().equals("")){
        	   condition.append("and (platcId in ('') or platinId in (''))");
          }else{
              if(platName != null &&!platName.trim().equals("")&& platName.length() >0 && !platName.equalsIgnoreCase("null")){
                  orgName = URLDecoder.decode(platName, "UTF-8");
              }else{
                  orgName = organization.getName();
              }
          }  
            
		String params = "userName=" + userName + ";userEmail=" + userEmail + ";userMobile=" + userMobile 
				                      + ";orgName=" + orgName + ";reportDate=" + reportDate;
		String con = "con=" + condition.toString();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body topmargin=0>

    <bios:report rpt="RPMS_Innovation_Summary.brt"     vars="<%=con%>"   params="<%=params%>"/>
    
</body>
</html>


 