package com.lion.rpms.innovate.innovateyeargrade.model;

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
import com.lion.rpms.innovate.innovateyearcheck.model.InnovateYearCheck;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @description ：年度考核打分管理Model
 * @date ： 2015-03-16 09:00:14
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_INNOVATE_YEAR_GRADE")
@ModelProp(symbol = "年度考核打分管理")
public class InnovateYearGrade extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private String year;	//年度
	private InnovateYearCheck checkItem;	//考核项目
	private Double systemScore;	//系统得分
	private Double selfCheckScore;	//自查得分
	private Double checkScore;	//实际得分
	private String situation;	//情况说明
	private String checker;	//检查人
	private String existiingProblem;	//存在问题及建议
	private String rectifier;	//整改责任人
	private String recitfySituation;	//整改情况
	private String checkDate;	//检查时间
	private String valid;	//是否有效
	private String remark;	//备注
	private List<Document> documents = new ArrayList<Document>(); //文档附件

	public InnovateYearGrade(){}

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

	@Column(name = "YEAR")
	@FieldProp(symbol = "季度", desc = "")
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "CHECK_ITEM")
	@FieldProp(symbol = "考核标准", desc = "")
	public InnovateYearCheck getCheckItem() {
		return checkItem;
	}
	public void setCheckItem(InnovateYearCheck checkItem) {
		this.checkItem = checkItem;
	}

	@Column(name = "SYSTEM_SCORE")
	@FieldProp(symbol = "系统得分", desc = "")
	public Double getSystemScore() {
		return systemScore;
	}
	public void setSystemScore(Double systemScore) {
		this.systemScore = systemScore;
	}

	@Column(name = "SELF_CHECK_SCORE")
	@FieldProp(symbol = "自查得分", desc = "")
	public Double getSelfCheckScore() {
		return selfCheckScore;
	}
	public void setSelfCheckScore(Double selfCheckScore) {
		this.selfCheckScore = selfCheckScore;
	}

	@Column(name = "CHECK_SCORE")
	@FieldProp(symbol = "实际得分", desc = "")
	public Double getCheckScore() {
		return checkScore;
	}
	public void setCheckScore(Double checkScore) {
		this.checkScore = checkScore;
	}

	@Column(name = "SITUATION")
	@FieldProp(symbol = "情况说明", desc = "")
	public String getSituation() {
		return situation;
	}
	public void setSituation(String situation) {
		this.situation = situation;
	}

	@Column(name = "CHECKER")
	@FieldProp(symbol = "检查人", desc = "")
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}
	
	@Column(name = "EXISTIING_PROBLEM")
	@FieldProp(symbol = "存在问题及建议", desc = "")
	public String getExistiingProblem() {
		return existiingProblem;
	}
	public void setExistiingProblem(String existiingProblem) {
		this.existiingProblem = existiingProblem;
	}

	@Column(name = "CHECK_DATE")
	@FieldProp(symbol = "检查时间", desc = "")
	public String getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(String checkDate) {
		this.checkDate = checkDate;
	}
	
	@Column(name = "RECTIFIER")
	@FieldProp(symbol = "整改责任人", desc = "")
	public String getRectifier() {
		return rectifier;
	}
	public void setRectifier(String rectifier) {
		this.rectifier = rectifier;
	}

	@Column(name = "RECITFY_SITUATION")
	@FieldProp(symbol = "整改情况", desc = "")
	public String getRecitfySituation() {
		return recitfySituation;
	}
	public void setRecitfySituation(String recitfySituation) {
		this.recitfySituation = recitfySituation;
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
