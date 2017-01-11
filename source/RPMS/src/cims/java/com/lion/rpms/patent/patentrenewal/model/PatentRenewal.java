package com.lion.rpms.patent.patentrenewal.model;

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
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.research.researchpatent.model.ResearchPatent;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * @description ：专利续费申请管理Model
 * @date ： 2015-06-03 09:50:24
 * @author ：WangYG
 */
@Entity
@Table(name = "RPMS_PATENT_RENEWAL")
@ModelProp(symbol = "专利续费申请管理")
public class PatentRenewal extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private Organization organization;	//组织单位
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private ResearchPatent patentId;	//专利名称ID
	private String protectDate;	//保护到期时间
	private String renewalMoney;	//续费金额
	private String renewalYear;	//续费年限
	private String renewalDesc;	//续费说明
	private String valid;	//是否有效
	private String remark;	//备注

	public PatentRenewal(){}
	
	@ManyToOne(cascade = {CascadeType.REFRESH},fetch=FetchType.LAZY,optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization  getOrganization(){
		return organization;
	};
	
	public void setOrganization(Organization organization) {
		this.organization = organization;
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
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PATENT_ID")
	@FieldProp(symbol = "专利名称ID", desc = "")
	public ResearchPatent getPatentId() {
		return patentId;
	}

	public void setPatentId(ResearchPatent patentId) {
		this.patentId = patentId;
	}

	@Column(name = "PROTECT_DATE")
	@FieldProp(symbol = "保护到期时间", desc = "")
	public String getProtectDate() {
		return protectDate;
	}
	public void setProtectDate(String protectDate) {
		this.protectDate = protectDate;
	}

	@Column(name = "RENEWAL_MONEY")
	@FieldProp(symbol = "续费金额", desc = "")
	public String getRenewalMoney() {
		return renewalMoney;
	}
	public void setRenewalMoney(String renewalMoney) {
		this.renewalMoney = renewalMoney;
	}

	@Column(name = "RENEWAL_YEAR")
	@FieldProp(symbol = "续费年限", desc = "")
	public String getRenewalYear() {
		return renewalYear;
	}
	public void setRenewalYear(String renewalYear) {
		this.renewalYear = renewalYear;
	}

	@Column(name = "RENEWAL_DESC")
	@FieldProp(symbol = "续费说明", desc = "")
	public String getRenewalDesc() {
		return renewalDesc;
	}
	public void setRenewalDesc(String renewalDesc) {
		this.renewalDesc = renewalDesc;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
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
