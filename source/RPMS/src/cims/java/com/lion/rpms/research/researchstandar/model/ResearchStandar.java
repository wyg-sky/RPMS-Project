package com.lion.rpms.research.researchstandar.model;

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
 * @ClassName: ResearchStandar 
 * @description :标准管理实体类
 * @author : 王圣磊
 * @date : 2015-03-18
 */
@Entity
@Table(name = "RPMS_RESEARCH_STANDAR")
@ModelProp(symbol = "标准管理")

public class ResearchStandar extends AuditableSimpleEntity implements Serializable{
	
	private static final long serialVersionUID = -4142258898699330409L;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private String standarName; //标准名称;	
	private String grade; //等级;	
	private String standarNum; //编号;	
	private String realeaseDate; //发布时间;	
	private String valid; //是否有效;	
	private Organization organization; //组织单位;	
	private String remark; //备注;
	//新增字段
	private String standarStatus; // 标准状态
	private String enactDate; // 修订时间
	private String fundUse; // 资金使用情况
	private String enactDesc; // 编制说明
	private String presideOrPart; // 主持或参与
	private String isIssue; // 是否颁布(时间)
	private String carryOutDate; // 实施时间	
	
	private String draftOrg;//起草单位
	private String projectDate;//立项时间
	private String fileNum;//文号
	private String approveProjectOrg;//批准立项单位
	private String standardApproveOrg;//标准批准单位
	private String approveDate;//批准时间
	private String planNum;//计划编号
	
	private String draftUser;//起草人
	private String standarManagement;//管理部门
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ResearchStandar() {
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
    
    @Column(name = "STANDAR_NAME")
	@FieldProp(symbol = "标准名称", desc = "")
	public String getStandarName(){
		return standarName; 
	}
	
	public void setStandarName(String standarName){
		this.standarName=standarName;
	}
    
    @Column(name = "GRADE")
	@FieldProp(symbol = "等级", desc = "")
	public String getGrade(){
		return grade; 
	}
	
	public void setGrade(String grade){
		this.grade=grade;
	}
    
    @Column(name = "STANDAR_NUM")
	@FieldProp(symbol = "编号", desc = "")
	public String getStandarNum(){
		return standarNum; 
	}
	
	public void setStandarNum(String standarNum){
		this.standarNum=standarNum;
	}
    
    @Column(name = "REALEASE_DATE")
	@FieldProp(symbol = "发布时间", desc = "")
	public String getRealeaseDate(){
		return realeaseDate; 
	}
	
	public void setRealeaseDate(String realeaseDate){
		this.realeaseDate=realeaseDate;
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

	@Column(name = "CARRY_OUT_DATE")
	@FieldProp(symbol = "实施时间", desc = "")
	public String getCarryOutDate() {
		return carryOutDate;
	}

	public void setCarryOutDate(String carryOutDate) {
		this.carryOutDate = carryOutDate;
	}

	@Column(name = "DRAFT_ORG")
	@FieldProp(symbol = "起草单位", desc = "")
	public String getDraftOrg() {
		return draftOrg;
	}

	public void setDraftOrg(String draftOrg) {
		this.draftOrg = draftOrg;
	}
	
	@Column(name = "PROJECT_DATE")
	@FieldProp(symbol = "立项时间", desc = "")
	public String getProjectDate() {
		return projectDate;
	}

	public void setProjectDate(String projectDate) {
		this.projectDate = projectDate;
	}

	@Column(name = "FILE_NUM")
	@FieldProp(symbol = "文号", desc = "")
	public String getFileNum() {
		return fileNum;
	}

	public void setFileNum(String fileNum) {
		this.fileNum = fileNum;
	}
	
	@Column(name = "APPROVE_PROJECT_ORG")
	@FieldProp(symbol = "批准立项单位", desc = "")
	public String getApproveProjectOrg() {
		return approveProjectOrg;
	}

	public void setApproveProjectOrg(String approveProjectOrg) {
		this.approveProjectOrg = approveProjectOrg;
	}
	
	@Column(name = "STANDARD_APPROVE_ORG")
	@FieldProp(symbol = "标准批准单位", desc = "")
	public String getStandardApproveOrg() {
		return standardApproveOrg;
	}

	public void setStandardApproveOrg(String standardApproveOrg) {
		this.standardApproveOrg = standardApproveOrg;
	}
	@Column(name = "APPROVE_DATE")
	@FieldProp(symbol = "批准时间", desc = "")
	public String getApproveDate() {
		return approveDate;
	}

	public void setApproveDate(String approveDate) {
		this.approveDate = approveDate;
	}
	@Column(name = "PLAN_NUM")
	@FieldProp(symbol = "计划编号", desc = "")
	public String getPlanNum() {
		return planNum;
	}

	public void setPlanNum(String planNum) {
		this.planNum = planNum;
	}

	@Column(name = "DRAFT_USER")
	@FieldProp(symbol = "起草人", desc = "")
	public String getDraftUser() {
		return draftUser;
	}
	public void setDraftUser(String draftUser) {
		this.draftUser = draftUser;
	}

	@Column(name = "STANDAR_MANAGEMENT")
	@FieldProp(symbol = "管理部门", desc = "")
	public String getStandarManagement() {
		return standarManagement;
	}
	public void setStandarManagement(String standarManagement) {
		this.standarManagement = standarManagement;
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
