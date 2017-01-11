package com.lion.rpms.base.researchtalent.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.department.model.Department;
import com.lion.system.organization.model.Organization;

/**
 * @description ：创新人才管理Model
 * @date ： 2015-03-09 15:39:36
 * @author ：WangYG
 */
@Entity
@Table(name = "RPMS_RESEARCH_TALENT")
@ModelProp(symbol = "创新人才管理")
public class ResearchTalent extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String talentCode; // 人员编号
	private String talentName; // 姓名
	private String sex; // 性别
	private String birthDate; // 出生年月
	private String telephone;//联系电话
	private String identyCard; // 身份证号
	private String education; // 学历
	private ResearchPlat platCenter; // 分中心
	private ResearchPlat platInstitution; // 分中心机构
	private String position; // 机构职务 
	private String adminiPosition; // 行政职务 
	private String grade; // 专家等级
	private String title; // 职称
	private String graduationSchool; // 毕业院校
	private String discipline; // 学科专业
	private String academician; // 院士
	private String allowance; // 是否享受津贴
	private String scholar; // 学者
	private String introduction; // 人员简介
	private String talentType; // 人才类型
	private String valid; // 是否有效
	private Organization organization;// 组织机构
	private String remark; // 备注
	private String talentPhoto;//照片
	private String isSxpert;//是否专家
	private SpecialtyDictionary specialty; // 从事专业
	private String inDate;	//进站时间
	private String outDate;	//出站时间
	private Department deptIn;//所在部门
	public ResearchTalent() {
	}
	
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "DEPT_IN")
	@FieldProp(symbol = "所在部门", desc = "")
	public Department getDeptIn() {
		return deptIn;
	}

	public void setDeptIn(Department deptIn) {
		this.deptIn = deptIn;
	}

	@Column(name = "TALENT_CODE")
	@FieldProp(symbol = "人员编号", desc = "")
	public String getTalentCode() {
		return talentCode;
	}

	public void setTalentCode(String talentCode) {
		this.talentCode = talentCode;
	}

	@Column(name = "TALENT_NAME")
	@FieldProp(symbol = "姓名", desc = "")
	public String getTalentName() {
		return talentName;
	}

	public void setTalentName(String talentName) {
		this.talentName = talentName;
	}

	@Column(name = "SEX")
	@FieldProp(symbol = "性别", desc = "")
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	@Column(name = "BIRTH_DATE")
	@FieldProp(symbol = "出生年月", desc = "")
	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	@Column(name = "IDENTY_CARD")
	@FieldProp(symbol = "身份证号", desc = "")
	public String getIdentyCard() {
		return identyCard;
	}

	public void setIdentyCard(String identyCard) {
		this.identyCard = identyCard;
	}

	@Column(name = "EDUCATION")
	@FieldProp(symbol = "学历", desc = "")
	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
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

	@Column(name = "POSITION")
	@FieldProp(symbol = "机构职务", desc = "")
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	@Column(name = "GRADE")
	@FieldProp(symbol = "专家等级", desc = "")
	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	@Column(name = "TITLE")
	@FieldProp(symbol = "职称", desc = "")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "GRADUATION_SCHOOL")
	@FieldProp(symbol = "毕业院校", desc = "")
	public String getGraduationSchool() {
		return graduationSchool;
	}

	public void setGraduationSchool(String graduationSchool) {
		this.graduationSchool = graduationSchool;
	}

	@Column(name = "DISCIPLINE")
	@FieldProp(symbol = "学科专业", desc = "")
	public String getDiscipline() {
		return discipline;
	}

	public void setDiscipline(String discipline) {
		this.discipline = discipline;
	}

	@Column(name = "ACADEMICIAN")
	@FieldProp(symbol = "院士", desc = "")
	public String getAcademician() {
		return academician;
	}

	public void setAcademician(String academician) {
		this.academician = academician;
	}

	@Column(name = "ALLOWANCE")
	@FieldProp(symbol = "是否享受津贴", desc = "")
	public String getAllowance() {
		return allowance;
	}

	public void setAllowance(String allowance) {
		this.allowance = allowance;
	}

	@Column(name = "SCHOLAR")
	@FieldProp(symbol = "学者", desc = "")
	public String getScholar() {
		return scholar;
	}

	public void setScholar(String scholar) {
		this.scholar = scholar;
	}

	@Column(name = "INTRODUCTION")
	@FieldProp(symbol = "人员简介", desc = "")
	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	@Column(name = "TALENT_TYPE")
	@FieldProp(symbol = "人才类型", desc = "")
	public String getTalentType() {
		return talentType;
	}

	public void setTalentType(String talentType) {
		this.talentType = talentType;
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
		return this.organization;
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
	
	@Column(name = "TALENT_PHOTO")
	@FieldProp(symbol = "照片", desc = "")
	public String getTalentPhoto() {
		return talentPhoto;
	}
	
	public void setTalentPhoto(String talentPhoto) {
		this.talentPhoto = talentPhoto;
	}
	
	
	@Column(name = "TELEPHONE")
	@FieldProp(symbol = "联系电话", desc = "")
	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	@Column(name = "ADMINI_POSITION")
	@FieldProp(symbol = "行政职务", desc = "")
	public String getAdminiPosition() {
		return adminiPosition;
	}

	public void setAdminiPosition(String adminiPosition) {
		this.adminiPosition = adminiPosition;
	}
	
	@Column(name = "IS_SXPERT")
	@FieldProp(symbol = "是否专家", desc = "")
	public String getIsSxpert() {
		return isSxpert;
	}

	public void setIsSxpert(String isSxpert) {
		this.isSxpert = isSxpert;
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
	
	@Column(name = "IN_DATE")
	@FieldProp(symbol = "进站时间", desc = "")
	public String getInDate() {
		return inDate;
	}
	public void setInDate(String inDate) {
		this.inDate = inDate;
	}

	@Column(name = "OUT_DATE")
	@FieldProp(symbol = "出站时间", desc = "")
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
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
