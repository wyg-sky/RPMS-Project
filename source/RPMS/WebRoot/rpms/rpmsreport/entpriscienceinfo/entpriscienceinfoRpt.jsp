<%@page import="com.lion.core.util.DateUtil"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib prefix="bios" uri="http://www.bijetsoft.com/BiosReportTags" %> 
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@ page import="com.lion.system.organization.model.Organization" %>
<%@ page import="com.lion.system.Constants" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.lion.system.user.model.User" %>
<%@ page import="com.lion.system.user.model.UserView"%>
<%@ page import="com.lion.core.util.StringUtils"%>
<%
	Map<String,String> map = this.initParamsMap(session);
	
	String fill = request.getParameter("fill");
	String collect = request.getParameter("collect");
	String rpt = null;
	if("true".equals(fill)){
		rpt = "RPMS_Entpri_Science_Info_Fill.brt";
	} else {
		rpt = "RPMS_Entpri_Science_Info_Display.brt";
	}
	
	if("true".equals(collect)){
		rpt = "RPMS_Entpri_Science_Info_Collect.brt";
	}

	SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
	String year = request.getParameter("year");	
	String orgId = request.getParameter("organization.id");
	String halfYear = request.getParameter("halfYear");
	
	//填报报表
	if(StringUtils.isBlank(year)){
		year = sdf.format(new Date());
	}
	map.put("year", year);
	if(!StringUtils.isBlank(halfYear)){
		map.put("halfYear", halfYear);
	}
	
	if(!StringUtils.isBlank(orgId)){
		map.put("orgId", orgId);
	}
	
	String params = getParamsStr(map);

%>

<%!
	private Map<String,String> initParamsMap(HttpSession session){
		Map<String,String> map = new HashMap<String,String>();
		Organization org = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)session.getAttribute(Constants.USER_VIEW);
		map.put("orgId",org.getId());
		map.put("userId",user.getId());
		map.put("userName",user.getUserName());
		map.put("orgCode",org.getCode()+"%");
		return map;
	}
	
	private String getParamsStr(Map<String,String> map){
		StringBuilder sb = new StringBuilder();
		for(Map.Entry<String,String> entry:map.entrySet()){
			addParam(sb, entry.getKey(), entry.getValue());
		}
		return sb.toString();
	}

	private void addParam(StringBuilder params,String paramName,String paramValue){
		params.append(paramName).append("=").append(paramValue).append(";");
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>

    <bios:report rpt="<%=rpt %>" params="<%=params%>"/>
    
</body>
</html>


 