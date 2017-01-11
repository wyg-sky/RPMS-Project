package com.lion.rpms.research.projectfile.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @ClassName: ProjectFile 
 * @description :通知管理实体类
 * @author : 王圣磊
 * @date : 2015-03-10
 */
@Entity
@Table(name = "RPMS_PROJECT_FILE")
@ModelProp(symbol = "文件通知管理")

public class ProjectFile extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	private String fileCode; //文件编号;	
	private String fileName; //文件名称;	
	private String fileTime; //文件时间;	
	private String tileType; //文件类型;	
	private String fileContext; //文件内容;	
	private String approveUser; //审批人;	
	private String status; //状态;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String remark; //备注;	
	private ResearchPlat researchPlat; //分中心;
	private Organization organization; //组织单位;
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	private List<ProjectFileLine> projectFileLine = new ArrayList<ProjectFileLine>();
	
	public ProjectFile() {
	}
	
    
    @Column(name = "FILE_CODE")
	@FieldProp(symbol = "文件编号", desc = "")
	public String getFileCode(){
		return fileCode; 
	}
	
	public void setFileCode(String fileCode){
		this.fileCode=fileCode;
	}
    
    @Column(name = "FILE_NAME")
	@FieldProp(symbol = "文件名称", desc = "")
	public String getFileName(){
		return fileName; 
	}
	
	public void setFileName(String fileName){
		this.fileName=fileName;
	}
    
    @Column(name = "FILE_TIME")
	@FieldProp(symbol = "文件时间", desc = "")
	public String getFileTime(){
		return fileTime; 
	}
	
	public void setFileTime(String fileTime){
		this.fileTime=fileTime;
	}
    
    @Column(name = "TILE_TYPE")
	@FieldProp(symbol = "文件类型", desc = "")
	public String getTileType(){
		return tileType; 
	}
	
	public void setTileType(String tileType){
		this.tileType=tileType;
	}
    
    @Column(name = "FILE_CONTEXT")
	@FieldProp(symbol = "文件内容", desc = "")
	public String getFileContext(){
		return fileContext; 
	}
	
	public void setFileContext(String fileContext){
		this.fileContext=fileContext;
	}
    
    @Column(name = "APPROVE_USER")
	@FieldProp(symbol = "审批人", desc = "")
	public String getApproveUser(){
		return approveUser; 
	}
	
	public void setApproveUser(String approveUser){
		this.approveUser=approveUser;
	}
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
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
	@JoinColumn(name = "RESEARCHPLAT")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getResearchPlat() {
		return researchPlat;
	}


	public void setResearchPlat(ResearchPlat researchPlat) {
		this.researchPlat = researchPlat;
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
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<ProjectFileLine> getProjectFileLine() {
		return projectFileLine;
	}
	public void setProjectFileLine(List<ProjectFileLine> projectFileLine) {
		this.projectFileLine = projectFileLine;
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