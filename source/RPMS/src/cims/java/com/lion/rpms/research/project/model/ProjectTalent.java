package com.lion.rpms.research.project.model;

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
 * @description : 项目立项管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-12 12:57:10
 */
 
@Entity
@Table(name = "RPMS_PROJECT_TALENT")
@ModelProp(symbol = "项目人员明细")
public class ProjectTalent extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
    private String mainId; //MAIN_ID; 
    private ResearchTalent talentId; //人才信息; 
    private String projectDivision; //项目分工; 
    
    public ProjectTalent() {
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
	@JoinColumn(name = "RESEARCH_TALENT")
	@FieldProp(symbol = "人才信息", desc = "")
    public ResearchTalent getTalentId() {
		return talentId;
	}

	public void setTalentId(ResearchTalent talentId) {
		this.talentId = talentId;
	}
	
    @Column(name = "PROJECT_DIVISION")
    @FieldProp(symbol = "项目分工", desc = "")
    public String getProjectDivision(){
        return projectDivision; 
    }

	public void setProjectDivision(String projectDivision){
        this.projectDivision=projectDivision;
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
