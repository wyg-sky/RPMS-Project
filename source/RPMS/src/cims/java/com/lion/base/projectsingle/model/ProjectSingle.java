package com.lion.base.projectsingle.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * 
 * @description : 单项工程管理实体类
 * @date : 2013-9-25下午03:02:44
 * @author : yangss
 */
@Entity
@Table(name = "BASE_PROJECT_SINGLE")
@ModelProp(symbol = "单项工程")
public class ProjectSingle extends AuditableSimpleEntity implements Serializable {

	private static final long serialVersionUID = -2155044924264417553L;
	private String reportDate; //日期
	private String reportStatus; //上报状态
	private Organization organization; //单位
	private String projectCd; //工程编码
	private String projectName; //工程名称
	private String projectSimp; //工程简拼
	private String projectType; //工程类型
	private String projectStatus; //工程状态
	private String beginDate; //开始时间
	private String endDate; //结束时间
	private String projectHead; //负责人
	private String constructionUnit;  //施工单位
	private String remark; //备注
	private String reportUser; //审批人
	private String reportSuggestion; //审批意见
	private String valid; //是否有效

	public ProjectSingle(){
		
	}

	@Column(name = "REPORT_DATE")
	@FieldProp(symbol = "日期", desc = "")
	public String getReportDate() {
		return reportDate;
	}

	public void setReportDate(String reportDate) {
		this.reportDate = reportDate;
	}

	@Column(name = "REPORT_STATUS")
	@FieldProp(symbol = "上报状态", desc = "")
	public String getReportStatus() {
		return reportStatus;
	}

	public void setReportStatus(String reportStatus) {
		this.reportStatus = reportStatus;
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

	@Column(name = "PROJECT_CD")
	@FieldProp(symbol = "工程编码", desc = "")
	public String getProjectCd() {
		return projectCd;
	}

	public void setProjectCd(String projectCd) {
		this.projectCd = projectCd;
	}

	@Column(name = "PROJECT_NAME")
	@FieldProp(symbol = "工程名称", desc = "")
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	@Column(name = "PROJECT_SIMP")
	@FieldProp(symbol = "工程简拼", desc = "")
	public String getProjectSimp() {
		return projectSimp;
	}

	public void setProjectSimp(String projectSimp) {
		this.projectSimp = projectSimp;
	}

	@Column(name = "PROJECT_TYPE")
	@FieldProp(symbol = "工程类型", desc = "")
	public String getProjectType() {
		return projectType;
	}

	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}

	@Column(name = "PROJECT_STATUS")
	@FieldProp(symbol = "工程状态", desc = "")
	public String getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(String projectStatus) {
		this.projectStatus = projectStatus;
	}

	@Column(name = "BEGIN_DATE")
	@FieldProp(symbol = "开始时间", desc = "")
	public String getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}

	@Column(name = "END_DATE")
	@FieldProp(symbol = "结束时间", desc = "")
	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Column(name = "PROJECT_HEAD")
	@FieldProp(symbol = "负责人", desc = "")
	public String getProjectHead() {
		return projectHead;
	}

	public void setProjectHead(String projectHead) {
		this.projectHead = projectHead;
	}

	@Column(name = "CONSTRUCTION_UNIT")
	@FieldProp(symbol = "施工单位", desc = "")
	public String getConstructionUnit() {
		return constructionUnit;
	}

	public void setConstructionUnit(String constructionUnit) {
		this.constructionUnit = constructionUnit;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "REPORT_USER")
	@FieldProp(symbol = "审批人", desc = "")
	public String getReportUser() {
		return reportUser;
	}

	public void setReportUser(String reportUser) {
		this.reportUser = reportUser;
	}

	@Column(name = "REPORT_SUGGESTIONS")
	@FieldProp(symbol = "上报意见", desc = "")
	public String getReportSuggestion() {
		return reportSuggestion;
	}

	public void setReportSuggestion(String reportSuggestion) {
		this.reportSuggestion = reportSuggestion;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}
}
