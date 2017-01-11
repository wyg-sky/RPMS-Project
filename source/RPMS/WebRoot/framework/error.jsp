<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<page:applyDecorator name="default">
<%
	String requestContextPath = request.getContextPath();
%>
<head>
    <title><fmt:message key="403.title"/></title>
    <meta name="heading" content="<fmt:message key='403.title'/>"/>
    <link rel="stylesheet" type="text/css" media="all" href="<c:url value='/styles/${appConfig["csstheme"]}/error.css'/>" />
</head>
<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center"><table width="200" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td><table width="200" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td><img src="<%=requestContextPath%>/images/403_01.jpg" width="460" height="3"></td>
            </tr>
            <tr>
              <td height="85" align="center" background="<%=requestContextPath%>/images/403_02.jpg">
              <span class="style1">
				系统错误，请联管理员！
				</span></td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td height="225" align="center" bgcolor="#FFFFFF"><img src="<%=requestContextPath%>/images/403.jpg" width="441" height="205"></td>
      </tr>
      <tr>
        <td align="center" bgcolor="#FFFFFF"><table width="441" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td height="1" bgcolor="#dbdbdb"></td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td height="35" align="center" bgcolor="#FFFFFF" class="p12_black">
        <a href="javascript:history.go(-1)"><fmt:message key='errors.message.back'/></a> | 
        <a href="<c:url value='/login.jsp?autoLogin=0'/>"><fmt:message key='errors.message.login'/></a> 
        
      </tr>
      <tr>
        <td><img src="<%=requestContextPath%>/images/403_09.jpg" width="460" height="3"></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</page:applyDecorator>
