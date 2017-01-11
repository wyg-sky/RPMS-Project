package com.lion.rpms.base.researchequipment.model;

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
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description ：创新设备管理Model
 * @date ： 2015-03-09 16:47:04
 * @author ：WangYG
 */
@Entity
@Table(name = "RPMS_RESEARCH_EQUIPMENT")
@ModelProp(symbol = "创新设备管理")
public class ResearchEquipment extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String equiCode; // 设备编号
	private String equiName; // 设备名称
	private ResearchPlat platCenter; // 分中心
	private ResearchPlat platInstitution; // 分中心机构
	private SpecialtyDictionary specialty; // 专业
	private SpecialtyDictionary business; // 业务
	private String factory; // 生产厂家
	private String purchaseTime; // 购置时间
	private String spec; // 型号
	private String manufactureDate; // 出厂日期
	private Double assetFund; // 设备原值
	private String equiStatus; // 设备状态
	private String valid; // 是否有效
	private Organization organization;// 组织单位
	private String remark; // 备注
	private String useStatus; //使用状态
	
	private List<Document> documents = new ArrayList<Document>(); //照片附件

	public ResearchEquipment() {
	}

	@Column(name = "EQUI_CODE")
	@FieldProp(symbol = "设备编号", desc = "")
	public String getEquiCode() {
		return equiCode;
	}

	public void setEquiCode(String equiCode) {
		this.equiCode = equiCode;
	}

	@Column(name = "EQUI_NAME")
	@FieldProp(symbol = "设备名称", desc = "")
	public String getEquiName() {
		return equiName;
	}

	public void setEquiName(String equiName) {
		this.equiName = equiName;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getPlatCenter() {
		return platCenter;
	}

	public void setPlatCenter(ResearchPlat platCenter) {
		this.platCenter = platCenter;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution() {
		return platInstitution;
	}

	public void setPlatInstitution(ResearchPlat platInstitution) {
		this.platInstitution = platInstitution;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "SPECIALTY")
	@FieldProp(symbol = "专业", desc = "")
	public SpecialtyDictionary getSpecialty() {
		return specialty;
	}

	public void setSpecialty(SpecialtyDictionary specialty) {
		this.specialty = specialty;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "BUSINESS")
	@FieldProp(symbol = "业务", desc = "")
	public SpecialtyDictionary getBusiness() {
		return business;
	}

	public void setBusiness(SpecialtyDictionary business) {
		this.business = business;
	}

	@Column(name = "FACTORY")
	@FieldProp(symbol = "生产厂家", desc = "")
	public String getFactory() {
		return factory;
	}

	public void setFactory(String factory) {
		this.factory = factory;
	}

	@Column(name = "PURCHASE_TIME")
	@FieldProp(symbol = "购置时间", desc = "")
	public String getPurchaseTime() {
		return purchaseTime;
	}

	public void setPurchaseTime(String purchaseTime) {
		this.purchaseTime = purchaseTime;
	}

	@Column(name = "SPEC")
	@FieldProp(symbol = "型号", desc = "")
	public String getSpec() {
		return spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	@Column(name = "MANUFACTURE_DATE")
	@FieldProp(symbol = "出厂日期", desc = "")
	public String getManufactureDate() {
		return manufactureDate;
	}

	public void setManufactureDate(String manufactureDate) {
		this.manufactureDate = manufactureDate;
	}

	@Column(name = "ASSET_FUND")
	@FieldProp(symbol = "设备原值", desc = "")
	public Double getAssetFund() {
		return assetFund;
	}

	public void setAssetFund(Double assetFund) {
		this.assetFund = assetFund;
	}

	@Column(name = "EQUI_STATUS")
	@FieldProp(symbol = "设备状态", desc = "")
	public String getEquiStatus() {
		return equiStatus;
	}

	public void setEquiStatus(String equiStatus) {
		this.equiStatus = equiStatus;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}

	public void setValid(String valid) {
		this.valid = valid;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	@Column(name = "USE_STATUS")
	@FieldProp(symbol = "使用状态", desc = "")
	public String getUseStatus() {
		return useStatus;
	}

	public void setUseStatus(String useStatus) {
		this.useStatus = useStatus;
	}

	@OneToMany(fetch = FetchType.LAZY, cascade = { javax.persistence.CascadeType.ALL })
	@JoinColumn(name = "DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
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
