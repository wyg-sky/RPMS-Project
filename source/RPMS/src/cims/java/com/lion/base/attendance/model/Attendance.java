package com.lion.base.attendance.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * @description : 班次信息实体类
 * @date : 2013-9-25上午10:02:27
 * @author : 辛尔青
 */
@Entity
@Table(name = "BASE_ATTENDANCE")
@ModelProp(symbol = "班次信息")

public class Attendance extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = -4596069419939861307L;
	private Organization organization; //单位;	
	private String reportDate; //日期;	
	private String reportStatus; //上报状态;	
	private String shiftCd; //班次代码;	
	private String shiftName; //班次名称;	
	private String shiftBeginTime; //开始时间;	
	private String shiftEndTime; //结束时间;	
	private String remark; //备注;	
	private String valid; //是否有效;	
	
	public Attendance() {
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
    
    @Column(name = "SHIFT_CD")
	@FieldProp(symbol = "班次代码", desc = "")
	public String getShiftCd(){
		return shiftCd; 
	}
	
	public void setShiftCd(String shiftCd){
		this.shiftCd=shiftCd;
	}
    
    @Column(name = "SHIFT_NAME")
	@FieldProp(symbol = "班次名称", desc = "")
	public String getShiftName(){
		return shiftName; 
	}
	
	public void setShiftName(String shiftName){
		this.shiftName=shiftName;
	}
    
    @Column(name = "SHIFT_BEGIN_TIME")
	@FieldProp(symbol = "开始时间", desc = "")
	public String getShiftBeginTime(){
		return shiftBeginTime; 
	}
	
	public void setShiftBeginTime(String shiftBeginTime){
		this.shiftBeginTime=shiftBeginTime;
	}
    
    @Column(name = "SHIFT_END_TIME")
	@FieldProp(symbol = "结束时间", desc = "")
	public String getShiftEndTime(){
		return shiftEndTime; 
	}
	
	public void setShiftEndTime(String shiftEndTime){
		this.shiftEndTime=shiftEndTime;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
	}
}
