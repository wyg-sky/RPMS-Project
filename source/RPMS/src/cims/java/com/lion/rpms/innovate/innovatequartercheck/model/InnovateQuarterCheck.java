package com.lion.rpms.innovate.innovatequartercheck.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.system.common.model.AuditableSimpleEntity;

/**
 * @description ：季度检查项目管理Model
 * @date ： 2015-03-12 13:39:57
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_INNOVATE_QUARTER_CHECK")
@ModelProp(symbol = "季度检查项目管理")
public class InnovateQuarterCheck extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String platCenter;	//分中心
	private String platInstitution;	//分中心机构
	private String type;	//分类
	private String checkItem;	//检查项目
	private String checkContent;	//检查内容
	private String checkStandar;	//评分标准
	private String requirement;	//工作要求
	private String requireData;	//应有资料
	private String standarScore;	//标准分
	private String valid;	//是否有效
	private String remark;	//备注

	public InnovateQuarterCheck(){}

	@Column(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public String getPlatCenter() {
		return platCenter;
	}
	public void setPlatCenter(String platCenter) {
		this.platCenter = platCenter;
	}

	@Column(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public String getPlatInstitution() {
		return platInstitution;
	}
	public void setPlatInstitution(String platInstitution) {
		this.platInstitution = platInstitution;
	}

	@Column(name = "TYPE")
	@FieldProp(symbol = "分类", desc = "")
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "CHECK_ITEM")
	@FieldProp(symbol = "检查项目", desc = "")
	public String getCheckItem() {
		return checkItem;
	}
	public void setCheckItem(String checkItem) {
		this.checkItem = checkItem;
	}

	@Column(name = "CHECK_CONTENT")
	@FieldProp(symbol = "检查内容", desc = "")
	public String getCheckContent() {
		return checkContent;
	}
	public void setCheckContent(String checkContent) {
		this.checkContent = checkContent;
	}

	@Column(name = "CHECK_STANDAR")
	@FieldProp(symbol = "评分标准", desc = "")
	public String getCheckStandar() {
		return checkStandar;
	}
	public void setCheckStandar(String checkStandar) {
		this.checkStandar = checkStandar;
	}

	@Column(name = "REQUIREMENT")
	@FieldProp(symbol = "工作要求", desc = "")
	public String getRequirement() {
		return requirement;
	}
	public void setRequirement(String requirement) {
		this.requirement = requirement;
	}

	@Column(name = "REQUIRE_DATA")
	@FieldProp(symbol = "应有资料", desc = "")
	public String getRequireData() {
		return requireData;
	}
	public void setRequireData(String requireData) {
		this.requireData = requireData;
	}

	@Column(name = "STANDAR_SCORE")
	@FieldProp(symbol = "标准分", desc = "")
	public String getStandarScore() {
		return standarScore;
	}
	public void setStandarScore(String standarScore) {
		this.standarScore = standarScore;
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
