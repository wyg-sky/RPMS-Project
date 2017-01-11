package com.lion.rpms.research.projectplan.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @ClassName: ProjectPlan
 * @description :项目规划实体类
 * @author : 王圣磊
 * @date : 2015-03-09
 */
@Entity
@Table(name = "RPMS_PROJECT_PLAN")
@ModelProp(symbol = "项目规划管理")
public class ProjectPlan extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String planYear; // 规划年度;
	private String planName; // 规划名称;
	private String planType; // 规划类型;
	private String planDept; // 编制单位;
	private String planTime; // 编制时间;
	private String grade; // 规划等级;
	private String planStatus; // 实施状态;
	private String planTarget; // 发展目标;
	private String mainContent; // 主要内容;
	private String valid; // 是否有效;
	private String status; // 状态;
	private Organization organization;// 组织机构
	private String remark; // 备注;
	private ResearchPlat platCenter; // 分中心
	private ResearchPlat platInstitution; // 分中心机构

	private List<Document> documents = new ArrayList<Document>(); // 文档附件

	public ProjectPlan() {
	}

	@Column(name = "PLAN_YEAR")
	@FieldProp(symbol = "规划年度", desc = "")
	public String getPlanYear() {
		return planYear;
	}

	public void setPlanYear(String planYear) {
		this.planYear = planYear;
	}

	@Column(name = "PLAN_NAME")
	@FieldProp(symbol = "规划名称", desc = "")
	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	@Column(name = "PLAN_TYPE")
	@FieldProp(symbol = "规划类型", desc = "")
	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}

	@Column(name = "PLAN_DEPT")
	@FieldProp(symbol = "编制单位", desc = "")
	public String getPlanDept() {
		return planDept;
	}

	public void setPlanDept(String planDept) {
		this.planDept = planDept;
	}

	@Column(name = "PLAN_TIME")
	@FieldProp(symbol = "编制时间", desc = "")
	public String getPlanTime() {
		return planTime;
	}

	public void setPlanTime(String planTime) {
		this.planTime = planTime;
	}

	@Column(name = "GRADE")
	@FieldProp(symbol = "规划等级", desc = "")
	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	@Column(name = "PLAN_STATUS")
	@FieldProp(symbol = "实施状态", desc = "")
	public String getPlanStatus() {
		return planStatus;
	}

	public void setPlanStatus(String planStatus) {
		this.planStatus = planStatus;
	}

	@Column(name = "PLAN_TARGET")
	@FieldProp(symbol = "发展目标", desc = "")
	public String getPlanTarget() {
		return planTarget;
	}

	public void setPlanTarget(String planTarget) {
		this.planTarget = planTarget;
	}

	@Column(name = "MAIN_CONTENT")
	@FieldProp(symbol = "主要内容", desc = "")
	public String getMainContent() {
		return mainContent;
	}

	public void setMainContent(String mainContent) {
		this.mainContent = mainContent;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}

	@Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization getOrganization() {
		return this.organization;
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

	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
