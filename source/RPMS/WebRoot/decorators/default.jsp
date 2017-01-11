<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.lion.system.Constants"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ include file="/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<%@ include file="/common/meta.jsp"%>
	<title>
		国家企业技术中心信息管理平台<%if(session.getAttribute(Constants.MODULETITLE)!=null) {out.print("|" + session.getAttribute(Constants.MODULETITLE));}%>
	</title>
	<decorator:head/>
</head>
<body
	<decorator:getProperty property="body.id" writeEntireProperty="true"/>
	<decorator:getProperty property="body.class" writeEntireProperty="true"/>>
	<decorator:body/>
</body>
</html>
