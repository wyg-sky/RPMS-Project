<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<%@ page import="com.lion.system.Constants" %>
<%@ page import="com.lion.system.user.model.User" %>
<%@ page import="com.lion.system.department.model.Department" %>
<%@ page import="com.lion.system.organization.model.Organization" %>
<%@ page import="com.lion.system.framework.listener.OnLineUser" %>
<%@ page import="com.lion.system.framework.model.LoginInfo" %>
<%@ page import="com.lion.rpms.common.PlatCenterUtil" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    User user = (User)session.getAttribute(Constants.USER_AUTH);
    Department department = (Department)session.getAttribute(Constants.USER_DEPARTMENT);
    Organization organization = (Organization)session.getAttribute(Constants.USER_ORGANIZATION);
    String noticeTypeCode = (String)session.getAttribute(Constants.USER_NOTICETYPE);
   
    String moduleId = (String)session.getAttribute(Constants.MODULEIDS);
    String moduleTitle = (String)session.getAttribute(Constants.MODULETITLE);
    String moduleJs = (String)session.getAttribute(Constants.MODULEJS);
    String user_xingMing = "", user_id = "", user_name = "", user_version="", department_name = "", department_id = "", organization_name = "", organization_id = "";
    if(user != null) {
        user_xingMing = user.getUserName();
        user_id = user.getId();
        user_name = user.getLoginName();
        user_version = user.getVersion()+"";
    }
    
    if(department != null) {
        department_name = department.getName();
        department_id = department.getId();
    }
    
    if(organization != null) {
        organization_name = organization.getName();
        organization_id = organization.getId();
    }
    
	LoginInfo info = (LoginInfo)session.getAttribute(Constants.LOGININFO);
	String cssCode = "21";
	if(info.getCssCode() != null && !"".equals(info.getCssCode())) {
		cssCode = info.getCssCode();
	}
%>

<%
	String[] center = PlatCenterUtil.getCurrentCenter(session);
%>
	<style>
	<%if(cssCode.startsWith("1")) {%>
		html, body {
			background:#3d71b8 url(framework/desktop/images/wallpapers/desktop<%=cssCode %>.jpg) no-repeat left top;
		}
	<%} else {%>
		.topbk {
			background: url(images/head/back<%=cssCode %>.jpg) no-repeat left top;
			min-height: 48px;
		}
	<%}%>
	</style>
	<script>
<%  if(user == null) {
%>
		window.location.href = '<%=basePath%>login.jsp';
<%  }%>

	var PlatUtil = PlatUtil || {};
	PlatUtil.currentCenterId = '<%=center[0] %>';
	PlatUtil.currentCenterName = '<%=center[1] %>';
	
	</script>
    <script type="text/javascript" src="${ctx}/framework/loadPrivileges.html"></script>
	<script type="text/javascript" src="${ctx}/framework/common/FrameWork.js" charset="utf-8"></script>
    <script type="text/javascript" src="${ctx}/scripts/pushlet/ajax-pushlet-client.js"></script>
