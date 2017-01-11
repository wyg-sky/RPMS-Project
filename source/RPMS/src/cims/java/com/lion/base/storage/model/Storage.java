package com.lion.base.storage.model;

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

import org.hibernate.annotations.Cascade;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;


/**
 * @description : 设备仓库实体类
 * @date : 2013-09-22
 * @author : 姜华敏
 */
@Entity
@Table(name = "BASE_STORAGE")
@ModelProp(symbol = "设备仓库基本信息表")
public class Storage extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 5314116563556721478L;
	
	private String storageCd; //仓库编码;	
	private String storageName; //仓库名称;	
	private String locationName; //地点名称;	
	private String storageType; //仓库类型;	
	private String storageNum; //仓库级别;	
	private Double capitalLimit; //资金限额;	
	private String area; //所属地区;	
	private String systemType; //所属系统;	
	private String valid; //是否有效,0:无效,1:有效,缺省为1;	
	private String isLock; //锁定状态;	
	private String remark; //备注;	
	private Organization organization; //所属单位;	
	
	private List<StorageLine> storageLine = new ArrayList<StorageLine>();
	
	public Storage() {
	}
	
	@Column(name = "STORAGE_CD", unique=true)
	@FieldProp(symbol = "仓库编码", desc = "")
	public String getStorageCd(){
		return storageCd; 
	}
	
	public void setStorageCd(String storageCd){
		this.storageCd=storageCd;
	}
    
    @Column(name = "STORAGE_NAME")
	@FieldProp(symbol = "仓库名称", desc = "")
	public String getStorageName(){
		return storageName; 
	}
	
	public void setStorageName(String storageName){
		this.storageName=storageName;
	}
    
    @Column(name = "LOCATION_NAME")
	@FieldProp(symbol = "地点名称", desc = "")
	public String getLocationName(){
		return locationName; 
	}
	
	public void setLocationName(String locationName){
		this.locationName=locationName;
	}
    
    @Column(name = "STORAGE_TYPE")
	@FieldProp(symbol = "仓库类型", desc = "")
	public String getStorageType(){
		return storageType; 
	}
	
	public void setStorageType(String storageType){
		this.storageType=storageType;
	}
    
    @Column(name = "STORAGE_NUM")
	@FieldProp(symbol = "仓库级别", desc = "")
	public String getStorageNum(){
		return storageNum; 
	}
	
	public void setStorageNum(String storageNum){
		this.storageNum=storageNum;
	}
    
    @Column(name = "CAPITAL_LIMIT")
	@FieldProp(symbol = "资金限额", desc = "")
	public Double getCapitalLimit(){
		return capitalLimit; 
	}
	
	public void setCapitalLimit(Double capitalLimit){
		this.capitalLimit=capitalLimit;
	}
    
    @Column(name = "AREA")
	@FieldProp(symbol = "所属地区", desc = "")
	public String getArea(){
		return area; 
	}
	
	public void setArea(String area){
		this.area=area;
	}
    
	@Column(name = "SYSTEM_TYPE")
	@FieldProp(symbol = "所属系统", desc = "")
    public String getSystemType() {
		return systemType;
	}

	public void setSystemType(String systemType) {
		this.systemType = systemType;
	}

    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效,0:无效,1:有效,缺省为1", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
	}
    
    @Column(name = "IS_LOCK")
	@FieldProp(symbol = "锁定状态", desc = "")
	public String getIsLock(){
		return isLock; 
	}
	
	public void setIsLock(String isLock){
		this.isLock=isLock;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
    
	/**
	 * 与Organization的关联关系为：单向多对一
	 * 
	 * @return Organization
	 */
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "单位", desc = "")
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<StorageLine> getStorageLine() {
		return storageLine;
	}

	public void setStorageLine(List<StorageLine> storageLine) {
		this.storageLine = storageLine;
	}

	
}
