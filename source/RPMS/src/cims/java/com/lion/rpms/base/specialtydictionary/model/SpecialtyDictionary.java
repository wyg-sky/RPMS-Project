package com.lion.rpms.base.specialtydictionary.model;

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

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.FilterDef;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * @description ：专业词典Model
 * @date ： 2015-03-10 09:05:39
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_SPECIALTY_DICTIONARY")
@ModelProp(symbol = "专业词典")
@FilterDef(name="specialtydictionaryFilter", parameters={@org.hibernate.annotations.ParamDef(name="valid", type="string")})
public class SpecialtyDictionary extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String specialtyCode;	//专业编号
	private String specialtyName;	//专业名称
	private SpecialtyDictionary parent;	//父节点
	private String valid;	//是否有效
	private String remark;	//备注
	private Organization checkOrganization;//关联单位
	private Set<SpecialtyDictionary> children = new HashSet<SpecialtyDictionary>();

	public SpecialtyDictionary(){}

	@Column(name = "SPECIALTY_CODE")
	@FieldProp(symbol = "专业编号", desc = "")
	public String getSpecialtyCode() {
		return specialtyCode;
	}
	public void setSpecialtyCode(String specialtyCode) {
		this.specialtyCode = specialtyCode;
	}

	@Column(name = "SPECIALTY_NAME")
	@FieldProp(symbol = "专业名称", desc = "")
	public String getSpecialtyName() {
		return specialtyName;
	}
	public void setSpecialtyName(String specialtyName) {
		this.specialtyName = specialtyName;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PARENT")
	@FieldProp(symbol = "父节点", desc = "")
	public SpecialtyDictionary getParent() {
		return parent;
	}
	public void setParent(SpecialtyDictionary parent) {
		this.parent = parent;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}
	
	
	@OneToMany(mappedBy = "parent", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@OrderBy(value = "specialtyCode asc")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public Set<SpecialtyDictionary> getChildren() {
		return children;
	}

	public void setChildren(Set<SpecialtyDictionary> children) {
		this.children = children;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "CHECK_ORGANIZATION")
	@FieldProp(symbol = "关联单位", desc = "")
	public Organization getCheckOrganization() {
		return checkOrganization;
	}

	public void setCheckOrganization(Organization checkOrganization) {
		this.checkOrganization = checkOrganization;
	}

	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
