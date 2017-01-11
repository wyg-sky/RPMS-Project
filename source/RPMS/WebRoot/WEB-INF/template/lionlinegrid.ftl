<uicfg desc="${generateInfo.moduleName}列表">
	<objectName name="名称">businessObject</objectName>
	<orderBy name="排序方式">id asc</orderBy>
	<rownum name="是否显示行号" type="boolean">true</rownum>
	<showLookButton name="是否显示查看按钮" type="object">false</showLookButton>
	<showEditButton name="是否显示编辑按钮" type="object">false</showEditButton>
	<showCopyButton name="是否显示复制按钮" type="object">false</showCopyButton>
	<editable name="是否允许列编辑" type="object">false</editable>
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
