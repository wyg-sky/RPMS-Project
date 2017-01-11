package com.lion.rpms.innovate.innovatecompact.model;

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
import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description ：合同管理Model
 * @date ： 2015-03-12 09:47:49
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_INNOVATE_COMPACT")
@ModelProp(symbol = "合同管理")
public class InnovateCompact extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private String compactName;	//项目名称
	private Project project;	//依托项目
	private String compactNum;	//合同编号
	private String firstParty;	//委托方（甲方）
	private String secondParty;	//研究开发方（乙方）
	private String thirdParty;	//丙方
	private String signDate;	//签订日期
	private String signAddress;	//签订地点
	private String startDate;	//有效期限开始
	private String endDate;	//有效期限截止
	private String sum;	//金额
	private String sumPaid;	//已支付金额
	private String paidStatus;	//合同支付情况
	private String valid;	//是否有效
	private String remark;	//备注
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	private Organization organization;  //组织单位
	private String paid;//是否支付完毕

	public InnovateCompact(){}
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
    public Organization getOrganization(){  
        return organization;  
    }
    
    public void setOrganization(Organization organization){  
        this.organization = organization;  
    }
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}
	
	public void setDocuments(List<Document> documents) {
		this.documents = documents;
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

	@Column(name = "COMPACT_NAME")
	@FieldProp(symbol = "项目名称", desc = "")
	public String getCompactName() {
		return compactName;
	}
	public void setCompactName(String compactName) {
		this.compactName = compactName;
	}

	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PROJECT_ID")
	@FieldProp(symbol = "项目", desc = "")
	public Project getProjectId() {
		return project;
	}

	public void setProjectId(Project project) {
		this.project = project;
	}

	@Column(name = "COMPACT_NUM")
	@FieldProp(symbol = "合同编号", desc = "")
	public String getCompactNum() {
		return compactNum;
	}
	public void setCompactNum(String compactNum) {
		this.compactNum = compactNum;
	}

	@Column(name = "FIRST_PARTY")
	@FieldProp(symbol = "委托方（甲方）", desc = "")
	public String getFirstParty() {
		return firstParty;
	}
	public void setFirstParty(String firstParty) {
		this.firstParty = firstParty;
	}

	@Column(name = "SECOND_PARTY")
	@FieldProp(symbol = "研究开发方（乙方）", desc = "")
	public String getSecondParty() {
		return secondParty;
	}
	public void setSecondParty(String secondParty) {
		this.secondParty = secondParty;
	}

	@Column(name = "THIRD_PARTY")
	@FieldProp(symbol = "丙方", desc = "")
	public String getThirdParty() {
		return thirdParty;
	}
	public void setThirdParty(String thirdParty) {
		this.thirdParty = thirdParty;
	}

	@Column(name = "SIGN_DATE")
	@FieldProp(symbol = "签订日期", desc = "")
	public String getSignDate() {
		return signDate;
	}
	public void setSignDate(String signDate) {
		this.signDate = signDate;
	}

	@Column(name = "SIGN_ADDRESS")
	@FieldProp(symbol = "签订地点", desc = "")
	public String getSignAddress() {
		return signAddress;
	}
	public void setSignAddress(String signAddress) {
		this.signAddress = signAddress;
	}

	@Column(name = "START_DATE")
	@FieldProp(symbol = "有效期限开始", desc = "")
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	@Column(name = "END_DATE")
	@FieldProp(symbol = "有效期限截止", desc = "")
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Column(name = "SUM")
	@FieldProp(symbol = "金额", desc = "")
	public String getSum() {
		return sum;
	}
	public void setSum(String sum) {
		this.sum = sum;
	}

	@Column(name = "SUM_PAID")
	@FieldProp(symbol = "已支付金额", desc = "")
	public String getSumPaid() {
		return sumPaid;
	}
	public void setSumPaid(String sumPaid) {
		this.sumPaid = sumPaid;
	}

	@Column(name = "PAID_STATUS")
	@FieldProp(symbol = "合同支付情况", desc = "")
	public String getPaidStatus() {
		return paidStatus;
	}
	public void setPaidStatus(String paidStatus) {
		this.paidStatus = paidStatus;
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
	
	@Column(name = "PAID")
	@FieldProp(symbol = "是否支付完毕", desc = "")
	public String getPaid() {
		return paid;
	}

	public void setPaid(String paid) {
		this.paid = paid;
	}
	
	
}
