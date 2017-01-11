<uicfg desc="${generateInfo.moduleName}列表">
	<objectName name="名称">businessObject</objectName>
	<orderBy name="排序方式">id asc</orderBy>
	<rownum name="是否显示行号" type="boolean">true</rownum>
	<editable name="是否允许列编辑" type="object">true</editable>
	<store>
		<url name="数据来源Url">${generateInfo.systemName}/list${generateInfo.className}.html</url>
	</store>
	<sm>
		<xtype name="smxtype">checkboxsm</xtype>
		<singleSelect name="是否单选" type="boolean">false</singleSelect>
	</sm>
	<cm>
		<defaults>
			<sortable name="是否排序" type="boolean">true</sortable>
		</defaults>
	</cm>
</uicfg>
