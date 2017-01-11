package com.lion.rpms.research.projectspread.model;

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
import com.lion.system.document.model.Document;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.research.researchachievement.model.ResearchAchievement;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * @description ：(项目推广管理)成果推广管理Model
 * @date ： 2015-03-12 15:01:49
 * @author ：WangYG
 */
@Entity
@Table(name = "RPMS_PROJECT_SPREAD")
@ModelProp(symbol = "成果推广管理")
public class ProjectSpread extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchAchievement projectId; // (项目编号)成果编号
	private String spreadAim; // (项目推广目的)成果推广简介
	private String spreadPoint; // 项目推广要点
	private String reportUser; // 填报人
	private String reportTime; // 填报时间
	private String status; // 状态
	private String valid; // (是否有效 0:无效，1：有效)是否推广 0:不推广 1:推广
	private String remark; // 备注
	private List<Document> documents = new ArrayList<Document>(); // 文档附件
	private Organization organization;// 组织单位
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private String achievementName; //成果名称;
	private String achievementLevel; //成果水平;	
	private String certificationDate; //评议/鉴定时间;
	private String type; //成果类型(0001评议验收，0002鉴定验收);
	private String reviewMechanism; //评议/鉴定机构;	
	private String introduction;//成果简介
	

	public ProjectSpread() {
	}
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PROJECT_ID")
	@FieldProp(symbol = "成果编号", desc = "")
	public ResearchAchievement getProjectId() {
		return projectId;
	}

	public void setProjectId(ResearchAchievement projectId) {
		this.projectId = projectId;
	}

	@Column(name = "SPREAD_AIM")
	@FieldProp(symbol = "项目推广目的", desc = "")
	public String getSpreadAim() {
		return spreadAim;
	}

	public void setSpreadAim(String spreadAim) {
		this.spreadAim = spreadAim;
	}

	@Column(name = "SPREAD_POINT")
	@FieldProp(symbol = "项目推广要点", desc = "")
	public String getSpreadPoint() {
		return spreadPoint;
	}

	public void setSpreadPoint(String spreadPoint) {
		this.spreadPoint = spreadPoint;
	}

	@Column(name = "REPORT_USER")
	@FieldProp(symbol = "填报人", desc = "")
	public String getReportUser() {
		return reportUser;
	}

	public void setReportUser(String reportUser) {
		this.reportUser = reportUser;
	}

	@Column(name = "REPORT_TIME")
	@FieldProp(symbol = "填报时间", desc = "")
	public String getReportTime() {
		return reportTime;
	}

	public void setReportTime(String reportTime) {
		this.reportTime = reportTime;
	}

	@Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否推广", desc = "")
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
	public ResearchPlat getPlatCenter(){
		return platCenter; 
	}
	
	public void setPlatCenter(ResearchPlat platCenter){
		this.platCenter=platCenter;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution(){
		return platInstitution; 
	}
	
	public void setPlatInstitution(ResearchPlat platInstitution){
		this.platInstitution=platInstitution;
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
	
    @Column(name = "ACHIEVEMENT_NAME")
	@FieldProp(symbol = "成果名称", desc = "")
	public String getAchievementName(){
		return achievementName; 
	}
	
	public void setAchievementName(String achievementName){
		this.achievementName=achievementName;
	}
	
    @Column(name = "ACHIEVEMENT_LEVEL")
	@FieldProp(symbol = "成果水平", desc = "")
	public String getAchievementLevel(){
		return achievementLevel; 
	}
	
	public void setAchievementLevel(String achievementLevel){
		this.achievementLevel=achievementLevel;
	}
    
    @Column(name = "CERTIFICATION_DATE")
	@FieldProp(symbol = "评议/鉴定时间", desc = "")
	public String getCertificationDate(){
		return certificationDate; 
	}
	
	public void setCertificationDate(String certificationDate){
		this.certificationDate=certificationDate;
	}
    
	@Column(name = "TYPE")
	@FieldProp(symbol = "成果类型", desc = "")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Column(name = "REVIEW_MECHANISM")
	@FieldProp(symbol = "评议/鉴定机构", desc = "")
	public String getReviewMechanism(){
		return reviewMechanism; 
	}
	
	public void setReviewMechanism(String reviewMechanism){
		this.reviewMechanism=reviewMechanism;
	}
	
	@Column(name = "INTRODUCTION")
	@FieldProp(symbol = "成果简介", desc = "")
	public String getIntroduction() {
		return introduction;
	}
	
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
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
