package com.lion.rpms.research.project.model;

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
import com.lion.rpms.base.researchplat.model.ResearchPlat;

/**
 * @description : 项目合作协作单位实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-12 12:57:10
 */
 
@Entity
@Table(name = "RPMS_PROJECT_PARTNERS")
@ModelProp(symbol = "项目合作协作单位明细")
public class ProjectPartners extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
    private String mainId; //MAIN_ID; 
    private ResearchPlat researchPlat; //合作协作单位; 
    private String researchPlatName;//合作协作单位名称
    private String partnersType; //类型; 
    
    public ProjectPartners() {
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
    @JoinColumn(name = "RESEARCH_PLAT")
    @FieldProp(symbol = "合作协作单位", desc = "")
    public ResearchPlat getResearchPlat(){
        return researchPlat; 
    }
    
    public void setResearchPlat(ResearchPlat researchPlat){
        this.researchPlat=researchPlat;
    }
    
    @Column(name = "RESEARCH_PLAT_NAME")
    @FieldProp(symbol = "合作协作单位名称", desc = "")
    public String getResearchPlatName() {
		return researchPlatName;
	}

	public void setResearchPlatName(String researchPlatName) {
		this.researchPlatName = researchPlatName;
	}


	@Column(name = "PARTNERS_TYPE")
    @FieldProp(symbol = "类型", desc = "")
    public String getPartnersType(){
        return partnersType; 
    }
    
    public void setPartnersType(String partnersType){
        this.partnersType=partnersType;
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
