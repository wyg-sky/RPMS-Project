package com.lion.rpms.research.researchpatent.model;

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
*专利管理从表实体类
*Author:王圣磊
*Date：2015-03-13
*/
@Entity
@Table(name = "RPMS_RESEARCH_PATENT_LINE")
@ModelProp(symbol = "专利发明人")

public class ResearchPatentLine extends IdentifiableEntity implements Serializable{
	private static final long serialVersionUID = -6306436617957967823L;
	private String mainId; //MAIN_ID;	
	private ResearchTalent talentId; //发明人ID;	
	
	public ResearchPatentLine() {
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
	@FieldProp(symbol = "发明人", desc = "")
	public ResearchTalent getTalentId(){
		return talentId; 
	}
	
	public void setTalentId(ResearchTalent talentId){
		this.talentId=talentId;
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
