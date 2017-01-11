<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	.introduction {
		background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;color:#0f4d8e;font-size:13px;text-align: center; width: 32%; height: 120px; display: inline-table;float:left;
	}
	.introduction p {margin: 10px auto; width: 260px; text-align: left;font-size:13px;line-height:20px;}
	.introduction p span{display:block;text-align:center;width: 100%;}
	.introduction:hover {background: #DFE8F6;cursor:pointer;}
</style>
<script>
	var welcomSet = new Ext.form.FieldSet({
		layout : 'form',
		autoHeight : true,
		border : true,
		bodyStyle: 'background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;',
		title: '<font color="red">W</font>elcome',
		html: '<div onmouseover="style.backgroundColor=\'#DFE8F6\'" onmouseout="style.backgroundColor=\'#FFFFFF\'" style="text-align: left; height: 85px;line-height:85px;color:#0f4d8e;font-size:25px;font-family:华文行楷;"><img style="height:80px;vertical-align:middle;padding-left: 5px;" src="images/head/index_icon.png"/>&nbsp;&nbsp;&nbsp;&nbsp;' + FW.userName + ',欢迎使用</div>'
	});
	
	var basicSet = new Ext.form.FieldSet({
		layout : 'form',
		autoHeight : true,
		border : true,
		//bodyStyle: 'background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;',
		title: '<font color="red">I</font>ntroduction',
		html: '<div onmouseover="style.backgroundColor=\'#DFE8F6\'" onmouseout="style.backgroundColor=\'#FFFFFF\'" style="cursor:pointer;background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;color:#0f4d8e;font-size:13px;text-align: center; width: 32%; height: 125px; display: inline-table;float:left;"><p style="margin: 10px auto; width: 180px; text-align: left;line-height:20px;"><span style="display:block;text-align:center;width: 100%;font-size: 15px;font-weight:bold;line-height: 25px;">个人信息</span>登录姓名：' + FW.userName + '<br>所在单位：' + FW.organizationName + '<br>所在部门：' + FW.departmentName + '<br>IP地址：<%=request.getRemoteAddr()%></p></div>' + 
		'<div onmouseover="style.backgroundColor=\'#DFE8F6\'" onmouseout="style.backgroundColor=\'#FFFFFF\'" style="cursor:pointer;background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;color:#0f4d8e;font-size:13px;text-align: center; width: 32%; height: 125px; display: inline-table;float:left;margin-left: 16px;"><p style="margin: 10px auto; width: 220px; text-align: left;line-height:20px;"><span style="display:block;text-align:center;width: 100%;font-size: 15px;font-weight:bold;line-height: 25px;">软件信息</span>系统版本：CIMS v1.0<br>操作系统：WindowXp、Unix、Linux<br>开发语言：JAVA JDK1.6及以上版本<br>浏览器IE8.0、谷歌5.0、火狐11.0及以上版本</p></div>' + 
		'<div onmouseover="style.backgroundColor=\'#DFE8F6\'" onmouseout="style.backgroundColor=\'#FFFFFF\'" style="cursor:pointer;background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;color:#0f4d8e;font-size:13px;text-align: center; width: 32%; height: 125px; display: inline-table;float:left;margin-left: 16px;"><p style="margin: 10px auto; width: 220px; text-align: left;line-height:20px;"><span style="display:block;text-align:center;width: 100%;font-size: 15px;font-weight:bold;line-height: 25px;">版权信息</span>系统名称：' + FW.moduleTitle + '<br>使用单位：' + FW.organizationName + '<br>版权所有：山东新矿信息技术有限公司<br>研发厂商：<a href="http://dhcc.com.cn" target="_blank">山东新矿信息技术有限公司 </a></p></div>'
	});
	
	var basicInfo = new Ext.form.FieldSet({
		layout : 'form',
		autoHeight : true,
		border : true,
		bodyStyle: 'background:#ffffff;border-style : dashed;border-color : #aaaaaa;border-width : 1px;border-radius: 5px;',
		title: '<font color="red">A</font>nnouncement',
		html: '<div onmouseover="style.backgroundColor=\'#DFE8F6\'" onmouseout="style.backgroundColor=\'#FFFFFF\'" style="height: 150px; padding-top: 12px; padding-left: 20px;color:#0f4d8e;font-size:13px;line-height: 28px;text-align:left;">' + 
			'<font color="red">☆</font> 为了保证系统的正常使用，首次登陆时，设置浏览器的弹出窗口阻止程序，添加系统站点，并在兼容模式下运行本系统; <br>'+
			'<font color="red">☆</font> 系统兼容的浏览器有IE8.0、谷歌5.0、火狐11.0及以上版本; <br>' +
			'<font color="red">☆</font> 如有问题请及时联系管理员 ; <br>' +
			'<font color="red">☆</font> 山东新矿信息技术有限公司感谢您的配合; <br>' +
			'<font color="red">☆</font> 诚信立业，共创未来。山东新矿信息与您携手共进，共创美好未来！ <br>' +
			'</div>'
	});

	var panel = new Ext.Panel({
		renderTo: 'system_main',
		title: '<img style="vertical-align:middle;" src="styles/default/images/icons/16_16/view-all.gif">&nbsp;欢迎页',
		layout: 'fit',
		bodyStyle: 'padding: 10px;background-image: url(images/head/default_bg.png);',
		height: FW.winHeight - FW.topHeight,
		border: true,
		items : [
			new Ext.Panel({autoHeight:true}),welcomSet, basicSet, basicInfo
		]
	});
</script>
</head>
<body>
<div id="system_main">
</div>
</body>
</html>