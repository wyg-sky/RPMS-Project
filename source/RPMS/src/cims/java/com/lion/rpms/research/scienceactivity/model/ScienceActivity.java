package com.lion.rpms.research.scienceactivity.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;

/**
 * @ClassName: ScienceActivity 
 * @description :科技活动费用实体类
 * @author : 王圣磊
 * @date : 2015-05-18
 */
@Entity
@Table(name = "RPMS_SCIENCE_ACTIVITY")
@ModelProp(symbol = "科技活动费用情况表")

public class ScienceActivity extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -3407963473649720245L;
	private String projectId; //项目编号;	
	private String dept; //单位;	
	private String years; //年月;	
	private Double businessIncome; //主营业务收入;	
	private Double psesonCost; //科技人员费用;	
	private Double scidencService; //科技管理和服务人员;	
	private Double workFee; //熟练技术工人;	
	private Double designFee; //设计费;	
	private Double deguggingFee; //装备调试费;	
	private Double materialFee; //投入原材料及辅助材料;	
	private Double gasElectricity; //水煤气和电;	
	private Double mouleExam; //试验模具等费用及检验费;	
	private Double instrumentEqui; //仪器和设备折旧;	
	private Double useBuilding; //在用建筑物折旧;	
	private Double equiRental; //仪器、设备租用费;	
	private Double faclitiesFee; //研发设施长期摊销;	
	private Double technologyFee; //购入专有技术等费用摊销;	
	private Double officeFee; //办公、通信、申请专利等相关费用;	
	private Double enterpriceFee; //支付境内企业机构;	
	private Double schoolFee; //支付境内高等院校;	
	private Double abroadFee; //支付境外支出;	
	private Double equiPrice; //购置仪器设备原价;	
	private Double governmentFunds; //来自政府资金;	
	private String countPerson; //统计负责人;	
	private String reportPerson; //填表人;	
	private String phone; //联系电话;	
	private String reportTime; //报出日期;	
	private String organization; //组织单位;	
	private String remark; //备注;	
	private Double buildingPrice; //建筑物原价;	
	private String status; //上报状态;	
	
	public ScienceActivity() {
	}
	
    
    @Column(name = "PROJECT_ID")
	@FieldProp(symbol = "项目编号", desc = "")
	public String getProjectId(){
		return projectId; 
	}
	
	public void setProjectId(String projectId){
		this.projectId=projectId;
	}
    
    @Column(name = "DEPT")
	@FieldProp(symbol = "单位", desc = "")
	public String getDept(){
		return dept; 
	}
	
	public void setDept(String dept){
		this.dept=dept;
	}
    
    @Column(name = "YEARS")
	@FieldProp(symbol = "年月", desc = "")
	public String getYears(){
		return years; 
	}
	
	public void setYears(String years){
		this.years=years;
	}
    
    @Column(name = "BUSINESS_INCOME")
	@FieldProp(symbol = "主营业务收入", desc = "")
	public Double getBusinessIncome(){
		return businessIncome; 
	}
	
	public void setBusinessIncome(Double businessIncome){
		this.businessIncome=businessIncome;
	}
    
    @Column(name = "PSESON_COST")
	@FieldProp(symbol = "科技人员费用", desc = "")
	public Double getPsesonCost(){
		return psesonCost; 
	}
	
	public void setPsesonCost(Double psesonCost){
		this.psesonCost=psesonCost;
	}
    
    @Column(name = "SCIDENC_SERVICE")
	@FieldProp(symbol = "科技管理和服务人员", desc = "")
	public Double getScidencService(){
		return scidencService; 
	}
	
	public void setScidencService(Double scidencService){
		this.scidencService=scidencService;
	}
    
    @Column(name = "WORK_FEE")
	@FieldProp(symbol = "熟练技术工人", desc = "")
	public Double getWorkFee(){
		return workFee; 
	}
	
	public void setWorkFee(Double workFee){
		this.workFee=workFee;
	}
    
    @Column(name = "DESIGN_FEE")
	@FieldProp(symbol = "设计费", desc = "")
	public Double getDesignFee(){
		return designFee; 
	}
	
	public void setDesignFee(Double designFee){
		this.designFee=designFee;
	}
    
    @Column(name = "DEGUGGING_FEE")
	@FieldProp(symbol = "装备调试费", desc = "")
	public Double getDeguggingFee(){
		return deguggingFee; 
	}
	
	public void setDeguggingFee(Double deguggingFee){
		this.deguggingFee=deguggingFee;
	}
    
    @Column(name = "MATERIAL_FEE")
	@FieldProp(symbol = "投入原材料及辅助材料", desc = "")
	public Double getMaterialFee(){
		return materialFee; 
	}
	
	public void setMaterialFee(Double materialFee){
		this.materialFee=materialFee;
	}
    
    @Column(name = "GAS_ELECTRICITY")
	@FieldProp(symbol = "水煤气和电", desc = "")
	public Double getGasElectricity(){
		return gasElectricity; 
	}
	
	public void setGasElectricity(Double gasElectricity){
		this.gasElectricity=gasElectricity;
	}
    
    @Column(name = "MOULE_EXAM")
	@FieldProp(symbol = "试验模具等费用及检验费", desc = "")
	public Double getMouleExam(){
		return mouleExam; 
	}
	
	public void setMouleExam(Double mouleExam){
		this.mouleExam=mouleExam;
	}
    
    @Column(name = "INSTRUMENT_EQUI")
	@FieldProp(symbol = "仪器和设备折旧", desc = "")
	public Double getInstrumentEqui(){
		return instrumentEqui; 
	}
	
	public void setInstrumentEqui(Double instrumentEqui){
		this.instrumentEqui=instrumentEqui;
	}
    
    @Column(name = "USE_BUILDING")
	@FieldProp(symbol = "在用建筑物折旧", desc = "")
	public Double getUseBuilding(){
		return useBuilding; 
	}
	
	public void setUseBuilding(Double useBuilding){
		this.useBuilding=useBuilding;
	}
    
    @Column(name = "EQUI_RENTAL")
	@FieldProp(symbol = "仪器、设备租用费", desc = "")
	public Double getEquiRental(){
		return equiRental; 
	}
	
	public void setEquiRental(Double equiRental){
		this.equiRental=equiRental;
	}
    
    @Column(name = "FACLITIES_FEE")
	@FieldProp(symbol = "研发设施长期摊销", desc = "")
	public Double getFaclitiesFee(){
		return faclitiesFee; 
	}
	
	public void setFaclitiesFee(Double faclitiesFee){
		this.faclitiesFee=faclitiesFee;
	}
    
    @Column(name = "TECHNOLOGY_FEE")
	@FieldProp(symbol = "购入专有技术等费用摊销", desc = "")
	public Double getTechnologyFee(){
		return technologyFee; 
	}
	
	public void setTechnologyFee(Double technologyFee){
		this.technologyFee=technologyFee;
	}
    
    @Column(name = "OFFICE_FEE")
	@FieldProp(symbol = "办公、通信、申请专利等相关费用", desc = "")
	public Double getOfficeFee(){
		return officeFee; 
	}
	
	public void setOfficeFee(Double officeFee){
		this.officeFee=officeFee;
	}
    
    @Column(name = "ENTERPRICE_FEE")
	@FieldProp(symbol = "支付境内企业机构", desc = "")
	public Double getEnterpriceFee(){
		return enterpriceFee; 
	}
	
	public void setEnterpriceFee(Double enterpriceFee){
		this.enterpriceFee=enterpriceFee;
	}
    
    @Column(name = "SCHOOL_FEE")
	@FieldProp(symbol = "支付境内高等院校", desc = "")
	public Double getSchoolFee(){
		return schoolFee; 
	}
	
	public void setSchoolFee(Double schoolFee){
		this.schoolFee=schoolFee;
	}
    
    @Column(name = "ABROAD_FEE")
	@FieldProp(symbol = "支付境外支出", desc = "")
	public Double getAbroadFee(){
		return abroadFee; 
	}
	
	public void setAbroadFee(Double abroadFee){
		this.abroadFee=abroadFee;
	}
    
    @Column(name = "EQUI_PRICE")
	@FieldProp(symbol = "购置仪器设备原价", desc = "")
	public Double getEquiPrice(){
		return equiPrice; 
	}
	
	public void setEquiPrice(Double equiPrice){
		this.equiPrice=equiPrice;
	}
    
    @Column(name = "GOVERNMENT_FUNDS")
	@FieldProp(symbol = "来自政府资金", desc = "")
	public Double getGovernmentFunds(){
		return governmentFunds; 
	}
	
	public void setGovernmentFunds(Double governmentFunds){
		this.governmentFunds=governmentFunds;
	}
    
    @Column(name = "COUNT_PERSON")
	@FieldProp(symbol = "统计负责人", desc = "")
	public String getCountPerson(){
		return countPerson; 
	}
	
	public void setCountPerson(String countPerson){
		this.countPerson=countPerson;
	}
    
    @Column(name = "REPORT_PERSON")
	@FieldProp(symbol = "填表人", desc = "")
	public String getReportPerson(){
		return reportPerson; 
	}
	
	public void setReportPerson(String reportPerson){
		this.reportPerson=reportPerson;
	}
    
    @Column(name = "PHONE")
	@FieldProp(symbol = "联系电话", desc = "")
	public String getPhone(){
		return phone; 
	}
	
	public void setPhone(String phone){
		this.phone=phone;
	}
    
    @Column(name = "REPORT_TIME")
	@FieldProp(symbol = "报出日期", desc = "")
	public String getReportTime(){
		return reportTime; 
	}
	
	public void setReportTime(String reportTime){
		this.reportTime=reportTime;
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
    
    @Column(name = "BUILDING_PRICE")
	@FieldProp(symbol = "建筑物原价", desc = "")
	public Double getBuildingPrice(){
		return buildingPrice; 
	}
	
	public void setBuildingPrice(Double buildingPrice){
		this.buildingPrice=buildingPrice;
	}
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "上报状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
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
