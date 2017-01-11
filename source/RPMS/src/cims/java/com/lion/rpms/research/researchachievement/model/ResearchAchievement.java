package com.lion.rpms.research.researchachievement.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @ClassName: ResearchAchievement 
 * @description :成果管理实体类
 * @author : 王圣磊
 * @date : 2015-03-17
 */
@Entity
@Table(name = "RPMS_RESEARCH_ACHIEVEMENT")
@ModelProp(symbol = "成果管理")

public class ResearchAchievement extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = 7828089621605406216L;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private Project projectId; //依托项目;	
	private String grade; //等级;	
	private String achievementLevel; //成果水平;	
	private String certificationDate; //鉴定时间;	
	private String achievementName; //成果名称;	
	private String achievementNum; //成果编号;	
	private String num; //自编号;	
	private Organization organization; //组织单位;	
	private Double researchCost; //研发成本;	
	private String valid; //是否有效;	
	private String remark; //备注;
	
	private String type; //类型(0001评议验收，0002鉴定验收);
	private String reviewMechanism; //评议机构;	
	private String introduction;//项目简介
	private Double economicBenefits;//经济效益
	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ResearchAchievement() {
	}
	
	@Column(name = "ECONOMIC_BENEFITS")
	@FieldProp(symbol = "经济效益", desc = "")
	public Double getEconomicBenefits() {
		return economicBenefits;
	}
	
	public void setEconomicBenefits(Double economicBenefits) {
		this.economicBenefits = economicBenefits;
	}
	
	@Column(name = "TYPE")
	@FieldProp(symbol = "类型", desc = "")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Column(name = "REVIEW_MECHANISM")
	@FieldProp(symbol = "评议机构", desc = "")
	public String getReviewMechanism(){
		return reviewMechanism; 
	}
	
	public void setReviewMechanism(String reviewMechanism){
		this.reviewMechanism=reviewMechanism;
	}
	
	@Column(name = "INTRODUCTION")
	@FieldProp(symbol = "项目简介", desc = "")
	public String getIntroduction() {
		return introduction;
	}
	
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
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
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name="PROJECT_ID")
    @FieldProp(symbol="依托项目", desc="")
	public Project getProjectId(){
		return projectId; 
	}
	
	public void setProjectId(Project projectId){
		this.projectId=projectId;
	}
    
    @Column(name = "GRADE")
	@FieldProp(symbol = "等级", desc = "")
	public String getGrade(){
		return grade; 
	}
	
	public void setGrade(String grade){
		this.grade=grade;
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
    
    @Column(name = "NUM")
	@FieldProp(symbol = "自编号", desc = "")
	public String getNum(){
		return num; 
	}
	
	public void setNum(String num){
		this.num=num;
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
    
    @Column(name = "RESEARCH_COST")
	@FieldProp(symbol = "研发成本", desc = "")
	public Double getResearchCost(){
		return researchCost; 
	}
	
	public void setResearchCost(Double researchCost){
		this.researchCost=researchCost;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
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
