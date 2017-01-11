<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="com.lion.system.user.model.User" %>
<%@ page import="com.lion.system.Constants" %>

<%
	User user = (User) request.getSession().getAttribute(Constants.USER_AUTH);
	response.addHeader("dataAccess",user!=null?user.toString():"错误信息未知");
%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<title><fmt:message key="403.title"/></title>
    <meta name="heading" content="data access failure"/>
</head>
<body>
<fmt:message key="403.message"/>
<a href="login.html" onclick="history.back();return false">Back</a>
<br/>
<hr/>Debug Information:
<p>
	<%	
		if (user != null)
		{ 
	%>
			Authentication object as a String: <%= user.toString() %>
	<%  
		} 
	%>
</p>
</body>
</html>
