package com.lion.base.storage.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.department.model.Department;
import com.lion.system.user.model.UserView;


/**
 * @description : 仓库保管员 model
 * @date : 2013-9-22下午03:26:28
 * @author : 姜华敏
 */
@Entity
@Table(name = "BASE_STORAGE_CUSTODIAN")
@ModelProp(symbol = "仓库保管员")
public class StorageLine extends IdentifiableEntity implements Serializable {
	private static final long serialVersionUID = 5314116563556721478L;
	
	private String mainId; //主表id;	
	private UserView custodianUser; //仓库管理员;	
	private String phonenum; //联系电话;	
	private String email; //EMAIL;	
	private String remark; //备注;	
	private Department department; //部门;	
	
	public StorageLine() {
	}
	
	@Column(name = "MAIN_ID")
	@FieldProp(symbol = "主表id", desc = "")
    public String getMainId() {
		return mainId;
	}

	public void setMainId(String mainId) {
		this.mainId = mainId;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "CUSTODIAN_USER")
	@FieldProp(symbol = "保管人", desc = "")
    public UserView getCustodianUser() {
		return custodianUser;
	}

	public void setCustodianUser(UserView custodianUser) {
		this.custodianUser = custodianUser;
	}

    @Column(name = "PHONE")
	@FieldProp(symbol = "联系电话", desc = "")
	public String getPhonenum(){
		return phonenum; 
	}
	
	public void setPhonenum(String phonenum){
		this.phonenum=phonenum;
	}
    
    @Column(name = "EMAIL")
	@FieldProp(symbol = "EMAIL", desc = "")
	public String getEmail(){
		return email; 
	}
	
	public void setEmail(String email){
		this.email=email;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "DEPARTMENT")
	@FieldProp(symbol = "部门", desc = "")
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
    
}
