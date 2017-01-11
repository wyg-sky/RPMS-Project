package com.lion.rpms.research.researchhonor.model;

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
 * @ClassName: ResearchHonor 
 * @description :荣誉管理实体类
 * @author : 王圣磊
 * @date : 2015-03-18
 */
@Entity
@Table(name = "RPMS_RESEARCH_HONOR")
@ModelProp(symbol = "荣誉管理")

public class ResearchHonor extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -1996941849751399991L;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private String projectId; //(依托项目)项目名称;	
	private String honorType; //分类;	
	private String grade; //等级;	
	private String honorDate; //获奖时间;	
	private String honorName; //名称;	
	private String chargeDepartnent; //(主管部门)颁奖单位;	
	private Double honorReward; //奖励金额;	
	private String assistOrg;//协助单位
	private String valid; //是否有效;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	
	private String certificateNumber; //证书编号
	private String honorNum; //荣誉编号;
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ResearchHonor() {
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
    
	@Column(name="PROJECT_ID")
	@FieldProp(symbol="项目名称", desc="")
	public String getProjectId(){
		return projectId; 
	}	
	public void setProjectId(String projectId){
		this.projectId=projectId;
	}
	
    @Column(name = "HONOR_TYPE")
	@FieldProp(symbol = "分类", desc = "")
	public String getHonorType(){
		return honorType; 
	}
	
	public void setHonorType(String honorType){
		this.honorType=honorType;
	}
    
    @Column(name = "GRADE")
	@FieldProp(symbol = "等级", desc = "")
	public String getGrade(){
		return grade; 
	}
	
	public void setGrade(String grade){
		this.grade=grade;
	}
    
    @Column(name = "HONOR_DATE")
	@FieldProp(symbol = "获奖时间", desc = "")
	public String getHonorDate(){
		return honorDate; 
	}
	
	public void setHonorDate(String honorDate){
		this.honorDate=honorDate;
	}
    
    @Column(name = "HONOR_NAME")
	@FieldProp(symbol = "名称", desc = "")
	public String getHonorName(){
		return honorName; 
	}
	
	public void setHonorName(String honorName){
		this.honorName=honorName;
	}
    
    @Column(name = "CHARGE_DEPARTNENT")
	@FieldProp(symbol = "颁奖单位", desc = "")
	public String getChargeDepartnent(){
		return chargeDepartnent; 
	}
	
	public void setChargeDepartnent(String chargeDepartnent){
		this.chargeDepartnent=chargeDepartnent;
	}
    
    @Column(name = "HONOR_REWARD")
	@FieldProp(symbol = "奖励金额", desc = "")
	public Double getHonorReward(){
		return honorReward; 
	}
	
	public void setHonorReward(Double honorReward){
		this.honorReward=honorReward;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
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
	
	
	@Column(name = "ASSIST_ORG")
	@FieldProp(symbol = "协助单位", desc = "")
	public String getAssistOrg() {
		return assistOrg;
	}

	public void setAssistOrg(String assistOrg) {
		this.assistOrg = assistOrg;
	}
	
	@Column(name = "CERTIFICATE_NUMBER")
	@FieldProp(symbol = "证书编号", desc = "")
	public String getCertificateNumber() {
		return certificateNumber;
	}

	public void setCertificateNumber(String certificateNumber) {
		this.certificateNumber = certificateNumber;
	}
	
	@Column(name = "HONOR_NUM")
	@FieldProp(symbol = "荣誉编号", desc = "")
	public String getHonorNum(){
		return honorNum; 
	}
	
	public void setHonorNum(String honorNum){
		this.honorNum=honorNum;
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
