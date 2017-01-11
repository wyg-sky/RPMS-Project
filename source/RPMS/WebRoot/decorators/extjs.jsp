<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.lion.system.Constants,com.lion.system.framework.model.LoginInfo"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ include file="/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<%
	String cssUrl = "/ext/resources/css/xtheme-itsm.css";
	LoginInfo info = (LoginInfo)session.getAttribute(Constants.LOGININFO);
	if(info.getSystemCss() != null && !"".equals(info.getSystemCss())) {
		cssUrl = info.getSystemCss();
	}
%>
<head>
	<%@ include file="/common/meta.jsp"%>
	<title>国家企业技术中心信息管理平台|<%=(String)session.getAttribute(Constants.MODULETITLE)%></title>
	
	<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
	<link href="<c:url value='/ext/resources/css/ext-all.css'/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value='/ext/resources/css/ext-extension.css'/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value='/styles/style-default.css'/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value='<%=cssUrl%>'/>" rel="stylesheet" type="text/css" />
		
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-base.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-all.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-basex.js'/>"></script>
	
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-lion.js'/>"></script>
	<script language="JavaScript" type="text/javascript" src="<c:url value='/ext/ext-util.js'/>"></script>
	

	<script type="text/javascript" src="<c:url value='/ext/ext-lang-zh_CN.js'/>" charset="utf-8"></script>
	<script type="text/javascript" src="<c:url value='/scripts/locale/fvsd-lang_zh_CN.js'/>" charset="utf-8"></script>
	
	<script language="JavaScript" type="text/javascript">
		Ext.BLANK_IMAGE_URL = "<c:url value='/ext/resources/images/default/s.gif'/>";
		$ctx = '${ctx}/';
	</script>
	<decorator:head />
</head>
<body 
	<decorator:getProperty property="body.id" writeEntireProperty="true"/> 
	<decorator:getProperty property="body.class" writeEntireProperty="true"/>
	<decorator:getProperty property="body.onload" writeEntireProperty="true"/>>
	
	<decorator:body />
</body>
</html>

