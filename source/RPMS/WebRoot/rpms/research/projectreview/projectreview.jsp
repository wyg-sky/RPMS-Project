<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.net.*" %>
<script language="JavaScript" type="text/javascript">
var type = "<%= null == request.getParameter("type") || request.getParameter("type")==""?"":URLDecoder.decode(request.getParameter("type"),"UTF-8")%>";
    Ext.lion.ScriptLoader('rpms/research/projectreview/ProjectReviewManager.js', false);
    new Ext.lion.rpms.ProjectReviewManager({
        viewPath : 'rpms/research/projectreview/list',
        type : type,
        acceptanceT : true,
        approve : true,
        inputinto : true
    });
</script>
