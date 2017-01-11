package com.lion.rpms.research.researchevaluate.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @ClassName: ResearchEvaluate 
 * @description :评价管理实体类
 * @author : 王圣磊
 * @date : 2015-03-20
 */
@Entity
@Table(name = "RPMS_RESEARCH_EVALUATE")
@ModelProp(symbol = "中心评价管理")

public class ResearchEvaluate extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -4607551296645954921L;
	private ResearchPlat platCenter; //分中心;	
	private ResearchPlat platInstitution; //分中心机构;	
	private String evaluateYear; //年度;	
	private String evaluation; //评价情况;	
	private Organization organization; //组织单位;	
	private String remark; //备注;	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	public ResearchEvaluate() {
	}
	
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getPlatCenter(){
		return platCenter; 
	}
	
	public void setPlatCenter(ResearchPlat platCenter){
		this.platCenter=platCenter;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution(){
		return platInstitution; 
	}
	
	public void setPlatInstitution(ResearchPlat platInstitution){
		this.platInstitution=platInstitution;
	}
    
    @Column(name = "EVALUATE_YEAR")
	@FieldProp(symbol = "年度", desc = "")
	public String getEvaluateYear(){
		return evaluateYear; 
	}
	
	public void setEvaluateYear(String evaluateYear){
		this.evaluateYear=evaluateYear;
	}
    
    @Column(name = "EVALUATION")
	@FieldProp(symbol = "评价情况", desc = "")
	public String getEvaluation(){
		return evaluation; 
	}
	
	public void setEvaluation(String evaluation){
		this.evaluation=evaluation;
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
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
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
	
	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
