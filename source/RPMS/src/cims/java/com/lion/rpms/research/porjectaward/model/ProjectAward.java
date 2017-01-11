package com.lion.rpms.research.porjectaward.model;

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

import org.hibernate.annotations.Cascade;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.research.researchachievement.model.ResearchAchievement;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
*项目报奖管理实体类
*Author:王圣磊
*Date：2015-03-12
*/
@Entity
@Table(name = "RPMS_PROJECT_AWARD")
@ModelProp(symbol = "项目报奖管理")

public class ProjectAward extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = 2147556045968122250L;
	private Organization organization; //组织单位;
	private ResearchPlat platInstitution; //分中心机构;	
	private Organization chargeDepartnent; //评奖单位;	
	private ResearchAchievement projectId; //成果编号;
	
	private String achievement; //编号;	
	private String achievementName; //名称;	
	private String achievementType; //报奖类型;	
	private String completePerson;//完成人员
	
	private String awardType; //奖项类型;	
	private String grade; //等级;	
	private String award; //获得奖项;	
	private Double awardAmount; //获奖金额;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String status; //状态;	
	private String achievementLevel; //成果水平;	
	private String awardOpinion; //推荐意见;	
	private String awardYear; //年度;

	private Organization organizations; //组织单位;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitutions; //分中心机构;
	private SpecialtyDictionary specialty; //专业;	
	private String awardsAgency; //评奖机构
	
	private String backReason;//退回原因

	private String remark; //备注;	
	private List<ProjectAwardLine> projectAwardLine = new ArrayList<ProjectAwardLine>();
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ProjectAward() {
	}
	
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name="PROJECT_ID")
    @FieldProp(symbol="项目编号", desc="")
	public ResearchAchievement getProjectId(){
		return projectId; 
	}
	
	public void setProjectId(ResearchAchievement projectId){
		this.projectId=projectId;
	}
	
	@Column(name = "ACHIEVEMENT")
	@FieldProp(symbol = "编号", desc = "")
    public String getAchievement() {
		return achievement;
	}

	public void setAchievement(String achievement) {
		this.achievement = achievement;
	}

	@Column(name = "ACHIEVEMENT_NAME")
	@FieldProp(symbol = "名称", desc = "")
	public String getAchievementName() {
		return achievementName;
	}

	public void setAchievementName(String achievementName) {
		this.achievementName = achievementName;
	}

	@Column(name = "ACHIEVEMENT_TYPE")
	@FieldProp(symbol = "报奖类型", desc = "")
	public String getAchievementType() {
		return achievementType;
	}

	public void setAchievementType(String achievementType) {
		this.achievementType = achievementType;
	}

	@Column(name = "COMPLETE_PERSON")
	@FieldProp(symbol = "完成人员", desc = "")
	public String getCompletePerson() {
		return completePerson;
	}

	public void setCompletePerson(String completePerson) {
		this.completePerson = completePerson;
	}

	@Column(name = "AWARD_TYPE")
	@FieldProp(symbol = "奖项类型", desc = "")
	public String getAwardType(){
		return awardType; 
	}
	
	public void setAwardType(String awardType){
		this.awardType=awardType;
	}
    
    @Column(name = "GRADE")
	@FieldProp(symbol = "等级", desc = "")
	public String getGrade(){
		return grade; 
	}
	
	public void setGrade(String grade){
		this.grade=grade;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "CHARGE_DEPARTNENT")
	@FieldProp(symbol = "评奖单位", desc = "")
	public Organization getChargeDepartnent(){
		return chargeDepartnent; 
	}
	
	public void setChargeDepartnent(Organization chargeDepartnent){
		this.chargeDepartnent=chargeDepartnent;
	}
    
    @Column(name = "AWARD")
	@FieldProp(symbol = "获得奖项", desc = "")
	public String getAward(){
		return award; 
	}
	
	public void setAward(String award){
		this.award=award;
	}
    
    @Column(name = "AWARD_AMOUNT")
	@FieldProp(symbol = "获奖金额", desc = "")
	public Double getAwardAmount(){
		return awardAmount; 
	}
	
	public void setAwardAmount(Double awardAmount){
		this.awardAmount=awardAmount;
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
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
	}
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "RESEARCHPLAT")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution(){
		return platInstitution; 
	}
	
	public void setPlatInstitution(ResearchPlat platInstitution){
		this.platInstitution=platInstitution;
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
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
	
    @Column(name = "ACHIEVEMENT_LEVEL")
	@FieldProp(symbol = "成果水平", desc = "")
	public String getAchievementLevel(){
		return achievementLevel; 
	}
	
	public void setAchievementLevel(String achievementLevel){
		this.achievementLevel=achievementLevel;
	}
	
    @Column(name = "AWARD_OPINION")
	@FieldProp(symbol = "推荐意见", desc = "")
	public String getAwardOpinion() {
		return awardOpinion;
	}

	public void setAwardOpinion(String awardOpinion) {
		this.awardOpinion = awardOpinion;
	}

    @Column(name = "AWARD_YEAR")
	@FieldProp(symbol = "年度", desc = "")
	public String getAwardYear() {
		return awardYear;
	}

	public void setAwardYear(String awardYear) {
		this.awardYear = awardYear;
	}
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	
	public List<ProjectAwardLine> getProjectAwardLine() {
		return projectAwardLine;
	}
	public void setProjectAwardLine(List<ProjectAwardLine> projectAwardLine) {
		this.projectAwardLine = projectAwardLine;
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
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATIONS")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization getOrganizations() {
		return organizations;
	}
	public void setOrganizations(Organization organizations) {
		this.organizations = organizations;
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
	public ResearchPlat getPlatInstitutions() {
		return platInstitutions;
	}
	public void setPlatInstitutions(ResearchPlat platInstitutions) {
		this.platInstitutions = platInstitutions;
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
	
    @Column(name = "AWARDS_AGENCY")
	@FieldProp(symbol = "评奖机构", desc = "")
	public String getAwardsAgency() {
		return awardsAgency;
	}
	public void setAwardsAgency(String awardsAgency) {
		this.awardsAgency = awardsAgency;
	}
	

    @Column(name = "BACKREASON")
	@FieldProp(symbol = "退回原因", desc = "")
	public String getBackReason() {
		return backReason;
	}

	public void setBackReason(String backReason) {
		this.backReason = backReason;
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
