package com.lion.rpms.base.platorganization.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.common.model.AuditableEntity;
import com.lion.system.organization.model.Organization;

@Entity
@Table(name = "ITSM_ORGANIZATION")
@ModelProp(symbol = "单位")
@FilterDef(name = "organizationFilter", parameters = { @ParamDef(name = "valid", type = "string") })
public class Platorganization extends AuditableEntity implements Serializable {
	private static final long serialVersionUID = 7942414360055750182L;
	private Organization parent;
	private String code;
	private String sapCode;
	private String name;
	private ResearchPlat platCenter; //分中心;
	private String organiztionType;
	private boolean leaf;
	private int grade;
	private String valid;
	private int sortOrder;
	private String description;
	private Set<Organization> children = new HashSet();
	private boolean expanded = false;
	private boolean disabled = false;

	@Column(name = "CODE", unique = true, nullable = true, insertable = true, updatable = true, length = 50)
	@FieldProp(symbol = "单位编码", desc = "")
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "SAP_CODE", unique = true, length = 50)
	@FieldProp(symbol = "SAP编码", desc = "")
	public String getSapCode() {
		return this.sapCode;
	}

	public void setSapCode(String sapCode) {
		this.sapCode = sapCode;
	}

	@Column(name = "NAME", unique = false, nullable = false, insertable = true, updatable = true, length = 50)
	@FieldProp(symbol = "单位名称", desc = "")
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getPlatCenter(){
		return platCenter; 
	}
	
	public void setPlatCenter(ResearchPlat platCenter){
		this.platCenter=platCenter;
	}

	@Column(name = "ORGANIZATION_TYPE", unique = false, nullable = true, insertable = true, updatable = true, length = 4)
	@FieldProp(symbol = "组织类型", desc = "")
	public String getOrganiztionType() {
		return this.organiztionType;
	}

	public void setOrganiztionType(String organiztionType) {
		this.organiztionType = organiztionType;
	}

	@Column(name = "sortorder", unique = false, nullable = false, insertable = true, updatable = true, length = 32)
	@FieldProp(symbol = "组织排序", desc = "")
	public int getSortOrder() {
		return this.sortOrder;
	}

	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PARENT")
	public Organization getParent() {
		return this.parent;
	}

	public void setParent(Organization parent) {
		this.parent = parent;
	}

	@OneToMany(mappedBy = "parent", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	@OrderBy("sortOrder asc")
	@Filter(name = "organizationFilter", condition = ":valid=VALID")
	public Set<Organization> getChildren() {
		return this.children;
	}

	public void setChildren(Set<Organization> children) {
		this.children = children;
	}

	@Column(name = "DESCRIPTION", unique = false, nullable = true, insertable = true, updatable = true)
	@FieldProp(symbol = "单位描述", desc = "")
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "LEAF", unique = false, nullable = true, insertable = true, updatable = true)
	@FieldProp(symbol = "是否叶子节点", desc = "")
	public boolean getLeaf() {
		return this.leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	@Column(name = "GRADE", unique = false, nullable = true, insertable = true, updatable = true)
	@FieldProp(symbol = "级数", desc = "")
	public int getGrade() {
		return this.grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	@Column(name = "VALID", unique = false, nullable = true, insertable = true, updatable = true)
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return this.valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}

	@Transient
	public boolean getExpanded() {
		return this.expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	@Transient
	public boolean getDisabled() {
		return this.disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public int hashCode() {
		boolean result = false;
		int result1 = this.parent != null ? this.parent.hashCode() : 0;
		result1 = 31 * result1 + (this.code != null ? this.code.hashCode() : 0);
		result1 = 31 * result1 + (this.name != null ? this.name.hashCode() : 0);
		return result1;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer(this.getClass().getSimpleName());
		sb.append(" [");
		sb.append("id").append("=\'").append(this.getId()).append("\', ");
		sb.append("parent").append("=\'").append(this.getParent()).append("\', ");
		sb.append("code").append("=\'").append(this.getCode()).append("\', ");
		sb.append("name").append("=\'").append(this.getName()).append("\', ");
		sb.append("description").append("=\'").append(this.getDescription()).append("\', ");
		return sb.toString();
	}
}
