<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<head>
<!-- HTTP 1.1 -->
<meta http-equiv="Cache-Control" content="no-store" />
<!-- HTTP 1.0 -->
<meta http-equiv="Pragma" content="no-cache" />
<!-- Prevents caching at the Proxy Server -->
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="generator" content="ForceView Service Desk 3.0" />
<!-- leave this for stats please -->
<meta name="heading" content="<fmt:message key='webapp.tagline'/>" />

<link rel="icon" href="<c:url value="/images/favicon.ico"/>" />

<!-- bootstrap 样式表,由于该文件对所有html标签进行了全局样式定义,请务必保证此文件首先引入 -->
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/bootstrap.min.css">
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/todc-bootstrap.css">

<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/style.css">
<link type="text/css" rel="stylesheet" href="${ctx}/framework/portal/css/table.css">
<!-- 在此处引入amchart的js文件子页面无法生效,原因未知 -->
<script type="text/javascript">
</script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/common.js"></script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/selectInput.js"></script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${ctx}/framework/portal/scripts/calendar/WdatePicker.js"></script>
<!-- amchart 基础包 -->
<script type="text/javascript" src="${ctx}/framework/portal/scripts/amchart/swfobject.js"></script>
<title><decorator:title /> | <fmt:message key="webapp.name" /></title>
<decorator:head />

</head>
<body>
	<decorator:getProperty property="body.id" writeEntireProperty="true"/>
	<decorator:getProperty property="body.class" writeEntireProperty="true"/>

	<decorator:body />
</body>
</html>
