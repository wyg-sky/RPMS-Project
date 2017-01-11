<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
	String uuid = request.getParameter("uuid");
	pageContext.setAttribute("uuid", uuid);
%>

<script type='text/javascript'>

if(typeof _basePath == "undefined") var _basePath = "<%=basePath %>";
	
Ext.onReady(function(){
				
	Ext.QuickTips.init();
				
	Ext.lion.ScriptLoader("ext/extension/ComboWindow.js",
		"ext/extension/RadioGroup.js",
		"ext/extension/CheckBoxGroup.js",
		"scripts/util/RequestUtil.js",
		"scripts/util/flow.js");

				
	if(typeof request == 'undefined')var request = new RequestUtil();
				
	var p_8a8a18bf258c273701258c625d750008_${uuid} = new Ext.Panel({
		el:'p_8a8a18bf258c273701258c625d750008_${uuid}',
		border:false,
		bodyBorder:false,
		autoHeight:true,
		autoWidth:true,
		items: [{
			id : "${uuid}transitionFields",
			autoHeight : true,
			autoWidth : true,
			xtype : "fieldset",
			bodyStyle : "padding:5px 0 0 0",
			style : "border:0px;",
			items : [{
			    xtype : "hidden",
			    id : "${uuid}_flowTrAction",
			    name : "_flowTrAction",
			    value : "commom_endCooperation"
			  },{
			    width : "98%",
			    layout : "form",
			    border : false,
			    items : [{
			        id : "${uuid}comment",
			        xtype : "textarea",
			        anchor : "99%",
			        fieldLabel : "备注",
			        name : "comment"
			      }]
			  }],
			layout : "column"
		}]
	});
	
    p_8a8a18bf258c273701258c625d750008_${uuid}.render();
        				
});
				
</script>
<div id='p_8a8a18bf258c273701258c625d750008_${uuid}'></div>			
