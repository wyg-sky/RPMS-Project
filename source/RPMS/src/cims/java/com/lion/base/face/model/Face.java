package com.lion.base.face.model;

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
 * @description : 工作面信息实体类
 * @date : 2013-9-16下午05:10:39
 * @author : 辛尔青
 */
@Entity
@Table(name = "BASE_FACE")
@ModelProp(symbol = "工作面基础信息", desc = "", daoId = "faceDao", daoClass = "")

public class Face extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = 3352339006436976440L;
	private Organization organization; //单位;	
	private String reportDate; //日期;	
	private String reportStatus; //上报状态;	
	private String faceCd; //工作面编号;	
	private String faceName; //工作面名称;	
	private String faceSimp; //工作面简拼;	
	private String coalSeamCd; //煤层编号;	
	private String coalSeamGrpCd; //煤层分组;	
	private String coalSeamKindCd; //煤层性质;	
	private String faceLength; //工作面长度;	
	private Double boostLength; //预计推进长度;	
	private Double repeatSpan; //循环进度;	
	private String horizontalCd; //所属水平面;	
	private String mineAreaCd; //所属采区;	
	private String suppCd; //支护方式;	
	private String declineCd; //落煤方式;	
	private Double coalDeep; //煤厚(m);	
	private Double specificGravity; //容重(t/m3);	
	private String ifCal; //是否核子秤计量;	
	private String obliquity; //倾角(度);	
	private String productionDate; //投产日期;	
	private String beginDate; //开始日期;	
	private String endDate; //结束日期;	
	private Double coalStore; //可采储量(万吨);	
	private String remark; //备注;	
	private String statusCd; //生产状态;	
	private String reportUser; //审批人;	
	private String reportSuggestions; //审批意见;	
	private String valid; //是否有效;	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public Face() {
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
    
    @Column(name = "FACE_CD")
	@FieldProp(symbol = "工作面编号", desc = "")
	public String getFaceCd(){
		return faceCd; 
	}
	
	public void setFaceCd(String faceCd){
		this.faceCd=faceCd;
	}
    
    @Column(name = "FACE_NAME")
	@FieldProp(symbol = "工作面名称", desc = "")
	public String getFaceName(){
		return faceName; 
	}
	
	public void setFaceName(String faceName){
		this.faceName=faceName;
	}
    
    @Column(name = "FACE_SIMP")
	@FieldProp(symbol = "工作面简拼", desc = "")
	public String getFaceSimp(){
		return faceSimp; 
	}
	
	public void setFaceSimp(String faceSimp){
		this.faceSimp=faceSimp;
	}
    
    @Column(name = "COAL_SEAM_CD")
	@FieldProp(symbol = "煤层编号", desc = "")
	public String getCoalSeamCd(){
		return coalSeamCd; 
	}
	
	public void setCoalSeamCd(String coalSeamCd){
		this.coalSeamCd=coalSeamCd;
	}
    
    @Column(name = "COAL_SEAM_GRP_CD")
	@FieldProp(symbol = "煤层分组", desc = "")
	public String getCoalSeamGrpCd(){
		return coalSeamGrpCd; 
	}
	
	public void setCoalSeamGrpCd(String coalSeamGrpCd){
		this.coalSeamGrpCd=coalSeamGrpCd;
	}
    
    @Column(name = "COAL_SEAM_KIND_CD")
	@FieldProp(symbol = "煤层性质", desc = "")
	public String getCoalSeamKindCd(){
		return coalSeamKindCd; 
	}
	
	public void setCoalSeamKindCd(String coalSeamKindCd){
		this.coalSeamKindCd=coalSeamKindCd;
	}
    
    @Column(name = "FACE_LENGTH")
	@FieldProp(symbol = "工作面长度", desc = "")
	public String getFaceLength(){
		return faceLength; 
	}
	
	public void setFaceLength(String faceLength){
		this.faceLength=faceLength;
	}
    
    @Column(name = "BOOST_LENGTH")
	@FieldProp(symbol = "预计推进长度", desc = "")
	public Double getBoostLength(){
		return boostLength; 
	}
	
	public void setBoostLength(Double boostLength){
		this.boostLength=boostLength;
	}
    
    @Column(name = "REPEAT_SPAN")
	@FieldProp(symbol = "循环进度", desc = "")
	public Double getRepeatSpan(){
		return repeatSpan; 
	}
	
	public void setRepeatSpan(Double repeatSpan){
		this.repeatSpan=repeatSpan;
	}
    
    @Column(name = "HORIZONTAL_CD")
	@FieldProp(symbol = "所属水平面", desc = "")
	public String getHorizontalCd(){
		return horizontalCd; 
	}
	
	public void setHorizontalCd(String horizontalCd){
		this.horizontalCd=horizontalCd;
	}
    
    @Column(name = "MINE_AREA_CD")
	@FieldProp(symbol = "所属采区", desc = "")
	public String getMineAreaCd(){
		return mineAreaCd; 
	}
	
	public void setMineAreaCd(String mineAreaCd){
		this.mineAreaCd=mineAreaCd;
	}
    
    @Column(name = "SUPP_CD")
	@FieldProp(symbol = "支护方式", desc = "")
	public String getSuppCd(){
		return suppCd; 
	}
	
	public void setSuppCd(String suppCd){
		this.suppCd=suppCd;
	}
    
    @Column(name = "DECLINE_CD")
	@FieldProp(symbol = "落煤方式", desc = "")
	public String getDeclineCd(){
		return declineCd; 
	}
	
	public void setDeclineCd(String declineCd){
		this.declineCd=declineCd;
	}
    
    @Column(name = "COAL_DEEP")
	@FieldProp(symbol = "煤厚(m)", desc = "")
	public Double getCoalDeep(){
		return coalDeep; 
	}
	
	public void setCoalDeep(Double coalDeep){
		this.coalDeep=coalDeep;
	}
    
    @Column(name = "SPECIFIC_GRAVITY")
	@FieldProp(symbol = "容重(t/m3)", desc = "")
	public Double getSpecificGravity(){
		return specificGravity; 
	}
	
	public void setSpecificGravity(Double specificGravity){
		this.specificGravity=specificGravity;
	}
    
    @Column(name = "IF_CAL")
	@FieldProp(symbol = "是否核子秤计量", desc = "")
	public String getIfCal(){
		return ifCal; 
	}
	
	public void setIfCal(String ifCal){
		this.ifCal=ifCal;
	}
    
    @Column(name = "OBLIQUITY")
	@FieldProp(symbol = "倾角(度)", desc = "")
	public String getObliquity(){
		return obliquity; 
	}
	
	public void setObliquity(String obliquity){
		this.obliquity=obliquity;
	}
    
    @Column(name = "PRODUCTION_DATE")
	@FieldProp(symbol = "投产日期", desc = "")
	public String getProductionDate(){
		return productionDate; 
	}
	
	public void setProductionDate(String productionDate){
		this.productionDate=productionDate;
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
    
    @Column(name = "COAL_STORE")
	@FieldProp(symbol = "可采储量(万吨)", desc = "")
	public Double getCoalStore(){
		return coalStore; 
	}
	
	public void setCoalStore(Double coalStore){
		this.coalStore=coalStore;
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
