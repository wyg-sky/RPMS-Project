package com.lion.rpms.research.projectacceptance.model;

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
import com.lion.rpms.research.project.model.Project;
import com.lion.rpms.research.projectreport.model.ProjectItem;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description : 项目验收管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 15:56:38
 */
@Entity
@Table(name = "RPMS_PROJECT_ACCEPTANCE")
@ModelProp(symbol = "项目评议(鉴定)管理")
public class ProjectAcceptance extends AuditableSimpleEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private Project projectId; //项目编号;	
	private String projectName; //项目名称；
	private String acceptanceType; //验收类型;	
	private String acceptanceLevel; //验收等级;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String certificationDate; //鉴定时间;	
	private String achievementName; //成果名称;	
	private String achievementNum; //成果编号;	
	private String level; //成果水平;	
	private Double researchCost; //研发成本;	
	private String status; //状态;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	private SpecialtyDictionary specialty; //专业;	
	private String specialtySug; //专业意见;	
	private String introduction;//项目简介
	private Double economicBenefits;//经济效益
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private String type; //类型(0001评议验收，0002鉴定验收);
	
	private SpecialtyDictionary business; //业务;
	private String cooperationUnit; //合作单位;	
	private String reviewMechanism; //评议机构;	
	private Organization reviewUnit; //评议验收单位;
	
	private List<AcceptanceExpert> acceptanceExpert = new ArrayList<AcceptanceExpert>();
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	private List<ProjectItem> projectItems = new ArrayList<ProjectItem>(); //项目明细
	
	public ProjectAcceptance() {
	}
	
	@Column(name = "COOPERATION_UNIT")
	@FieldProp(symbol = "合作单位", desc = "")
	public String getCooperationUnit(){
		return cooperationUnit; 
	}
	
	public void setCooperationUnit(String cooperationUnit){
		this.cooperationUnit=cooperationUnit;
	}
    
    @Column(name = "REVIEW_MECHANISM")
	@FieldProp(symbol = "评议机构", desc = "")
	public String getReviewMechanism(){
		return reviewMechanism; 
	}
	
	public void setReviewMechanism(String reviewMechanism){
		this.reviewMechanism=reviewMechanism;
	}
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "REVIEW_UNIT")
	@FieldProp(symbol = "评议验收单位", desc = "")
	public Organization getReviewUnit(){
		return reviewUnit; 
	}
	
	public void setReviewUnit(Organization reviewUnit){
		this.reviewUnit=reviewUnit;
	}
	
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "BUSINESS")
	@FieldProp(symbol = "业务", desc = "")
	public SpecialtyDictionary getBusiness(){
		return business; 
	}
	
	public void setBusiness(SpecialtyDictionary business){
		this.business=business;
	}
	
	@Column(name = "PROJECT_NAME")
	@FieldProp(symbol = "项目名称", desc = "")
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	
	@Column(name = "TYPE")
	@FieldProp(symbol = "类型", desc = "")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution(){
		return platInstitution; 
	}
	
	public void setPlatInstitution(ResearchPlat platInstitution) {
		this.platInstitution = platInstitution;
	}
	
	@Column(name = "INTRODUCTION")
	@FieldProp(symbol = "项目简介", desc = "")
	public String getIntroduction() {
		return introduction;
	}
	
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	
	@Column(name = "ECONOMIC_BENEFITS")
	@FieldProp(symbol = "经济效益", desc = "")
	public Double getEconomicBenefits() {
		return economicBenefits;
	}
	
	public void setEconomicBenefits(Double economicBenefits) {
		this.economicBenefits = economicBenefits;
	}
	
	@Column(name = "SPECIALTY_SUG")
	@FieldProp(symbol = "专业意见", desc = "")
	public String getSpecialtySug() {
		return specialtySug;
	}

	public void setSpecialtySug(String specialtySug) {
		this.specialtySug = specialtySug;
	}
	
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "SPECIALTY")
	@FieldProp(symbol = "专业", desc = "")
	public SpecialtyDictionary getSpecialty(){
		return specialty; 
	}
	
	public void setSpecialty(SpecialtyDictionary specialty){
		this.specialty=specialty;
	}
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "PROJECT_ID")
	@FieldProp(symbol = "项目编号", desc = "")
	public Project getProjectId(){
		return projectId; 
	}
	
	public void setProjectId(Project projectId){
		this.projectId=projectId;
	}
    
    @Column(name = "ACCEPTANCE_TYPE")
	@FieldProp(symbol = "验收类型", desc = "")
	public String getAcceptanceType(){
		return acceptanceType; 
	}
	
	public void setAcceptanceType(String acceptanceType){
		this.acceptanceType=acceptanceType;
	}
    
    @Column(name = "ACCEPTANCE_LEVEL")
	@FieldProp(symbol = "验收等级", desc = "")
	public String getAcceptanceLevel(){
		return acceptanceLevel; 
	}
	
	public void setAcceptanceLevel(String acceptanceLevel){
		this.acceptanceLevel=acceptanceLevel;
	}
    
    @Column(name = "REPORT_USER")
	@FieldProp(symbol = "填报人", desc = "")
	public String getReportUser(){
		return reportUser; 
	}
	
	public void setReportUser(String reportUser){
		this.reportUser=reportUser;
	}
    
    @Column(name = "REPORT_TIME")
	@FieldProp(symbol = "填报时间", desc = "")
	public String getReportTime(){
		return reportTime; 
	}
	
	public void setReportTime(String reportTime){
		this.reportTime=reportTime;
	}
    
    @Column(name = "CERTIFICATION_DATE")
	@FieldProp(symbol = "鉴定时间", desc = "")
	public String getCertificationDate(){
		return certificationDate; 
	}
	
	public void setCertificationDate(String certificationDate){
		this.certificationDate=certificationDate;
	}
    
    @Column(name = "ACHIEVEMENT_NAME")
	@FieldProp(symbol = "成果名称", desc = "")
	public String getAchievementName(){
		return achievementName; 
	}
	
	public void setAchievementName(String achievementName){
		this.achievementName=achievementName;
	}
    
    @Column(name = "ACHIEVEMENT_NUM")
	@FieldProp(symbol = "成果编号", desc = "")
	public String getAchievementNum(){
		return achievementNum; 
	}
	
	public void setAchievementNum(String achievementNum){
		this.achievementNum=achievementNum;
	}
    
    @Column(name = "ACHIEVEMENT_LEVEL")
	@FieldProp(symbol = "成果水平", desc = "")
	public String getLevel(){
		return level; 
	}
	
	public void setLevel(String level){
		this.level=level;
	}
    
    @Column(name = "RESEARCH_COST")
	@FieldProp(symbol = "研发成本", desc = "")
	public Double getResearchCost(){
		return researchCost; 
	}
	
	public void setResearchCost(Double researchCost){
		this.researchCost=researchCost;
	}
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
	}
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization getOrganization(){
		return organization; 
	}
	
	public void setOrganization(Organization organization){
		this.organization=organization;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
	
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	public List<AcceptanceExpert> getAcceptanceExpert() {
		return acceptanceExpert;
	}

	public void setAcceptanceExpert(List<AcceptanceExpert> acceptanceExpert) {
		this.acceptanceExpert = acceptanceExpert;
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
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="MAIN_ID")
	@OrderBy("id ASC")
	public List<ProjectItem> getProjectItems() {
		return projectItems;
	}

	public void setProjectItems(List<ProjectItem> projectItems) {
		this.projectItems = projectItems;
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
