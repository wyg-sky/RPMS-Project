package com.lion.rpms.research.thesis.model;

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
import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
*论文管理实体类
*Author:王圣磊
*Date：2015-03-19
*/
@Entity
@Table(name = "RPMS_RESEARCH_THESIS")
@ModelProp(symbol = "论文管理")

public class ResearchThesis extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -7112475009044807819L;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;
	private String businessName;//业务名称
	private Project projectId; //依托项目;	
	private String grade; //等级;	
	private String pubtime; //发表时间;	
	private String title; //论文名称;	
	private String thesisNum; //论文编号;	
	private String periodicalName; //期刊名称;	
	private String periodicalCn; //国内刊号;	
	private String periodicalIssn; //国际刊号;	
	private String publicationDate; //出版时间;	
	private String pubNum; //刊物期数;	
	private String realeaseDate; //发布时间;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	private String thesisAuthors; //论文作者
	
	private String thesisAbout; //论文简介
	private String status; //状态
	private String promotionCategory; //推广类别
	private List<ResearchThesisLine> researchThesisLine = new ArrayList<ResearchThesisLine>();
	private List<ResearchThesisTalent> researchThesisTalent = new ArrayList<ResearchThesisTalent>();
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ResearchThesis() {
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
    
	@Column(name = "BUSINESS_NAME")
	@FieldProp(symbol = "业务名称", desc = "")
	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
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
    
    @Column(name = "PUBTIME")
	@FieldProp(symbol = "发表时间", desc = "")
	public String getPubtime(){
		return pubtime; 
	}
	
	public void setPubtime(String pubtime){
		this.pubtime=pubtime;
	}
    
    @Column(name = "TITLE")
	@FieldProp(symbol = "论文名称", desc = "")
	public String getTitle(){
		return title; 
	}
	
	public void setTitle(String title){
		this.title=title;
	}
    
    @Column(name = "THESIS_NUM")
	@FieldProp(symbol = "论文编号", desc = "")
	public String getThesisNum(){
		return thesisNum; 
	}
	
	public void setThesisNum(String thesisNum){
		this.thesisNum=thesisNum;
	}
    
    @Column(name = "PERIODICAL_NAME")
	@FieldProp(symbol = "期刊名称", desc = "")
	public String getPeriodicalName(){
		return periodicalName; 
	}
	
	public void setPeriodicalName(String periodicalName){
		this.periodicalName=periodicalName;
	}
    
    @Column(name = "PERIODICAL_CN")
	@FieldProp(symbol = "国内刊号", desc = "")
	public String getPeriodicalCn(){
		return periodicalCn; 
	}
	
	public void setPeriodicalCn(String periodicalCn){
		this.periodicalCn=periodicalCn;
	}
    
    @Column(name = "PERIODICAL_ISSN")
	@FieldProp(symbol = "国际刊号", desc = "")
	public String getPeriodicalIssn(){
		return periodicalIssn; 
	}
	
	public void setPeriodicalIssn(String periodicalIssn){
		this.periodicalIssn=periodicalIssn;
	}
    
    @Column(name = "PUBLICATION_DATE")
	@FieldProp(symbol = "出版时间", desc = "")
	public String getPublicationDate(){
		return publicationDate; 
	}
	
	public void setPublicationDate(String publicationDate){
		this.publicationDate=publicationDate;
	}
    
    @Column(name = "PUB_NUM")
	@FieldProp(symbol = "刊物期数", desc = "")
	public String getPubNum(){
		return pubNum; 
	}
	
	public void setPubNum(String pubNum){
		this.pubNum=pubNum;
	}
    
    @Column(name = "REALEASE_DATE")
	@FieldProp(symbol = "发布时间", desc = "")
	public String getRealeaseDate(){
		return realeaseDate; 
	}
	
	public void setRealeaseDate(String realeaseDate){
		this.realeaseDate=realeaseDate;
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

    @Column(name = "THESIS_AUTHORS")
	@FieldProp(symbol = "论文作者", desc = "")
	public String getThesisAuthors() {
		return thesisAuthors;
	}
	public void setThesisAuthors(String thesisAuthors) {
		this.thesisAuthors = thesisAuthors;
	}

    @Column(name = "THESIS_ABOUT")
	@FieldProp(symbol = "论文简介", desc = "")
	public String getThesisAbout() {
		return thesisAbout;
	}
	public void setThesisAbout(String thesisAbout) {
		this.thesisAbout = thesisAbout;
	}
	
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
    @Column(name = "PROMOTION_CATEGORY")
	@FieldProp(symbol = "推广类别", desc = "")
	public String getPromotionCategory() {
		return promotionCategory;
	}
	public void setPromotionCategory(String promotionCategory) {
		this.promotionCategory = promotionCategory;
	}
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<ResearchThesisLine> getResearchThesisLine() {
		return researchThesisLine;
	}
	public void setResearchThesisLine(List<ResearchThesisLine> researchThesisLine) {
		this.researchThesisLine = researchThesisLine;
	}
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<ResearchThesisTalent> getResearchThesisTalent() {
		return researchThesisTalent;
	}

	public void setResearchThesisTalent(List<ResearchThesisTalent> researchThesisTalent) {
		this.researchThesisTalent = researchThesisTalent;
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
