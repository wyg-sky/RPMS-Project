<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.net.*" %>
<script language="JavaScript" type="text/javascript">
var type = "<%= null == request.getParameter("type") || request.getParameter("type")==""?"":URLDecoder.decode(request.getParameter("type"),"UTF-8")%>";
    Ext.lion.ScriptLoader('rpms/research/projectacceptance/ProjectAcceptanceManager.js', false);
    new Ext.lion.rpms.ProjectAcceptanceManager({
        viewPath : 'rpms/research/projectacceptance/list',
        type : type,
        acceptanceT : true,
        inputinto : true
    });
</script>
