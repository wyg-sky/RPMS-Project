<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.net.*" %>
<script language="JavaScript" type="text/javascript">
    var type = "<%= null == request.getParameter("type") || request.getParameter("type")==""?"":URLDecoder.decode(request.getParameter("type"),"UTF-8")%>";
	Ext.lion.ScriptLoader('rpms/research/identifyaudit/IdentifyAuditManager.js', false);
	new Ext.lion.rpms.IdentifyAuditManager({
		viewPath : 'rpms/research/identifyaudit/list',
		 type : type
	});
</script>
