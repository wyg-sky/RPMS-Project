package com.lion.rpms.base.projectstaff.model;

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
 * @description : 人员职责管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 13:03:12
 */
 
@Entity
@Table(name = "RPMS_PROJECT_STAFF")
@ModelProp(symbol = "人员职责表")
public class ProjectStaff extends AuditableSimpleEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private String staffCode; //岗位编号;	
	private String staffName; //岗位名称;	
	private String valid; //是否有效;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	
	public ProjectStaff() {
	}
	
    
    @Column(name = "STAFF_CODE")
	@FieldProp(symbol = "岗位编号", desc = "")
	public String getStaffCode(){
		return staffCode; 
	}
	
	public void setStaffCode(String staffCode){
		this.staffCode=staffCode;
	}
    
    @Column(name = "STAFF_NAME")
	@FieldProp(symbol = "岗位名称", desc = "")
	public String getStaffName(){
		return staffName; 
	}
	
	public void setStaffName(String staffName){
		this.staffName=staffName;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
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
	
	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
