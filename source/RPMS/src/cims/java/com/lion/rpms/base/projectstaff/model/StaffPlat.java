package com.lion.rpms.base.projectstaff.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchplat.model.ResearchPlat;

/**
 * @description : 人员职责-平台管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-11 10:54:06
 */
 
@Entity
@Table(name = "RPMS_STAFF_PLAT")
@ModelProp(symbol = "人员职责-平台对应表")
public class StaffPlat extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private ProjectStaff staffId; //职责;	
	private ResearchPlat platId; //平台;	
	
	public StaffPlat() {
	}
	
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "STAFF_ID")
	@FieldProp(symbol = "职责", desc = "")
	public ProjectStaff getStaffId(){
		return staffId; 
	}
	
	public void setStaffId(ProjectStaff staffId){
		this.staffId=staffId;
	}
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "PLAT_ID")
	@FieldProp(symbol = "平台", desc = "")
	public ResearchPlat getPlatId(){
		return platId; 
	}
	
	public void setPlatId(ResearchPlat platId){
		this.platId=platId;
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
