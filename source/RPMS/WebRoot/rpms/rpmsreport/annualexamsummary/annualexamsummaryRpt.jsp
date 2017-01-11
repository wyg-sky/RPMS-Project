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
            Organization organization = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
            StringBuilder condition = new StringBuilder();
            User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
            String year  = request.getParameter("year");
            String platCenter = request.getParameter("platCenter");
            String status = request.getParameter("status");
            if(year != null &&!year.trim().equals("")&& year.length() >0 && !year.equalsIgnoreCase("null")){
            	condition.append(" and to_char(to_date(grade.year, 'yyyy'), 'yyyy') ='");
                condition.append(year);
                condition.append("' ");
            }
            if(platCenter != null &&!platCenter.trim().equals("")&& platCenter.length() >0 && !platCenter.equalsIgnoreCase("null")){
                condition.append(" and grade.plat_center = '");
                condition.append(platCenter);
                condition.append("' ");
            }
            if(status == null || status.length()<=0 || status.trim().equals("") || status.equalsIgnoreCase("null")){
                condition.append(" and grade.plat_center = '' ");
           } 
            String con ="con="+condition.toString();
            String params = "";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>

    <bios:report rpt="RPMS_Annual_Exam_Summary.brt"    vars="<%=con%>"  params="<%=params%>"/>
    
</body>
</html>


 