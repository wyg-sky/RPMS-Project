<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%
	String title = request.getParameter("title");
	String content = request.getParameter("content");
	String tdate = request.getParameter("tdate");
	String noticePerson = request.getParameter("noticePerson");
%>

<head>
<title>通知</title>
	<style type="text/css">
		ul li { list-style-type:none; } 
	</style>
</head>

<body>
	<div align="center"> <ul><li style="color: red;font-size: 24px; ">通知</li></ul></div>
	<hr width="100%" style="border:2px solid red;"/>
	<div>
		<ul>
			<li style="text-align: center"><font color='red' size='5'><%=title%></font></li>
			<li >&nbsp;</li>
			<li>通知:</li>
			<li>
				&nbsp;&nbsp;&nbsp;&nbsp;<font color='red' size='3'><%=content%></font>
			</li>
			<li >&nbsp;</li>
			<li >&nbsp;</li>
			<li style="float: right;margin-right: 100px">
				<%=noticePerson%><br>
				<%=tdate%><br>
			</li>
		</ul>
	</div>
</body>
</html>
