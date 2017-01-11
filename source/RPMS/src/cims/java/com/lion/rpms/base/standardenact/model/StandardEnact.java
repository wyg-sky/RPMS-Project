package com.lion.rpms.base.standardenact.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description ：标准制定管理Model
 * @date ： 2015-03-13 11:06:28
 * @author ：WangYG
 */
@Entity
@Table(name = "RPMS_STANDARD_ENACT")
@ModelProp(symbol = "标准制定管理")
public class StandardEnact extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter; // 分中心
	private ResearchPlat platInstitution; // 分中心机构
	private SpecialtyDictionary specialty; // 专业;
	private SpecialtyDictionary business; // 业务;
	private String standardName; // 标准名称
	private String grade; // 等级
	private String type; // 类别
	private String standarStatus; // 标准状态
	private String enactDate; // 修订时间
	private String fundUse; // 资金使用情况
	private String enactDesc; // 编制说明
	private String presideOrPart; // 主持或参与
	private String isIssue; // 是否颁布
	private String issueDate; // 颁布日期
	private String carryOutDate; // 实施时间
	private String standardNum; // 标准号
	private String valid; // 是否有效,0:无效,1:有效,缺省为0
	private Organization organization; // 组织单位
	private String remark; // 备注
	private List<Document> documents = new ArrayList<Document>(); // 文档附件

	public StandardEnact() {
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getPlatCenter() {
		return platCenter;
	}

	public void setPlatCenter(ResearchPlat platCenter) {
		this.platCenter = platCenter;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution() {
		return platInstitution;
	}

	public void setPlatInstitution(ResearchPlat platInstitution) {
		this.platInstitution = platInstitution;
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

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "BUSINESS")
	@FieldProp(symbol = "业务", desc = "")
	public SpecialtyDictionary getBusiness() {
		return business;
	}

	public void setBusiness(SpecialtyDictionary business) {
		this.business = business;
	}

	@Column(name = "STANDARD_NAME")
	@FieldProp(symbol = "标准名称", desc = "")
	public String getStandardName() {
		return standardName;
	}

	public void setStandardName(String standardName) {
		this.standardName = standardName;
	}

	@Column(name = "GRADE")
	@FieldProp(symbol = "等级", desc = "")
	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	@Column(name = "TYPE")
	@FieldProp(symbol = "类别", desc = "")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "STANDAR_STATUS")
	@FieldProp(symbol = "标准状态", desc = "")
	public String getStandarStatus() {
		return standarStatus;
	}

	public void setStandarStatus(String standarStatus) {
		this.standarStatus = standarStatus;
	}

	@Column(name = "ENACT_DATE")
	@FieldProp(symbol = "修订时间", desc = "")
	public String getEnactDate() {
		return enactDate;
	}

	public void setEnactDate(String enactDate) {
		this.enactDate = enactDate;
	}

	@Column(name = "FUND_USE")
	@FieldProp(symbol = "资金使用情况", desc = "")
	public String getFundUse() {
		return fundUse;
	}

	public void setFundUse(String fundUse) {
		this.fundUse = fundUse;
	}

	@Column(name = "ENACT_DESC")
	@FieldProp(symbol = "编制说明", desc = "")
	public String getEnactDesc() {
		return enactDesc;
	}

	public void setEnactDesc(String enactDesc) {
		this.enactDesc = enactDesc;
	}

	@Column(name = "PRESIDE_OR_PART")
	@FieldProp(symbol = "主持或参与", desc = "")
	public String getPresideOrPart() {
		return presideOrPart;
	}

	public void setPresideOrPart(String presideOrPart) {
		this.presideOrPart = presideOrPart;
	}

	@Column(name = "IS_ISSUE")
	@FieldProp(symbol = "是否颁布", desc = "")
	public String getIsIssue() {
		return isIssue;
	}

	public void setIsIssue(String isIssue) {
		this.isIssue = isIssue;
	}

	@Column(name = "ISSUE_DATE")
	@FieldProp(symbol = "颁布日期", desc = "")
	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}

	@Column(name = "CARRY_OUT_DATE")
	@FieldProp(symbol = "实施时间", desc = "")
	public String getCarryOutDate() {
		return carryOutDate;
	}

	public void setCarryOutDate(String carryOutDate) {
		this.carryOutDate = carryOutDate;
	}

	@Column(name = "STANDARD_NUM")
	@FieldProp(symbol = "标准号", desc = "")
	public String getStandardNum() {
		return standardNum;
	}

	public void setStandardNum(String standardNum) {
		this.standardNum = standardNum;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
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

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@OneToMany(fetch = FetchType.LAZY, cascade = { javax.persistence.CascadeType.ALL })
	@JoinColumn(name = "DOC_FK")
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
