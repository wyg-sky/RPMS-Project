<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@page import="com.lion.system.Constants"%>
<%@page import="com.lion.system.user.model.User"%>
<%@page import="com.opensymphony.oscache.util.StringUtil"%>
<%@page import="com.lion.core.util.StringUtils"%>
<%@page import="com.lion.system.organization.model.Organization"%><html>

<%
    Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
    User user = (User)request.getSession().getAttribute(Constants.USER_AUTH);
    String params = "";
    String org = organization.getId();
    String userName = user.getUserName();
    String reportDate = request.getParameter("reportDate");
    String projectCd = request.getParameter("projectCd");
    String projectName = request.getParameter("projectName");
    String projectStatus = request.getParameter("projectStatus");
    if(org!=null&&userName!=null) {
        params = "org="+org+";user="+userName;
    }
    String cond = "cond=";
    if(reportDate != null && !reportDate.equals("")&& !reportDate.equals("null")) {
        cond += " and REPORT_DATE = '"+reportDate+"' ";
    }
    if(projectCd != null && !projectCd.equals("")&& !projectCd.equals("null")) {
        cond += " and PROJECT_CD LIKE '%"+projectCd+"%' ";
    }
    if(projectName != null && !projectName.equals("")&& !projectName.equals("null")) {
        cond += " and PROJECT_NAME LIKE '%"+projectName+"%' ";
    }
    if(projectStatus != null && !projectStatus.equals("")&& !projectStatus.equals("null")) {
        cond += " and PROJECT_STATUS = '"+projectStatus+"' ";
    }
    
%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <bios:report rpt="Prds_ProjectSingle_Fill.brt"
        forwardurl="javascript:parent.projectSingleManager.afterReportSave();"
        errorforward="javascript:parent.projectSingleManager.showTip(false);"
        params="<%=params%>" 
        vars="<%=cond %>"/>
</body>