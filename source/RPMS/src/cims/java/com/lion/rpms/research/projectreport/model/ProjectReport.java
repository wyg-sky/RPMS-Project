package com.lion.rpms.research.projectreport.model;

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
import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description : 外部项目申报实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 14:27:23
 */
@Entity
@Table(name = "RPMS_PROJECT_REPORT")
@ModelProp(symbol = "外部项目申报")
public class ProjectReport extends AuditableSimpleEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private Project projectId; //项目编号;	
	private String outprojectCode; //外部项目编号;	
	private String outfileCode; //外部项目审批文件编号;	
	private String outdept; //外部立项部门;	
	private String outannual; //外部立项年度;	
	private String projectLevel; //项目级别;	
	private String outbatch; //批次;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String projectStatus; //项目状态;	
	private String status; //状态;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;
	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	private List<ProjectItem> projectItems = new ArrayList<ProjectItem>(); //文档附件
	
	public ProjectReport() {
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
    
    @Column(name = "OUTPROJECT_CODE")
	@FieldProp(symbol = "外部项目编号", desc = "")
	public String getOutprojectCode(){
		return outprojectCode; 
	}
	
	public void setOutprojectCode(String outprojectCode){
		this.outprojectCode=outprojectCode;
	}
    
    @Column(name = "OUTFILE_CODE")
	@FieldProp(symbol = "外部项目审批文件编号", desc = "")
	public String getOutfileCode(){
		return outfileCode; 
	}
	
	public void setOutfileCode(String outfileCode){
		this.outfileCode=outfileCode;
	}
    
    @Column(name = "OUTDEPT")
	@FieldProp(symbol = "外部立项部门", desc = "")
	public String getOutdept(){
		return outdept; 
	}
	
	public void setOutdept(String outdept){
		this.outdept=outdept;
	}
    
    @Column(name = "OUTANNUAL")
	@FieldProp(symbol = "外部立项年度", desc = "")
	public String getOutannual(){
		return outannual; 
	}
	
	public void setOutannual(String outannual){
		this.outannual=outannual;
	}
    
    @Column(name = "PROJECT_LEVEL")
	@FieldProp(symbol = "项目级别", desc = "")
	public String getProjectLevel(){
		return projectLevel; 
	}
	
	public void setProjectLevel(String projectLevel){
		this.projectLevel=projectLevel;
	}
    
    @Column(name = "OUTBATCH")
	@FieldProp(symbol = "批次", desc = "")
	public String getOutbatch(){
		return outbatch; 
	}
	
	public void setOutbatch(String outbatch){
		this.outbatch=outbatch;
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
    
    @Column(name = "PROJECT_STATUS")
	@FieldProp(symbol = "项目状态", desc = "")
	public String getProjectStatus(){
		return projectStatus; 
	}
	
	public void setProjectStatus(String projectStatus){
		this.projectStatus=projectStatus;
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
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
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
	
	@Override
	public boolean equals(Object o) {
		return false;
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
	public int hashCode() {
		return 0;
	}
	
}
