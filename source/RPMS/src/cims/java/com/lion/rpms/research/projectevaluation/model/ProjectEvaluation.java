package com.lion.rpms.research.projectevaluation.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @description : 项目后评价管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 16:30:07
 */
 
@Entity
@Table(name = "RPMS_PROJECT_EVALUATION")
@ModelProp(symbol = "项目后评价")
public class ProjectEvaluation extends AuditableSimpleEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private Project projectId; //项目编号;	
	private String economicBenefits; //项目经济效益;	
	private String benefitsSituation; //项目经济效益实现情况;	
	private String organizationEvaluation; //项目组织评价;	
	private String comprehensiveEvaluation; //项目综合评价;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String status; //状态;	
	private String organization; //组织单位;	
	private String remark; //备注;	
	private String evaluationType ; //评价等级;

	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ProjectEvaluation() {
	}
	
	@Column(name = "EVALUATION_TYPE")
	@FieldProp(symbol = "评价等级", desc = "")
	public String getEvaluationType() {
		return evaluationType;
	}

	public void setEvaluationType(String evaluationType) {
		this.evaluationType = evaluationType;
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
    
    @Column(name = "ECONOMIC_BENEFITS")
	@FieldProp(symbol = "项目经济效益", desc = "")
	public String getEconomicBenefits(){
		return economicBenefits; 
	}
	
	public void setEconomicBenefits(String economicBenefits){
		this.economicBenefits=economicBenefits;
	}
    
    @Column(name = "BENEFITS_SITUATION")
	@FieldProp(symbol = "项目经济效益实现情况", desc = "")
	public String getBenefitsSituation(){
		return benefitsSituation; 
	}
	
	public void setBenefitsSituation(String benefitsSituation){
		this.benefitsSituation=benefitsSituation;
	}
    
    @Column(name = "ORGANIZATION_EVALUATION")
	@FieldProp(symbol = "项目组织评价", desc = "")
	public String getOrganizationEvaluation(){
		return organizationEvaluation; 
	}
	
	public void setOrganizationEvaluation(String organizationEvaluation){
		this.organizationEvaluation=organizationEvaluation;
	}
    
    @Column(name = "COMPREHENSIVE_EVALUATION")
	@FieldProp(symbol = "项目综合评价", desc = "")
	public String getComprehensiveEvaluation(){
		return comprehensiveEvaluation; 
	}
	
	public void setComprehensiveEvaluation(String comprehensiveEvaluation){
		this.comprehensiveEvaluation=comprehensiveEvaluation;
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
    
    @Column(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public String getOrganization(){
		return organization; 
	}
	
	public void setOrganization(String organization){
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
	
	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
