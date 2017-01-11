package com.lion.rpms.research.researchpatent.model;

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
*专利管理实体类
*Author:王圣磊
*Date：2015-03-13
*/
@Entity
@Table(name = "RPMS_RESEARCH_PATENT")
@ModelProp(symbol = "专利管理")

public class ResearchPatent extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -5327944869226494934L;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private Project projectId; //依托项目;	
	private String patentName; //专利名称;	
	private String num; //自编号;	
	private String type; //分类;	
	private String patentNum; //专利编号;	
	private String acceptDate; //受理时间;	
	private String privilegeDate; //授权时间;	
	private String protectDate; //保护到期时间;	
	private String status; //状态;	
	private String patentee; //专利权人;	
	private String patenteeAddress; //专利权人地址;	
	private String technosphere; //技术领域;	
	private String abstracts; //摘要;	
	private String valid; //是否有效;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	private String invnetor; //发明人PATENT_INVENTOR
	private String cost;//费用明细
	private String total;//合计
	private String patentAnent;	//专利代理公司
	private String applyDate;	//申请日期
	private String publicExpense;//官费
	private String applicationFee;//申请费
	private String regFee;//注册费
	private String annualFee;//年费
	private String taxes;//税费
	private String protectedAlert;//到期提醒
	private String spreadType;//推广类型
	private String annualFeeSum;//年费合计
	private String year;//年份
	private List<ResearchPatentLine> researchPatentLine = new ArrayList<ResearchPatentLine>();
//	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ResearchPatent() {
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
    
    @Column(name = "PATENT_NAME")
	@FieldProp(symbol = "专利名称", desc = "")
	public String getPatentName(){
		return patentName; 
	}
	
	public void setPatentName(String patentName){
		this.patentName=patentName;
	}
    
    @Column(name = "NUM")
	@FieldProp(symbol = "自编号", desc = "")
	public String getNum(){
		return num; 
	}
	
	public void setNum(String num){
		this.num=num;
	}
    
    @Column(name = "TYPE")
	@FieldProp(symbol = "分类", desc = "")
	public String getType(){
		return type; 
	}
	
	public void setType(String type){
		this.type=type;
	}
    
    @Column(name = "PATENT_NUM")
	@FieldProp(symbol = "专利编号", desc = "")
	public String getPatentNum(){
		return patentNum; 
	}
	
	public void setPatentNum(String patentNum){
		this.patentNum=patentNum;
	}
    
    @Column(name = "ACCEPT_DATE")
	@FieldProp(symbol = "受理时间", desc = "")
	public String getAcceptDate(){
		return acceptDate; 
	}
	
	public void setAcceptDate(String acceptDate){
		this.acceptDate=acceptDate;
	}
    
    @Column(name = "PRIVILEGE_DATE")
	@FieldProp(symbol = "授权时间", desc = "")
	public String getPrivilegeDate(){
		return privilegeDate; 
	}
	
	public void setPrivilegeDate(String privilegeDate){
		this.privilegeDate=privilegeDate;
	}
    
    @Column(name = "PROTECT_DATE")
	@FieldProp(symbol = "保护到期时间", desc = "")
	public String getProtectDate(){
		return protectDate; 
	}
	
	public void setProtectDate(String protectDate){
		this.protectDate=protectDate;
	}
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
	}
	
	@Column(name = "APPLY_DATE")
	@FieldProp(symbol = "申请日期", desc = "")
	public String getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}
    
    @Column(name = "PATENTEE")
	@FieldProp(symbol = "专利权人", desc = "")
	public String getPatentee(){
		return patentee; 
	}
	
	public void setPatentee(String patentee){
		this.patentee=patentee;
	}
    
    @Column(name = "PATENTEE_ADDRESS")
	@FieldProp(symbol = "专利权人地址", desc = "")
	public String getPatenteeAddress(){
		return patenteeAddress; 
	}
	
	public void setPatenteeAddress(String patenteeAddress){
		this.patenteeAddress=patenteeAddress;
	}
    
    @Column(name = "TECHNOSPHERE")
	@FieldProp(symbol = "技术领域", desc = "")
	public String getTechnosphere(){
		return technosphere; 
	}
	
	public void setTechnosphere(String technosphere){
		this.technosphere=technosphere;
	}
    
    @Column(name = "SUMMARY")
	@FieldProp(symbol = "摘要", desc = "")
	public String getAbstracts() {
		return abstracts;
	}
	public void setAbstracts(String abstracts) {
		this.abstracts = abstracts;
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
    
    @Column(name = "PATENT_INVENTOR")
	@FieldProp(symbol = "发明人", desc = "")
    public String getInvnetor() {
		return invnetor;
	}
	public void setInvnetor(String invnetor) {
		this.invnetor = invnetor;
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
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<ResearchPatentLine> getResearchPatentLine() {
		return researchPatentLine;
	}
	public void setResearchPatentLine(List<ResearchPatentLine> researchPatentLine) {
		this.researchPatentLine = researchPatentLine;
	}
	
//	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
//	@JoinColumn(name="DOC_FK")
//	@OrderBy("createTime DESC")
//	public List<Document> getDocuments() {
//		return documents;
//	}
//
//	public void setDocuments(List<Document> documents) {
//		this.documents = documents;
//	}
	
	@Column(name = "COST")
	@FieldProp(symbol = "费用明细", desc = "")
	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}
	
	@Column(name = "TOTAL")
	@FieldProp(symbol = "合计", desc = "")
	public String getTotal() {
		return total;
	}
	
	public void setTotal(String total) {
		this.total = total;
	}
	
	
	@Column(name = "PATENT_ANENT")
	@FieldProp(symbol = "专利代理公司", desc = "")
	public String getPatentAnent() {
		return patentAnent;
	}


	public void setPatentAnent(String patentAnent) {
		this.patentAnent = patentAnent;
	}

	@Column(name = "PUBLIC_EXPENSE")
	@FieldProp(symbol = "官费", desc = "")
	public String getPublicExpense() {
		return publicExpense;
	}

	public void setPublicExpense(String publicExpense) {
		this.publicExpense = publicExpense;
	}
	
	@Column(name = "APPLICATION_FEE")
	@FieldProp(symbol = "申请费", desc = "")
	public String getApplicationFee() {
		return applicationFee;
	}

	public void setApplicationFee(String applicationFee) {
		this.applicationFee = applicationFee;
	}
	
	@Column(name = "REG_FEE")
	@FieldProp(symbol = "登记费", desc = "")
	public String getRegFee() {
		return regFee;
	}

	public void setRegFee(String regFee) {
		this.regFee = regFee;
	}
	
	@Column(name = "ANNUAL_FEE")
	@FieldProp(symbol = "年费", desc = "")
	public String getAnnualFee() {
		return annualFee;
	}

	public void setAnnualFee(String annualFee) {
		this.annualFee = annualFee;
	}
	
	@Column(name = "TAXES")
	@FieldProp(symbol = "税费", desc = "")
	public String getTaxes() {
		return taxes;
	}
	public void setTaxes(String taxes) {
		this.taxes = taxes;
	}
	
	@Column(name = "PROTECTED_ALERT")
	@FieldProp(symbol = "到期提前提醒", desc = "")
	public String getProtectedAlert() {
		return protectedAlert;
	}

	public void setProtectedAlert(String protectedAlert) {
		this.protectedAlert = protectedAlert;
	}
	
	@Column(name = "SPREAD_TYPE")
	@FieldProp(symbol = "推广类型", desc = "")
	public String getSpreadType() {
		return spreadType;
	}
	public void setSpreadType(String spreadType) {
		this.spreadType = spreadType;
	}
	
	@Column(name = "ANNUAL_FEE_SUM")
	@FieldProp(symbol = "年费合计", desc = "")
	public String getAnnualFeeSum() {
		return annualFeeSum;
	}

	public void setAnnualFeeSum(String annualFeeSum) {
		this.annualFeeSum = annualFeeSum;
	}

	@Column(name = "YEAR")
	@FieldProp(symbol = "年度", desc = "")
	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
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
