package com.lion.rpms.research.porjectaward.model;

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
*项目报奖管理从表实体类
*Author:王圣磊
*Date：2015-03-12
*/
@Entity
@Table(name = "RPMS_PROJECT_AWARD_LINE")
@ModelProp(symbol = "项目报奖得分管理")

public class ProjectAwardLine extends IdentifiableEntity implements Serializable{
	private static final long serialVersionUID = -6748696126517788570L;
	private String mainId; //MAIN_ID;	
	private ResearchTalent talentId; //专家;	
	private Double score; //得分;	
	
	public ProjectAwardLine() {
	}
    
    @Column(name = "MAIN_ID")
	@FieldProp(symbol = "MAIN_ID", desc = "")
	public String getMainId(){
		return mainId; 
	}
	
	public void setMainId(String mainId){
		this.mainId=mainId;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "TALENT_ID")
	@FieldProp(symbol = "专家", desc = "")
	public ResearchTalent getTalentId(){
		return talentId; 
	}
	
	public void setTalentId(ResearchTalent talentId){
		this.talentId=talentId;
	}
    
    @Column(name = "SCORE")
	@FieldProp(symbol = "得分", desc = "")
	public Double getScore(){
		return score; 
	}
	
	public void setScore(Double score){
		this.score=score;
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
