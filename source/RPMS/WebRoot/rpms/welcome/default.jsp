<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
.introduction {
	background: #ffffff;
	border-style: dashed;
	border-color: #aaaaaa;
	border-width: 1px;
	border-radius: 5px;
	color: #0f4d8e;
	font-size: 13px;
	text-align: center;
	width: 32%;
	height: 120px;
	display: inline-table;
	float: left;
}

.introduction p {
	margin: 10px auto;
	width: 260px;
	text-align: left;
	font-size: 13px;
	line-height: 20px;
}

.introduction p span {
	display: block;
	text-align: center;
	width: 100%;
}

.introduction:hover {
	background: #DFE8F6;
	cursor: pointer;
}
</style>
<script>
	var welcomeHight = FW.winHeight - FW.topHeight;
	
	var showPanel = new Ext.Container({
		layout:"hbox",
		autoHeight:true,
		defaults : {//每个展示区域默认样式
			autoScroll : true,
			xtype : "panel",
			height :315,
			flex:1,
			frame : true,
			margins : {
				top : 0,
				right : 10,	
				bottom : 0,
				left : 0
			}
		},
		items : [ {
			title : '通知公告',
			autoLoad : {
		        url : 'rpms/welcome/projectnotice/projectnotice.jsp', 
		        scope : this, 
		        scripts : true
	    	}
		}, {
			title : '项目动态',
			autoLoad : {
		        url : 'rpms/welcome/projectstatus/projectstatus.jsp', 
		        scope : this, 
		        scripts : true
	    	}
		}, {
			title : '成果展示',
			autoLoad : {
		        url : 'rpms/welcome/projectachievement/projectachievement.jsp', 
		        scope : this, 
		        scripts : true
	    	}
		} ]
	});
	
	var introduction = new Ext.form.FieldSet({
		layout : 'form',
		autoHeight : true,
		border : true,
		width:'97%',
		bodyStyle: 'background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;',
		title: '<font size="5">中心简介</font>',
		html: '<div onmouseover="style.backgroundColor=\'#DFE8F6\'" onmouseout="style.backgroundColor=\'#FFFFFF\'" style="height: 180px; padding-top: 12px; padding-left: 20px;color:#0f4d8e;font-size:13px;line-height: 28px;text-align:left;">' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新矿集团国家认定企业技术中心建立了以技术委员会为决策层，以专家委员会为'+
			'咨询层，以技术研发部为管理层，以各研究所和大专院校、科研院所校企共建的'+
			'研发机构，为技术开发层的技术创新体系。</br>'+
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在集团公司领导下承担技术研发管理职能、技术研发平台建设职能、技术研发职'+
			'能、技术研发服务职能、人才培养职能。负责集团公司技术研发体系、技术研发'+
			'、机构建设等工作。'+
			'</div>'
	});
	
	var panel = new Ext.Panel({
		renderTo : 'system_main',
		title : '<img style="vertical-align:middle;" src="styles/default/images/icons/16_16/view-all.gif">&nbsp;欢迎页',
		bodyStyle : 'padding: 5px;background-image: url(images/head/default_bg.png);',
		height : FW.winHeight - FW.topHeight,
		border : true,
		layout : 'fit',
		autoScroll : true,
		items : [showPanel, introduction]

	});
</script>
</head>
<body>
	<div id="system_main"></div>
</body>
</html>