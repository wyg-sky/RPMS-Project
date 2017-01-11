package com.lion.rpms.thesis.thesisapplication.model;

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
import com.lion.rpms.research.thesis.model.ResearchThesis;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @description ：论文评比管理Model
 * @date ： 2015-03-16 09:20:38
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_THESIS_APPLICATION")
@ModelProp(symbol = "论文评比管理")
public class ThesisApplication extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private ResearchThesis thesisTitle;	//论文题目
	private String publicationName;	//发表刊物名称
	private String cn;	//国内刊号
	private String issn;	//国际刊号
	private String pubdate;	//发表时间
	private String includedProof;	//SCI、EI收录证明
	private String publicationDate;	//刊物出版时间
	private String pubNum;	//刊物期数
	private String introduction;	//论文内容简介
	private String status;	//状态
	private String awardsName;	//证书名称
	private String awardsItem;	//奖项名称
	private String awardsRank;	//奖励等级
	private String awardsTime;	//颁发时间
	private String awardsUnit;	//颁发单位
	private String valid;	//是否有效
	private String reportUser;	//填报人
	private String reportTime;	//填报时间
	private String examineUser;	//审核人
	private String examineSug;	//审核意见
	private String approveUser;	//审批人
	private String approveSug;	//审批意见
	private String remark;	//备注
	private List<Document> documents = new ArrayList<Document>(); //文档附件

	public ThesisApplication(){}
	
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
	@JoinColumn(name = "THESIS_TITLE")
	@FieldProp(symbol = "论文题目", desc = "")
	public ResearchThesis getThesisTitle() {
		return thesisTitle;
	}

	public void setThesisTitle(ResearchThesis thesisTitle) {
		this.thesisTitle = thesisTitle;
	}

	@Column(name = "PUBLICATION_NAME")
	@FieldProp(symbol = "发表刊物名称", desc = "")
	public String getPublicationName() {
		return publicationName;
	}
	public void setPublicationName(String publicationName) {
		this.publicationName = publicationName;
	}

	@Column(name = "CN")
	@FieldProp(symbol = "国内刊号", desc = "")
	public String getCn() {
		return cn;
	}
	public void setCn(String cn) {
		this.cn = cn;
	}

	@Column(name = "ISSN")
	@FieldProp(symbol = "国际刊号", desc = "")
	public String getIssn() {
		return issn;
	}
	public void setIssn(String issn) {
		this.issn = issn;
	}

	@Column(name = "PUBDATE")
	@FieldProp(symbol = "发表时间", desc = "")
	public String getPubdate() {
		return pubdate;
	}
	public void setPubdate(String pubdate) {
		this.pubdate = pubdate;
	}

	@Column(name = "INCLUDED_PROOF")
	@FieldProp(symbol = "SCI、EI收录证明", desc = "")
	public String getIncludedProof() {
		return includedProof;
	}
	public void setIncludedProof(String includedProof) {
		this.includedProof = includedProof;
	}

	@Column(name = "PUBLICATION_DATE")
	@FieldProp(symbol = "刊物出版时间", desc = "")
	public String getPublicationDate() {
		return publicationDate;
	}
	public void setPublicationDate(String publicationDate) {
		this.publicationDate = publicationDate;
	}

	@Column(name = "PUB_NUM")
	@FieldProp(symbol = "刊物期数", desc = "")
	public String getPubNum() {
		return pubNum;
	}
	public void setPubNum(String pubNum) {
		this.pubNum = pubNum;
	}

	@Column(name = "INTRODUCTION")
	@FieldProp(symbol = "论文内容简介", desc = "")
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	@Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "AWARDS_NAME")
	@FieldProp(symbol = "证书名称", desc = "")
	public String getAwardsName() {
		return awardsName;
	}
	public void setAwardsName(String awardsName) {
		this.awardsName = awardsName;
	}

	@Column(name = "AWARDS_ITEM")
	@FieldProp(symbol = "奖项名称", desc = "")
	public String getAwardsItem() {
		return awardsItem;
	}
	public void setAwardsItem(String awardsItem) {
		this.awardsItem = awardsItem;
	}

	@Column(name = "AWARDS_RANK")
	@FieldProp(symbol = "奖励等级", desc = "")
	public String getAwardsRank() {
		return awardsRank;
	}
	public void setAwardsRank(String awardsRank) {
		this.awardsRank = awardsRank;
	}

	@Column(name = "AWARDS_TIME")
	@FieldProp(symbol = "颁发时间", desc = "")
	public String getAwardsTime() {
		return awardsTime;
	}
	public void setAwardsTime(String awardsTime) {
		this.awardsTime = awardsTime;
	}

	@Column(name = "AWARDS_UNIT")
	@FieldProp(symbol = "颁发单位", desc = "")
	public String getAwardsUnit() {
		return awardsUnit;
	}
	public void setAwardsUnit(String awardsUnit) {
		this.awardsUnit = awardsUnit;
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

	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
