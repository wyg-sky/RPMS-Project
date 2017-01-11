package com.lion.rpms.research.thesis.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchtalent.model.ResearchTalent;

/**
 * @ClassName: ResearchThesisTalent 
 * @description :论文管理实体类
 * @author : 王圣磊
 * @date : 2015-03-20
 */
@Entity
@Table(name = "RPMS_RESEARCH_THESIS_TALENT")
@ModelProp(symbol = "论文作者")

public class ResearchThesisTalent extends IdentifiableEntity implements Serializable{
	private static final long serialVersionUID = -7127457063507152932L;
	private String mainId; //main_id;	
	private ResearchTalent talentId; //论文作者;	
	private String remark; //备注;	
	
	public ResearchThesisTalent() {
	}
	
    
    @Column(name = "MAIN_ID")
	@FieldProp(symbol = "main_id", desc = "")
	public String getMainId(){
		return mainId; 
	}
	
	public void setMainId(String mainId){
		this.mainId=mainId;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "TALENT_ID")
	@FieldProp(symbol = "论文作者", desc = "")
	public ResearchTalent getTalentId(){
		return talentId; 
	}
	
	public void setTalentId(ResearchTalent talentId){
		this.talentId=talentId;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
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
