package com.lion.rpms.research.project.model;

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
 * @description : 项目立项管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 13:59:17
 */
 
@Entity
@Table(name = "RPMS_PROJECT")
@ModelProp(symbol = "项目立项管理")
public class Project extends AuditableSimpleEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private String projectCode; //项目编号;	
	private String projectName; //项目名称;	
	private String projectAnnual; //项目年度;	
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private String proejctType; //项目类型;	
	private String projectLevel; //项目级别;	
	private String researchFocus; //研发重点;	
	private String researchWay; //研发方式;	
	private String researchContent; //项目研究内容;	
	private String startTime; //项目计划开始时间;	
	private String endTime; //项目计划结束时间;	
	private String projectStatus; //项目状态;	
	private String projectProgress; //项目进度;	
	private String technology; //技术水平;	
	private Long provinceIdentify; //省部级鉴定项目;	
	private Long hallIdentify; //厅局级鉴定项目;	
	private Long inventionPatent; //发明专利;	
	private Long utilityPatent; //实用新型专利;	
	private Long nationPaper; //国家级论文;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String examineUser; //审核人;	
	private String examineSug; //审核意见;	
	private String approveUser; //审批人;	
	private String approveSug; //审批意见;	
	private String status; //状态;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	private String backMsg;//退回意见;
	private String recommendType;//推荐类型
	
	private List<ProjectPartners> projectPartners = new ArrayList<ProjectPartners>();
	private List<ProjectTalent> projectTalent = new ArrayList<ProjectTalent>();
	private List<ProjectFunds> projectFunds = new ArrayList<ProjectFunds>();
	private List<ProjectStage> projectStages = new ArrayList<ProjectStage>();
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	private String projectStage;//项目目前进展阶段
	private Double investmentTotal; //总研发经费已投入;
	private Double ysxjjxy;//已实现经济效益
	private Organization chargeDepartnent; //审核单位;
	
	private String glAndPhone;//项目管理员及联系方式
	private String examineTime;//技术专业审查时间
	private String approveTime;//管理专业审查时间
	
	private String ddsj;//调度时间
	private Double ljtj;//累计统计
	private Double ljgj;//累计归集
	private String snrk;//山能认可
	private String swrk;//税务认可
	private List<ProjectCostTotal> projectCostTotal = new ArrayList<ProjectCostTotal>();
	
	public Project() {
	}
	
	@Column(name = "DDSJ")
	@FieldProp(symbol = "调度时间", desc = "")
	public String getDdsj() {
		return ddsj;
	}

	public void setDdsj(String ddsj) {
		this.ddsj = ddsj;
	}

	@Column(name = "LJTJ")
	@FieldProp(symbol = "累计统计", desc = "")
	public Double getLjtj() {
		return ljtj;
	}

	public void setLjtj(Double ljtj) {
		this.ljtj = ljtj;
	}

	@Column(name = "LJGJ")
	@FieldProp(symbol = "累计归集", desc = "")
	public Double getLjgj() {
		return ljgj;
	}

	public void setLjgj(Double ljgj) {
		this.ljgj = ljgj;
	}

	@Column(name = "SNRK")
	@FieldProp(symbol = "山能认可", desc = "")
	public String getSnrk() {
		return snrk;
	}

	public void setSnrk(String snrk) {
		this.snrk = snrk;
	}

	@Column(name = "SWRK")
	@FieldProp(symbol = "税务认可", desc = "")
	public String getSwrk() {
		return swrk;
	}

	public void setSwrk(String swrk) {
		this.swrk = swrk;
	}

	@Column(name = "GL_AND_PHONE")
	@FieldProp(symbol = "项目管理员及联系方式", desc = "")
	public String getGlAndPhone() {
		return glAndPhone;
	}

	public void setGlAndPhone(String glAndPhone) {
		this.glAndPhone = glAndPhone;
	}

	@Column(name = "EXAMINE_TIME")
	@FieldProp(symbol = "技术专业审查时间", desc = "")
	public String getExamineTime() {
		return examineTime;
	}

	public void setExamineTime(String examineTime) {
		this.examineTime = examineTime;
	}

	@Column(name = "APPROVE_TIME")
	@FieldProp(symbol = "管理专业审查时间", desc = "")
	public String getApproveTime() {
		return approveTime;
	}

	public void setApproveTime(String approveTime) {
		this.approveTime = approveTime;
	}

	@Column(name = "PROJECT_STAGE")
	@FieldProp(symbol = "项目目前进展阶段", desc = "")
	public String getProjectStage() {
		return projectStage;
	}


	public void setProjectStage(String projectStage) {
		this.projectStage = projectStage;
	}


	@Column(name = "INVESTMENT_TOTAL")
	@FieldProp(symbol = "总研发经费已投入", desc = "")
	public Double getInvestmentTotal() {
		return investmentTotal;
	}

	public void setInvestmentTotal(Double investmentTotal) {
		this.investmentTotal = investmentTotal;
	}

	@Column(name = "YSXJJXY")
	@FieldProp(symbol = "已实现经济效益", desc = "")
	public Double getYsxjjxy() {
		return ysxjjxy;
	}

	public void setYsxjjxy(Double ysxjjxy) {
		this.ysxjjxy = ysxjjxy;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "CHARGE_DEPARTNENT")
	@FieldProp(symbol = "审核单位", desc = "")
	public Organization getChargeDepartnent() {
		return chargeDepartnent;
	}

	public void setChargeDepartnent(Organization chargeDepartnent) {
		this.chargeDepartnent = chargeDepartnent;
	}

	@Column(name = "RECOMMEND_TYPE")
	@FieldProp(symbol = "推荐类型", desc = "")
	public String getRecommendType() {
		return recommendType;
	}

	public void setRecommendType(String recommendType) {
		this.recommendType = recommendType;
	}
	
	@Column(name = "BACK_Msg")
	@FieldProp(symbol = "sap上报返回信息", desc = "")
	public String getBackMsg() {
		return backMsg;
	}

	public void setBackMsg(String backMsg) {
		this.backMsg = backMsg;
	}
    
    @Column(name = "PROJECT_CODE")
	@FieldProp(symbol = "项目编号", desc = "")
	public String getProjectCode(){
		return projectCode; 
	}
	
	public void setProjectCode(String projectCode){
		this.projectCode=projectCode;
	}
    
    @Column(name = "PROJECT_NAME")
	@FieldProp(symbol = "项目名称", desc = "")
	public String getProjectName(){
		return projectName; 
	}
	
	public void setProjectName(String projectName){
		this.projectName=projectName;
	}
    
    @Column(name = "PROJECT_ANNUAL")
	@FieldProp(symbol = "项目年度", desc = "")
	public String getProjectAnnual(){
		return projectAnnual; 
	}
	
	public void setProjectAnnual(String projectAnnual){
		this.projectAnnual=projectAnnual;
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
	
	public void setPlatInstitution(ResearchPlat platInstitution){
		this.platInstitution=platInstitution;
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
    @JoinColumn(name = "BUSINESS")
	@FieldProp(symbol = "业务", desc = "")
	public SpecialtyDictionary getBusiness(){
		return business; 
	}
	
	public void setBusiness(SpecialtyDictionary business){
		this.business=business;
	}
    
    @Column(name = "PROEJCT_TYPE")
	@FieldProp(symbol = "项目类型", desc = "")
	public String getProejctType(){
		return proejctType; 
	}
	
	public void setProejctType(String proejctType){
		this.proejctType=proejctType;
	}
    
    @Column(name = "PROJECT_LEVEL")
	@FieldProp(symbol = "项目级别", desc = "")
	public String getProjectLevel(){
		return projectLevel; 
	}
	
	public void setProjectLevel(String projectLevel){
		this.projectLevel=projectLevel;
	}
    
    @Column(name = "RESEARCH_FOCUS")
	@FieldProp(symbol = "研发重点", desc = "")
	public String getResearchFocus(){
		return researchFocus; 
	}
	
	public void setResearchFocus(String researchFocus){
		this.researchFocus=researchFocus;
	}
    
    @Column(name = "RESEARCH_WAY")
	@FieldProp(symbol = "研发方式", desc = "")
	public String getResearchWay(){
		return researchWay; 
	}
	
	public void setResearchWay(String researchWay){
		this.researchWay=researchWay;
	}
    
    @Column(name = "RESEARCH_CONTENT")
	@FieldProp(symbol = "项目研究内容", desc = "")
	public String getResearchContent(){
		return researchContent; 
	}
	
	public void setResearchContent(String researchContent){
		this.researchContent=researchContent;
	}
    
    @Column(name = "START_TIME")
	@FieldProp(symbol = "项目计划开始时间", desc = "")
	public String getStartTime(){
		return startTime; 
	}
	
	public void setStartTime(String startTime){
		this.startTime=startTime;
	}
    
    @Column(name = "END_TIME")
	@FieldProp(symbol = "项目计划结束时间", desc = "")
	public String getEndTime(){
		return endTime; 
	}
	
	public void setEndTime(String endTime){
		this.endTime=endTime;
	}
    
    @Column(name = "PROJECT_STATUS")
	@FieldProp(symbol = "项目状态", desc = "")
	public String getProjectStatus(){
		return projectStatus; 
	}
	
	public void setProjectStatus(String projectStatus){
		this.projectStatus=projectStatus;
	}
    
    @Column(name = "PROJECT_PROGRESS")
	@FieldProp(symbol = "项目进度", desc = "")
	public String getProjectProgress(){
		return projectProgress; 
	}
	
	public void setProjectProgress(String projectProgress){
		this.projectProgress=projectProgress;
	}
    
    @Column(name = "TECHNOLOGY")
	@FieldProp(symbol = "技术水平", desc = "")
	public String getTechnology(){
		return technology; 
	}
	
	public void setTechnology(String technology){
		this.technology=technology;
	}
    
    @Column(name = "PROVINCE_IDENTIFY")
	@FieldProp(symbol = "省部级鉴定项目", desc = "")
	public Long getProvinceIdentify(){
		return provinceIdentify; 
	}
	
	public void setProvinceIdentify(Long provinceIdentify){
		this.provinceIdentify=provinceIdentify;
	}
    
    @Column(name = "HALL_IDENTIFY")
	@FieldProp(symbol = "厅局级鉴定项目", desc = "")
	public Long getHallIdentify(){
		return hallIdentify; 
	}
	
	public void setHallIdentify(Long hallIdentify){
		this.hallIdentify=hallIdentify;
	}
    
    @Column(name = "INVENTION_PATENT")
	@FieldProp(symbol = "发明专利", desc = "")
	public Long getInventionPatent(){
		return inventionPatent; 
	}
	
	public void setInventionPatent(Long inventionPatent){
		this.inventionPatent=inventionPatent;
	}
    
    @Column(name = "UTILITY_PATENT")
	@FieldProp(symbol = "实用新型专利", desc = "")
	public Long getUtilityPatent(){
		return utilityPatent; 
	}
	
	public void setUtilityPatent(Long utilityPatent){
		this.utilityPatent=utilityPatent;
	}
    
    @Column(name = "NATION_PAPER")
	@FieldProp(symbol = "国家级论文", desc = "")
	public Long getNationPaper(){
		return nationPaper; 
	}
	
	public void setNationPaper(Long nationPaper){
		this.nationPaper=nationPaper;
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
    
    @Column(name = "EXAMINE_USER")
	@FieldProp(symbol = "审核人", desc = "")
	public String getExamineUser(){
		return examineUser; 
	}
	
	public void setExamineUser(String examineUser){
		this.examineUser=examineUser;
	}
    
    @Column(name = "EXAMINE_SUG")
	@FieldProp(symbol = "审核意见", desc = "")
	public String getExamineSug(){
		return examineSug; 
	}
	
	public void setExamineSug(String examineSug){
		this.examineSug=examineSug;
	}
    
    @Column(name = "APPROVE_USER")
	@FieldProp(symbol = "审批人", desc = "")
	public String getApproveUser(){
		return approveUser; 
	}
	
	public void setApproveUser(String approveUser){
		this.approveUser=approveUser;
	}
    
    @Column(name = "APPROVE_SUG")
	@FieldProp(symbol = "审批意见", desc = "")
	public String getApproveSug(){
		return approveSug; 
	}
	
	public void setApproveSug(String approveSug){
		this.approveSug=approveSug;
	}
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
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
	public List<ProjectPartners> getProjectPartners() {
		return projectPartners;
	}

	public void setProjectPartners(List<ProjectPartners> projectPartners) {
		this.projectPartners = projectPartners;
	}
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	public List<ProjectTalent> getProjectTalent() {
		return projectTalent;
	}

	public void setProjectTalent(List<ProjectTalent> projectTalent) {
		this.projectTalent = projectTalent;
	}
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	public List<ProjectFunds> getProjectFunds() {
		return projectFunds;
	}


	public void setProjectFunds(List<ProjectFunds> projectFunds) {
		this.projectFunds = projectFunds;
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
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	public List<ProjectStage> getProjectStages() {
		return projectStages;
	}

	public void setProjectStages(List<ProjectStage> projectStages) {
		this.projectStages = projectStages;
	}
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	public List<ProjectCostTotal> getProjectCostTotal() {
		return projectCostTotal;
	}

	public void setProjectCostTotal(List<ProjectCostTotal> projectCostTotal) {
		this.projectCostTotal = projectCostTotal;
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
