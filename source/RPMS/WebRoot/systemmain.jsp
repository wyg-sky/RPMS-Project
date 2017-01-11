<%@ page language="java" pageEncoding="UTF-8" import="java.util.*"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<SCRIPT LANGUAGE="javascript">
	function show_main() {
		window.opener=null;	
		window.open('desktop.jsp',"amin","fullscreen=0,width="+(screen.availWidth-8)+",height="+(screen.availHeight-34)+",toolbar =0, menubar=0, scrollbars=1, resizeable=0, location=0, status=0");
		window.open('','_self');	
		setTimeout(function(){window.close();}, 500);
	}
	show_main();
</script>