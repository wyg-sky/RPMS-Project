<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.net.*" %>
<script language="JavaScript" type="text/javascript">
    var type = "<%= null == request.getParameter("type") || request.getParameter("type")==""?"":URLDecoder.decode(request.getParameter("type"),"UTF-8")%>";
	Ext.lion.ScriptLoader('rpms/research/reviewaudit/ReviewAuditManager.js', false);
	new Ext.lion.rpms.ReviewAuditManager({
		viewPath : 'rpms/research/reviewaudit/list',
		 type : type
	});
</script>
