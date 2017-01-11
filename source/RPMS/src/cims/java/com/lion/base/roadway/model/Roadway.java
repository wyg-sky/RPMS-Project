package com.lion.base.roadway.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description : 巷道基础信息实体类
 * @date : 2013-9-17下午03:11:32
 * @author : 辛尔青
 */
@Entity
@Table(name = "BASE_ROADWAY")
@ModelProp(symbol = "巷道基础信息")

public class Roadway extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 3352339006436976440L;
	private Organization organization; //单位;	
	private String reportDate; //日期;	
	private String reportStatus; //上报状态;	
	private String roadway; //巷道编号;	
	private String roadwaySimp; //巷道简拼;	
	private String roadwayName; //巷道名称;	
	private String roadwayTypeCd; //巷道类别;	
	private String designLength; //设计长度;	
	private String horizontalCd; //水平面;	
	private String coalSeamCd; //煤层;	
	private String drivageTypeCd; //掘进方式;	
	private String digLoadCd; //扒装方式;	
	private String lithologyCd; //岩性;	
	private String suppCd; //支护方式;	
	private String transportCd; //运输方式;	
	private String sectionSquare; //断面(平方米);	
	private String checkDate; //验收时间;	
	private String beginDate; //开始日期;	
	private String endDate; //结束日期;	
	private String remark; //备注;	
	private String statusCd; //生产状态;	
	private String reportUser; //审批人;	
	private String reportSuggestions; //审批意见;	
	private String valid; //是否有效;
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public Roadway() {
	}
	
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "单位", desc = "")
	public Organization getOrganization(){
		return organization; 
	}
	
	public void setOrganization(Organization organization){
		this.organization=organization;
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
    
    @Column(name = "ROADWAY")
	@FieldProp(symbol = "巷道编号", desc = "")
	public String getRoadway(){
		return roadway; 
	}
	
	public void setRoadway(String roadway){
		this.roadway=roadway;
	}
    
    @Column(name = "ROADWAY_SIMP")
	@FieldProp(symbol = "巷道简拼", desc = "")
	public String getRoadwaySimp(){
		return roadwaySimp; 
	}
	
	public void setRoadwaySimp(String roadwaySimp){
		this.roadwaySimp=roadwaySimp;
	}
    
    @Column(name = "ROADWAY_NAME")
	@FieldProp(symbol = "巷道名称", desc = "")
	public String getRoadwayName(){
		return roadwayName; 
	}
	
	public void setRoadwayName(String roadwayName){
		this.roadwayName=roadwayName;
	}
    
    @Column(name = "ROADWAY_TYPE_CD")
	@FieldProp(symbol = "巷道类别", desc = "")
	public String getRoadwayTypeCd(){
		return roadwayTypeCd; 
	}
	
	public void setRoadwayTypeCd(String roadwayTypeCd){
		this.roadwayTypeCd=roadwayTypeCd;
	}
    
    @Column(name = "DESIGN_LENGTH")
	@FieldProp(symbol = "设计长度", desc = "")
	public String getDesignLength(){
		return designLength; 
	}
	
	public void setDesignLength(String designLength){
		this.designLength=designLength;
	}
    
    @Column(name = "HORIZONTAL_CD")
	@FieldProp(symbol = "水平面", desc = "")
	public String getHorizontalCd(){
		return horizontalCd; 
	}
	
	public void setHorizontalCd(String horizontalCd){
		this.horizontalCd=horizontalCd;
	}
    
    @Column(name = "COAL_SEAM_CD")
	@FieldProp(symbol = "煤层", desc = "")
	public String getCoalSeamCd(){
		return coalSeamCd; 
	}
	
	public void setCoalSeamCd(String coalSeamCd){
		this.coalSeamCd=coalSeamCd;
	}
    
    @Column(name = "DRIVAGE_TYPE_CD")
	@FieldProp(symbol = "掘进方式", desc = "")
	public String getDrivageTypeCd(){
		return drivageTypeCd; 
	}
	
	public void setDrivageTypeCd(String drivageTypeCd){
		this.drivageTypeCd=drivageTypeCd;
	}
    
    @Column(name = "DIG_LOAD_CD")
	@FieldProp(symbol = "扒装方式", desc = "")
	public String getDigLoadCd(){
		return digLoadCd; 
	}
	
	public void setDigLoadCd(String digLoadCd){
		this.digLoadCd=digLoadCd;
	}
    
    @Column(name = "LITHOLOGY_CD")
	@FieldProp(symbol = "岩性", desc = "")
	public String getLithologyCd(){
		return lithologyCd; 
	}
	
	public void setLithologyCd(String lithologyCd){
		this.lithologyCd=lithologyCd;
	}
    
    @Column(name = "SUPP_CD")
	@FieldProp(symbol = "支护方式", desc = "")
	public String getSuppCd(){
		return suppCd; 
	}
	
	public void setSuppCd(String suppCd){
		this.suppCd=suppCd;
	}
    
    @Column(name = "TRANSPORT_CD")
	@FieldProp(symbol = "运输方式", desc = "")
	public String getTransportCd(){
		return transportCd; 
	}
	
	public void setTransportCd(String transportCd){
		this.transportCd=transportCd;
	}
    
    @Column(name = "SECTION_SQUARE")
	@FieldProp(symbol = "断面(平方米)", desc = "")
	public String getSectionSquare(){
		return sectionSquare; 
	}
	
	public void setSectionSquare(String sectionSquare){
		this.sectionSquare=sectionSquare;
	}
    
    @Column(name = "CHECK_DATE")
	@FieldProp(symbol = "验收时间", desc = "")
	public String getCheckDate(){
		return checkDate; 
	}
	
	public void setCheckDate(String checkDate){
		this.checkDate=checkDate;
	}
    
    @Column(name = "BEGIN_DATE")
	@FieldProp(symbol = "开始日期", desc = "")
	public String getBeginDate(){
		return beginDate; 
	}
	
	public void setBeginDate(String beginDate){
		this.beginDate=beginDate;
	}
    
    @Column(name = "END_DATE")
	@FieldProp(symbol = "结束日期", desc = "")
	public String getEndDate(){
		return endDate; 
	}
	
	public void setEndDate(String endDate){
		this.endDate=endDate;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
    
    @Column(name = "STATUS_CD")
	@FieldProp(symbol = "生产状态", desc = "")
	public String getStatusCd(){
		return statusCd; 
	}
	
	public void setStatusCd(String statusCd){
		this.statusCd=statusCd;
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
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}
	
}
