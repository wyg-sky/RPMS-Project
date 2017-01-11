package com.lion.rpms.research.projectacceptance.model;

import java.io.Serializable;

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
 * @description : 验收专家组明细管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-19 15:44:43
 */
 
@Entity
@Table(name = "RPMS_ACCEPTANCE_EXPERT")
@ModelProp(symbol = "验收专家组明细")
public class AcceptanceExpert extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
    private String mainId; //MAIN_ID; 
    private ResearchTalent talentId; //专家; 
    
    public AcceptanceExpert() {
    }
    
    
    @Column(name = "MAIN_ID")
    @FieldProp(symbol = "MAIN_ID", desc = "")
    public String getMainId(){
        return mainId; 
    }
    
    public void setMainId(String mainId){
        this.mainId=mainId;
    }
    
    @ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "TALENT_ID")
    @FieldProp(symbol = "专家", desc = "")
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
