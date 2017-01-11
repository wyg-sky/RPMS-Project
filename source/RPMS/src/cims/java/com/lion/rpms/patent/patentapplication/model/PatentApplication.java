package com.lion.rpms.patent.patentapplication.model;

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
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.research.project.model.Project;
import com.lion.rpms.research.researchpatent.model.ResearchPatent;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description ：专利申请管理Model
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_PATENT_APPLICATION")
@ModelProp(symbol = "专利申请管理")
public class PatentApplication extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private SpecialtyDictionary specialty; //专业;	
	private SpecialtyDictionary business; //业务;	
	private String linkman;	//联系人
	private String phonenum;	//电话号码
	private String postcode;	//邮政编码
	private String email;	//邮箱
	private String applyDate;	//申请日期
	private String patentName;	//拟申请专利名称
	private String firstInventorName;	//第一发明人姓名
	private String firstInventorPhonenum;	//第一发明人号码
	private String patentAnent;	//专利代理公司
	private String type;	//分类
	private Project projectId;	//依托项目
	private ResearchPatent patent;
	private String patentNum;	//专利编号
	private String acceptDate;	//受理时间
	private String privilegeDate;	//授权时间
	private String protectDate;	//保护到期时间
	private String invnetor;	//发明人
	private String patentee;	//专利权人
	private String patenteeAddress;	//专利权人地址
	private String payDate;//应缴费日期
	private String technosphere;	//技术领域
	private String abstracts;	//摘要
	private String status;	//状态
	private String num;	//自编号
	private String valid;	//是否有效
	private String reportUser;	//填报人
	private String reportTime;	//填报时间
	private String examineUser;	//审核人
	private String examineSug;	//审核意见
	private String approveUser;	//审批人
	private String approveSug;	//审批意见
	private String remark;	//备注
	private String cost;//费用明细
	private String total;//合计
	private String publicExpense;//官费
	private String applicationFee;//申请费
	private String regFee;//注册费
	private String annualFee;//年费
	private String taxes;//税费
	private String annualFeeSum;//年费合计
	private Organization organization;	//单位
	private List<PatentApplicationLine> patentApplicationLines = new ArrayList<PatentApplicationLine>();
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public PatentApplication(){}
	
	@ManyToOne(cascade = {CascadeType.REFRESH},fetch=FetchType.LAZY,optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "单位", desc = "")
	public Organization  getOrganization(){
		return organization;
	};
	
	public void setOrganization(Organization organization) {
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
	@FieldProp(symbol = "专利", desc = "")
	public ResearchPatent getPatent() {
		return patent;
	}

	public void setPatent(ResearchPatent patent) {
		this.patent = patent;
	}

	@Column(name = "LINKMAN")
	@FieldProp(symbol = "联系人", desc = "")
	public String getLinkman() {
		return linkman;
	}
	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}

	@Column(name = "PHONENUM")
	@FieldProp(symbol = "电话号码", desc = "")
	public String getPhonenum() {
		return phonenum;
	}
	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}

	@Column(name = "POSTCODE")
	@FieldProp(symbol = "邮政编码", desc = "")
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	@Column(name = "EMAIL")
	@FieldProp(symbol = "邮箱", desc = "")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "APPLY_DATE")
	@FieldProp(symbol = "申请日期", desc = "")
	public String getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}

	@Column(name = "PATENT_NAME")
	@FieldProp(symbol = "拟申请专利名称", desc = "")
	public String getPatentName() {
		return patentName;
	}
	public void setPatentName(String patentName) {
		this.patentName = patentName;
	}

	@Column(name = "FIRST_INVENTOR_NAME")
	@FieldProp(symbol = "第一发明人姓名", desc = "")
	public String getFirstInventorName() {
		return firstInventorName;
	}
	public void setFirstInventorName(String firstInventorName) {
		this.firstInventorName = firstInventorName;
	}

	@Column(name = "FIRST_INVENTOR_PHONENUM")
	@FieldProp(symbol = "第一发明人号码", desc = "")
	public String getFirstInventorPhonenum() {
		return firstInventorPhonenum;
	}
	public void setFirstInventorPhonenum(String firstInventorPhonenum) {
		this.firstInventorPhonenum = firstInventorPhonenum;
	}

	@Column(name = "PATENT_ANENT")
	@FieldProp(symbol = "专利代理公司", desc = "")
	public String getPatentAnent() {
		return patentAnent;
	}
	public void setPatentAnent(String patentAnent) {
		this.patentAnent = patentAnent;
	}

	@Column(name = "TYPE")
	@FieldProp(symbol = "分类", desc = "")
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name="PROJECT_ID")
    @FieldProp(symbol="依托项目", desc="")
	public Project getProjectId() {
		return projectId;
	}
	public void setProjectId(Project projectId) {
		this.projectId = projectId;
	}

	@Column(name = "PATENT_NUM")
	@FieldProp(symbol = "专利编号", desc = "")
	public String getPatentNum() {
		return patentNum;
	}
	public void setPatentNum(String patentNum) {
		this.patentNum = patentNum;
	}

	@Column(name = "ACCEPT_DATE")
	@FieldProp(symbol = "受理时间", desc = "")
	public String getAcceptDate() {
		return acceptDate;
	}
	public void setAcceptDate(String acceptDate) {
		this.acceptDate = acceptDate;
	}

	@Column(name = "PRIVILEGE_DATE")
	@FieldProp(symbol = "授权时间", desc = "")
	public String getPrivilegeDate() {
		return privilegeDate;
	}
	public void setPrivilegeDate(String privilegeDate) {
		this.privilegeDate = privilegeDate;
	}

	@Column(name = "PROTECT_DATE")
	@FieldProp(symbol = "保护到期时间", desc = "")
	public String getProtectDate() {
		return protectDate;
	}
	public void setProtectDate(String protectDate) {
		this.protectDate = protectDate;
	}

	@Column(name = "INVNETOR")
	@FieldProp(symbol = "发明人", desc = "")
	public String getInvnetor() {
		return invnetor;
	}
	public void setInvnetor(String invnetor) {
		this.invnetor = invnetor;
	}

	@Column(name = "PATENTEE")
	@FieldProp(symbol = "专利权人", desc = "")
	public String getPatentee() {
		return patentee;
	}
	public void setPatentee(String patentee) {
		this.patentee = patentee;
	}

	@Column(name = "PATENTEE_ADDRESS")
	@FieldProp(symbol = "专利权人地址", desc = "")
	public String getPatenteeAddress() {
		return patenteeAddress;
	}
	public void setPatenteeAddress(String patenteeAddress) {
		this.patenteeAddress = patenteeAddress;
	}

	@Column(name = "TECHNOSPHERE")
	@FieldProp(symbol = "技术领域", desc = "")
	public String getTechnosphere() {
		return technosphere;
	}
	public void setTechnosphere(String technosphere) {
		this.technosphere = technosphere;
	}

	@Column(name = "ABSTRACTS")
	@FieldProp(symbol = "摘要", desc = "")
	public String getAbstracts() {
		return abstracts;
	}
	public void setAbstracts(String abstracts) {
		this.abstracts = abstracts;
	}

	@Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "NUM")
	@FieldProp(symbol = "自编号", desc = "")
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}

	@Column(name = "REPORT_USER")
	@FieldProp(symbol = "填报人", desc = "")
	public String getReportUser() {
		return reportUser;
	}
	public void setReportUser(String reportUser) {
		this.reportUser = reportUser;
	}

	@Column(name = "REPORT_TIME")
	@FieldProp(symbol = "填报时间", desc = "")
	public String getReportTime() {
		return reportTime;
	}
	public void setReportTime(String reportTime) {
		this.reportTime = reportTime;
	}

	@Column(name = "EXAMINE_USER")
	@FieldProp(symbol = "审核人", desc = "")
	public String getExamineUser() {
		return examineUser;
	}
	public void setExamineUser(String examineUser) {
		this.examineUser = examineUser;
	}

	@Column(name = "EXAMINE_SUG")
	@FieldProp(symbol = "审核意见", desc = "")
	public String getExamineSug() {
		return examineSug;
	}
	public void setExamineSug(String examineSug) {
		this.examineSug = examineSug;
	}

	@Column(name = "APPROVE_USER")
	@FieldProp(symbol = "审批人", desc = "")
	public String getApproveUser() {
		return approveUser;
	}
	public void setApproveUser(String approveUser) {
		this.approveUser = approveUser;
	}

	@Column(name = "APPROVE_SUG")
	@FieldProp(symbol = "审批意见", desc = "")
	public String getApproveSug() {
		return approveSug;
	}
	public void setApproveSug(String approveSug) {
		this.approveSug = approveSug;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="MAIN_ID")
	@OrderBy(value = "id ASC")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
	public List<PatentApplicationLine> getPatentApplicationLines() {
		return patentApplicationLines;
	}
	public void setPatentApplicationLines(List<PatentApplicationLine> patentApplicationLines) {
		this.patentApplicationLines = patentApplicationLines;
	}
	
	@Column(name = "COST")
	@FieldProp(symbol = "费用明细", desc = "")
	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}
	
	@Column(name = "TOTAL")
	@FieldProp(symbol = "合计", desc = "")
	public String getTotal() {
		return total;
	}
	
	
	@Column(name = "PUBLIC_EXPENSE")
	@FieldProp(symbol = "官费", desc = "")
	public String getPublicExpense() {
		return publicExpense;
	}

	public void setPublicExpense(String publicExpense) {
		this.publicExpense = publicExpense;
	}
	
	@Column(name = "APPLICATION_FEE")
	@FieldProp(symbol = "申请费", desc = "")
	public String getApplicationFee() {
		return applicationFee;
	}

	public void setApplicationFee(String applicationFee) {
		this.applicationFee = applicationFee;
	}
	
	@Column(name = "REG_FEE")
	@FieldProp(symbol = "登记费", desc = "")
	public String getRegFee() {
		return regFee;
	}

	public void setRegFee(String regFee) {
		this.regFee = regFee;
	}
	
	@Column(name = "ANNUAL_FEE")
	@FieldProp(symbol = "年费", desc = "")
	public String getAnnualFee() {
		return annualFee;
	}

	public void setAnnualFee(String annualFee) {
		this.annualFee = annualFee;
	}
	
	@Column(name = "TAXES")
	@FieldProp(symbol = "税费", desc = "")
	public String getTaxes() {
		return taxes;
	}

	public void setTaxes(String taxes) {
		this.taxes = taxes;
	}

	public void setTotal(String total) {
		this.total = total;
	}
	
	@Column(name = "ANNUAL_FEE_SUM")
	@FieldProp(symbol = "年费合计", desc = "")
	public String getAnnualFeeSum() {
		return annualFeeSum;
	}

	public void setAnnualFeeSum(String annualFeeSum) {
		this.annualFeeSum = annualFeeSum;
	}

	@Column(name = "PAY_DATE")
	@FieldProp(symbol = "应缴费日期", desc = "")
	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
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
