package com.lion.rpms.base.researchplat.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description ：创新平台管理Model
 * @date ： 2015-03-06 13:18:28
 * @author ：WangYG
 */
@Entity
@Table(name = "RPMS_RESEARCH_PLAT")
@ModelProp(symbol = "创新平台管理")
@FilterDef(name = "researchplatFilter", parameters = { @org.hibernate.annotations.ParamDef(name = "valid", type = "string") })
public class ResearchPlat extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String platCode; // 机构编号
	private String platName; // 机构名称
	private String hierarchy; // 创新层级
	private ResearchPlat parent; // 父节点;
	private String grade; // 等级
	private SpecialtyDictionary specialty; // 专业
	private String approvalDept; // 批准部门
	private String fileCode; // 文件名称编号
	private String approvalTime; // 批准时间
	private String platType; // 平台类型
	private String description; // 平台描述
	private Organization organization; // 组织单位
	private String valid; // 是否有效,0:无效,1:有效,缺省为0
	private String remark; // 备注
	private Set<ResearchPlat> children = new HashSet<ResearchPlat>();
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	private String actionM;
	
	public ResearchPlat() {
	}

	@Transient
	public String getActionM() {
		return actionM;
	}

	public void setActionM(String actionM) {
		this.actionM = actionM;
	}

	@Column(name = "PLAT_CODE")
	@FieldProp(symbol = "机构编号", desc = "")
	public String getPlatCode() {
		return platCode;
	}

	public void setPlatCode(String platCode) {
		this.platCode = platCode;
	}

	@Column(name = "PLAT_NAME")
	@FieldProp(symbol = "机构名称", desc = "")
	public String getPlatName() {
		return platName;
	}

	public void setPlatName(String platName) {
		this.platName = platName;
	}

	@Column(name = "HIERARCHY")
	@FieldProp(symbol = "创新层级", desc = "")
	public String getHierarchy() {
		return hierarchy;
	}

	public void setHierarchy(String hierarchy) {
		this.hierarchy = hierarchy;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PARENT")
	@FieldProp(symbol = "父节点", desc = "")
	public ResearchPlat getParent() {
		return parent;
	}

	public void setParent(ResearchPlat parent) {
		this.parent = parent;
	}

	@Column(name = "GRADE")
	@FieldProp(symbol = "等级", desc = "")
	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "SPECIALTY")
	@FieldProp(symbol = "专业", desc = "")
	public SpecialtyDictionary getSpecialty() {
		return specialty;
	}

	public void setSpecialty(SpecialtyDictionary specialty) {
		this.specialty = specialty;
	}

	@Column(name = "APPROVAL_DEPT")
	@FieldProp(symbol = "批准部门", desc = "")
	public String getApprovalDept() {
		return approvalDept;
	}

	public void setApprovalDept(String approvalDept) {
		this.approvalDept = approvalDept;
	}

	@Column(name = "FILE_CODE")
	@FieldProp(symbol = "文件名称编号", desc = "")
	public String getFileCode() {
		return fileCode;
	}

	public void setFileCode(String fileCode) {
		this.fileCode = fileCode;
	}

	@Column(name = "APPROVAL_TIME")
	@FieldProp(symbol = "批准时间", desc = "")
	public String getApprovalTime() {
		return approvalTime;
	}

	public void setApprovalTime(String approvalTime) {
		this.approvalTime = approvalTime;
	}

	@Column(name = "PLAT_TYPE")
	@FieldProp(symbol = "平台类型", desc = "")
	public String getPlatType() {
		return platType;
	}

	public void setPlatType(String platType) {
		this.platType = platType;
	}

	@Column(name = "DESCRIPTION")
	@FieldProp(symbol = "平台描述", desc = "")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效,0:无效,1:有效,缺省为0", desc = "")
	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@OneToMany(mappedBy = "parent", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@OrderBy(value = "platCode asc")
	@Filter(name = "researchplatFilter", condition = ":valid=VALID")
	public Set<ResearchPlat> getChildren() {
		return children;
	}

	public void setChildren(Set<ResearchPlat> children) {
		this.children = children;
	}

	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
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
