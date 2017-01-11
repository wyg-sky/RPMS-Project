<uicfg desc="${generateInfo.moduleName}编辑">
	<objectName name="对象名称">businessObject</objectName>
	<loadtUrl name="加载数据Url">${generateInfo.systemName}/load${generateInfo.className}.html</loadtUrl>
	<submitUrl name="提交表单Url">${generateInfo.systemName}/save${generateInfo.className}.html</submitUrl>
	<columns name="列数" type="object">2</columns>
	<editable name="是否可编辑" type="object">true</editable>
	<defaultFocusIndex name="焦点位置">-1</defaultFocusIndex>
</uicfg>