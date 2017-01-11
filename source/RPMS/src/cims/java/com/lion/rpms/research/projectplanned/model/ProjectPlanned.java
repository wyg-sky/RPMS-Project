package com.lion.rpms.research.projectplanned.model;

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
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.research.projectplan.model.ProjectPlan;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @ClassName: ProjectPlanned 
 * @description :创新计划实体类
 * @author : 王圣磊
 * @date : 2015-04-03
 */
@Entity
@Table(name = "RPMS_PROJECT_PLANNED")
@ModelProp(symbol = "创新计划")

public class ProjectPlanned extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -4616616251358446281L;
	private ProjectPlan planId; //规划ID;	
	private String plannedYear; //计划年度;	
	private String plannedName; //计划名称;	
	private String plannedType; //计划类型;	
	private String plannedDept; //编制单位;	
	private String plannedTime; //编制时间;	
	private String grade; //计划等级;	
	private String plannedStatus; //实施状态;	
	private String plannedTarget; //发展目标;	
	private String mainContent; //主要内容;	
	private String valid; //是否有效;	
	private String status; //状态;	
	private ResearchPlat platInstitution; //组织单位;
	private String remark; //备注;	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ProjectPlanned() {
	}
	
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "PLAN_ID")
	@FieldProp(symbol = "规划ID", desc = "")
	public ProjectPlan getPlanId(){
		return planId; 
	}
	
	public void setPlanId(ProjectPlan planId){
		this.planId=planId;
	}
    
    @Column(name = "PLANNED_YEAR")
	@FieldProp(symbol = "计划年度", desc = "")
	public String getPlannedYear(){
		return plannedYear; 
	}
	
	public void setPlannedYear(String plannedYear){
		this.plannedYear=plannedYear;
	}
    
    @Column(name = "PLANNED_NAME")
	@FieldProp(symbol = "计划名称", desc = "")
	public String getPlannedName(){
		return plannedName; 
	}
	
	public void setPlannedName(String plannedName){
		this.plannedName=plannedName;
	}
    
    @Column(name = "PLANNED_TYPE")
	@FieldProp(symbol = "计划类型", desc = "")
	public String getPlannedType(){
		return plannedType; 
	}
	
	public void setPlannedType(String plannedType){
		this.plannedType=plannedType;
	}
    
    @Column(name = "PLANNED_DEPT")
	@FieldProp(symbol = "编制单位", desc = "")
	public String getPlannedDept(){
		return plannedDept; 
	}
	
	public void setPlannedDept(String plannedDept){
		this.plannedDept=plannedDept;
	}
    
    @Column(name = "PLANNED_TIME")
	@FieldProp(symbol = "编制时间", desc = "")
	public String getPlannedTime(){
		return plannedTime; 
	}
	
	public void setPlannedTime(String plannedTime){
		this.plannedTime=plannedTime;
	}
    
    @Column(name = "GRADE")
	@FieldProp(symbol = "计划等级", desc = "")
	public String getGrade(){
		return grade; 
	}
	
	public void setGrade(String grade){
		this.grade=grade;
	}
    
    @Column(name = "PLANNED_STATUS")
	@FieldProp(symbol = "实施状态", desc = "")
	public String getPlannedStatus(){
		return plannedStatus; 
	}
	
	public void setPlannedStatus(String plannedStatus){
		this.plannedStatus=plannedStatus;
	}
    
    @Column(name = "PLANNED_TARGET")
	@FieldProp(symbol = "发展目标", desc = "")
	public String getPlannedTarget(){
		return plannedTarget; 
	}
	
	public void setPlannedTarget(String plannedTarget){
		this.plannedTarget=plannedTarget;
	}
    
    @Column(name = "MAIN_CONTENT")
	@FieldProp(symbol = "主要内容", desc = "")
	public String getMainContent(){
		return mainContent; 
	}
	
	public void setMainContent(String mainContent){
		this.mainContent=mainContent;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
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
    @JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution(){
		return platInstitution; 
	}
	
	public void setPlatInstitution(ResearchPlat platInstitution){
		this.platInstitution=platInstitution;
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
