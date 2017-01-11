<%@ page language="java" pageEncoding="UTF-8"%>	
<script language="javascript">
function goPage(p){
	var formArg = document.getElementsByTagName("form");
	if(formArg && formArg.length > 1) {
		var limit = formArg[1].limit.value;
		var start = (p-1)* limit;
		formArg[1].start.value=start;		
		formArg[1].submit();
	}
}
</script>
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
	//System.out.println(iEnd);
%>
	
	<input type="hidden" name="start"  value=""/>
	<input type="hidden" name="limit"  value="<%=limit%>"/>
	<table align="center" width="99%" border="0" cellpadding="0" cellspacing="0">
	<tr>
	<td width="60%">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
			<td><span class="fy">
				<%if(iCurr_page>1){%>
					<a href="#" onclick="goPage(1)">首页</a>
					<a href="#" onclick="goPage('<%=(iCurr_page-1)%>')">上一页</a>
				<%}%>
				<%if(iCurr_page==1){%>
					首页
					上一页
				<%}%>
				第<%=iCurr_page%>页,
				共<%=iAll_page%>页
				<%if(iCurr_page < iAll_page){%>
					<a href="#" onclick="goPage('<%=(iCurr_page+1)%>')">下一页</a>
					<a href="#" onclick="goPage('<%=iAll_page%>')">末页</a>
				<%}%>
				<%if(iCurr_page == iAll_page){%>
					下一页
					末页
				<%}%>
				</span>
			</td></tr>
		</table>
	</td>
	<td width="40%">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr><td align="right">显示第<%=(iStart)%>到<%=(iEnd)%>条,共<%=total%>条
			</tr>
		</table>
	</td>
	</tr>
	</table>