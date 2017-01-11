package com.lion.rpms.base.projectstaff.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.user.model.UserView;

/**
 * @description : 人员职责-用户管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-11 10:48:04
 */
 
@Entity
@Table(name = "RPMS_STAFF_USER")
@ModelProp(symbol = "人员职责-用户对应表")
public class StaffUser extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private UserView userId; //用户;	
	private String staffId; //职责;	
	
	public StaffUser() {
	}
	
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "USER_ID")
	@FieldProp(symbol = "用户", desc = "")
	public UserView getUserId(){
		return userId; 
	}
	
	public void setUserId(UserView userId){
		this.userId=userId;
	}
    
    @Column(name = "STAFF_ID")
	@FieldProp(symbol = "职责", desc = "")
	public String getStaffId(){
		return staffId; 
	}
	
	public void setStaffId(String staffId){
		this.staffId=staffId;
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
