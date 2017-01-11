package com.lion.base.location.model;

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

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * @description : 设备位置管理model
 * @date : 2013-8-29下午3:11:39
 * @author : 曹鹏程
 */
@Entity
@Table(name="BASE_LOCATION")
@ModelProp(symbol="设备位置管理", desc="", daoId="LocationDao", daoClass="")
@FilterDef(name="locationFilter", parameters={@org.hibernate.annotations.ParamDef(name="valid", type="string")})
public class Location extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = 4071463197377181058L;
	private String locationCd; //位置编码;	
	private String locationName; //位置名称;	
	private Location parent; //上级位置;	
	private String locationType; //位置类别;	
	private String valid; //是否有效,0:无效,1:有效,缺省为1;	
	private Organization organization; //所属单位;	
	private Set<Location> children = new HashSet<Location>();
	private String sysType; //模块代码;	
	public Location() {
	}
	
	@Column(name = "LOCATION_CD")
	@FieldProp(symbol = "位置编码", desc = "")
	public String getLocationCd(){
		return locationCd; 
	}
	
	public void setLocationCd(String locationCd){
		this.locationCd=locationCd;
	}
	@Column(name = "system_type")
	@FieldProp(symbol = "模块代码", desc = "")
    public String getSysType() {
		return sysType;
	}

	public void setSysType(String sysType) {
		this.sysType = sysType;
	}

	@Column(name = "LOCATION_NAME")
	@FieldProp(symbol = "位置名称", desc = "")
	public String getLocationName(){
		return locationName; 
	}
	
	public void setLocationName(String locationName){
		this.locationName=locationName;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PARENT")
	@FieldProp(symbol = "父类别", desc = "")
	public Location getParent(){
		return parent; 
	}
	
	public void setParent(Location parent){
		this.parent=parent;
	}
    
    @Column(name = "LOCATION_TYPE")
	@FieldProp(symbol = "位置类别", desc = "")
	public String getLocationType(){
		return locationType; 
	}
	
	public void setLocationType(String locationType){
		this.locationType=locationType;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效,0:无效,1:有效,缺省为1", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
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

	@OneToMany(mappedBy = "parent", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@OrderBy(value = "locationCd asc")
	@Filter(name="locationFilter", condition=":valid=VALID")
	public Set<Location> getChildren() {
		return children;
	}

	public void setChildren(Set<Location> children) {
		this.children = children;
	}
	
}
