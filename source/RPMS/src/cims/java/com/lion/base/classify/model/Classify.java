package com.lion.base.classify.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cascade;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.module.model.Module;
import com.lion.system.organization.model.Organization;

/**
 * @description : 分类定义实体类
 * @date : 2013-9-23上午10:02:27
 * @author : 辛尔青
 */
@Entity
@Table(name = "BASE_CLASSIFY")
@ModelProp(symbol = "分类定义", desc = "", daoId = "classifyDao", daoClass = "")

public class Classify extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = 2631774830234620758L;
	private Organization organization; //单位;	
	private String reportDate; //日期;	
	private String reportStatus; //上报状态;	
	private Classify parent; //父节点;	
	private String classifyCd; //分类编号;	
	private String classifyName; //分类名称;	
	private String classifyTypeCd; //类型;	
	private Long sort; //排序;	
	private String remark; //备注;	
	private String reportUser; //审批人;	
	private String reportSuggestions; //审批意见;	
	private String valid; //是否有效;	
	private String systemType; //系统分类;
	private Module module;//所属模块; 
	private String unit;//计量单位; 
	private boolean leaf;//是否是叶子节点；
	private Set<Classify> children = new HashSet<Classify>();
	
	public Classify() {
	}
	
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "单位", desc = "")
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
    
    @Column(name = "REPORT_DATE")
	@FieldProp(symbol = "日期", desc = "")
	public String getReportDate(){
		return reportDate; 
	}
	
	public void setReportDate(String reportDate){
		this.reportDate=reportDate;
	}
    
    @Column(name = "REPORT_STATUS")
	@FieldProp(symbol = "上报状态", desc = "")
	public String getReportStatus(){
		return reportStatus; 
	}
	
	public void setReportStatus(String reportStatus){
		this.reportStatus=reportStatus;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PARENT")
	@FieldProp(symbol = "父节点", desc = "")
	public Classify getParent(){
		return parent; 
	}
	
	public void setParent(Classify parent){
		this.parent=parent;
	}
    
    @Column(name = "CLASSIFY_CD")
	@FieldProp(symbol = "分类编号", desc = "")
	public String getClassifyCd(){
		return classifyCd; 
	}
	
	public void setClassifyCd(String classifyCd){
		this.classifyCd=classifyCd;
	}
    
    @Column(name = "CLASSIFY_NAME")
	@FieldProp(symbol = "分类名称", desc = "")
	public String getClassifyName(){
		return classifyName; 
	}
	
	public void setClassifyName(String classifyName){
		this.classifyName=classifyName;
	}
    
    @Column(name = "CLASSIFY_TYPE_CD")
	@FieldProp(symbol = "类型", desc = "")
	public String getClassifyTypeCd(){
		return classifyTypeCd; 
	}
	
	public void setClassifyTypeCd(String classifyTypeCd){
		this.classifyTypeCd=classifyTypeCd;
	}
    
    @Column(name = "SORT")
	@FieldProp(symbol = "排序", desc = "")
	public Long getSort(){
		return sort; 
	}
	
	public void setSort(Long sort){
		this.sort=sort;
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
	@FieldProp(symbol = "审批人", desc = "")
	public String getReportUser(){
		return reportUser; 
	}
	
	public void setReportUser(String reportUser){
		this.reportUser=reportUser;
	}
    
    @Column(name = "REPORT_SUGGESTIONS")
	@FieldProp(symbol = "审批意见", desc = "")
	public String getReportSuggestions(){
		return reportSuggestions; 
	}
	
	public void setReportSuggestions(String reportSuggestions){
		this.reportSuggestions=reportSuggestions;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
	}
    
	@Column(name = "SYSTEM_TYPE")
	@FieldProp(symbol = "系统分类", desc = "")
	public String getSystemType(){
		return systemType; 
	}
	
	public void setSystemType(String systemType){
		this.systemType = systemType;
	}
	
	@OneToMany(mappedBy = "parent", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@OrderBy(value = "classifyCd asc")
	public Set<Classify> getChildren() {
		return children;
	}

	public void setChildren(Set<Classify> children) {
		this.children = children;
	}
	

	@Column(name = "UNIT")
	@FieldProp(symbol = "计量单位", desc = "")
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Transient
	public boolean isLeaf() {
		return false;
	}


	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}


	@Transient
	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}
	
}
