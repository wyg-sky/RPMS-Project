<%@ page language="java" pageEncoding="UTF-8"%>	
<%@ include file="/common/taglibs.jsp"%>
<%
	String total = ""+ request.getAttribute("total");		//总记录条数
	if (total == null || total.length() ==0 || total.equalsIgnoreCase("null")) {
		total = "0";
	}
	int iTotal = Integer.parseInt(total);				
	String start = ""+request.getAttribute("start");		//起始记录数
	if (start == null || start.length() ==0 || start.equalsIgnoreCase("null")) {
		start = "0";
	}	
	int iStart =Integer.parseInt(start)+1;				
	String limit = ""+ request.getAttribute("limit"); 		//每页多少条记录
	if (limit == null || limit.length() ==0 || limit.equalsIgnoreCase("null")) {
		limit = "20";
	}
	int iLimit =Integer.parseInt(limit);
	
	int iCurr_page = 1;	           //当前页
	if (iStart >= iLimit){
		iCurr_page = iStart/iLimit+1;	
	}
	
	int iAll_page = (iTotal+iLimit-1)/iLimit;				//所有页
	int iEnd = iStart+iLimit-1;					    //结束记录数
	if (iEnd > iTotal) {
		iEnd = iTotal;
	}
%>
	
<input type="hidden" name="start" id="start" value=""/>
<input type="hidden" name="limit" id="limit" value="<%=limit%>"/>
<div class="paggingdiv">
	<ul class="pagging" style="float: left;" >
		<% if(iCurr_page>1){ %>
			<li>
				<a href="#" onclick="goPage('1')">首页</a>
			</li>
			<li>
				<a href="#" onclick="goPage('<%=iCurr_page-1%>')">上一页</a>
			</li>
		<%} %>
		<% if(iCurr_page==1){ %>
			<li>
				<a href="#">首页</a>
			</li>
		<%} %>
		<li>
			<label>第<%=iCurr_page%>页</label>
		</li>
		<li>
			<label>共&nbsp;<%=iAll_page%>&nbsp;页</label>
		</li>
		<% if(iCurr_page < iAll_page){ %>
			<li>
				<a href="#" onclick="goPage('<%=iCurr_page+1%>')">下一页</a>
			</li>
			<li>
				<a href="#" onclick="goPage('<%=iAll_page%>')">末页</a>
			</li>
		<%} %>
		<% if(iCurr_page == iAll_page){ %>
			<li>
				<a href="#">下一页</a>
			</li>
			<li>
				<a href="#">末页</a>
			</li>
		<%} %>
	</ul>
	<div>
		<ul class="pagging" style="float: right;">
			<li>
				<label>显示第<%=iStart%>到<%=iEnd%>条</label>
			</li>
			<li>
				<label>共<%=total%>条</label>
			</li>
		</ul>
	</div>
</div>
