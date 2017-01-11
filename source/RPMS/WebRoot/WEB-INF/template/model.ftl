package com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model;

import java.io.Serializable;
<#if haveBigDecimalColumn == "1">
import java.math.BigDecimal;
</#if>
<#if haveChildren == "1">
import java.util.ArrayList;
</#if>
<#if haveDateColumn == "1">
import java.util.Date;
</#if>
<#if haveChildren == "1">
import java.util.List;
</#if>

<#if haveObjectColumn == "1" || haveChildren == "1">
import javax.persistence.CascadeType;
</#if>
import javax.persistence.Column;
import javax.persistence.Entity;
<#if haveObjectColumn == "1" || haveChildren == "1">
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
</#if>
<#if haveObjectColumn == "1">
import javax.persistence.ManyToOne;
</#if>
<#if haveChildren == "1">
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
</#if>
import javax.persistence.Table;
<#if haveTransientColumn == "1">
import javax.persistence.Transient;
</#if>
<#if haveVersionColumn == "1">
import javax.persistence.Version;
</#if>

<#if haveChildren == "1">
import org.hibernate.annotations.Cascade;

</#if>
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
<#if extendsOrNot == "1">
import ${generateInfo.extendsClassPath};
</#if>
<#if haveObjectColumn == "1">
<#list importList as import>
import ${import};
</#list>
</#if>

/**
 * @description : ${generateInfo.classRemark}
 * @date : ${generateInfo.createDate}
 * @author : ${generateInfo.createUser}
 */
@Entity
@Table(name = "${generateInfo.tableName}")
@ModelProp(symbol = "${generateInfo.classRemark}")
public class ${generateInfo.className} <#if extendsOrNot == "1">extends ${extendsClass} </#if>implements Serializable {
	private static final long serialVersionUID = 1L;
	
	<#if havaColumn == "1">
	<#list columnList as column>
	<#if column.columnName == "VERSION">
	private Integer version;//版本
	<#else>
	private ${column.javaType} ${column.javaName};//${column.noteName}
	</#if>
	</#list>
	</#if>
	<#if haveChildren == "1">
	<#list childrenList as child>
	<#assign paramName = child.className?uncap_first>
	private List<${child.className}> ${paramName} = new ArrayList<${child.className}>();
	</#list>
	</#if>
	
	public ${generateInfo.className}() {}
	<#if havaColumn == "1">
	<#list columnList as column>
	<#if column.columnName == "VERSION">
	
	@Version
	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
	<#else>
	<#if column.isObject == "1">
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "${column.columnName}")
	<#else>
	<#if column.columnName == "">
	
	@Transient
	<#else>
	
	@Column(name = "${column.columnName}"<#if column.unique == "1">, unique = true</#if>)
	</#if>
	</#if>
	@FieldProp(symbol = "${column.noteName}")
	<#assign methodName = column.javaName?cap_first>
	public ${column.javaType} get${methodName}() {
		return ${column.javaName};
	}
	
	public void set${methodName}(${column.javaType} ${column.javaName}) {
		this.${column.javaName} = ${column.javaName};
	}
	</#if>
	</#list>
	</#if>
	<#if haveChildren == "1">
	<#list childrenList as child>
	<#assign paramName = child.className?uncap_first>
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "${child.linkColumn}")
	@OrderBy(value = "${child.sortColumn} ${child.orderByType}")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<${child.className}> get${child.className}() {
		return ${paramName};
	}
	
	public void set${child.className}(List<${child.className}> ${paramName}) {
		this.${paramName} = ${paramName};
	}
	</#list>
	</#if>
	
	@Override
	public boolean equals(Object o) {
		return false;
	}
	
	@Override
	public int hashCode() {
		return 0;
	}
	
}
