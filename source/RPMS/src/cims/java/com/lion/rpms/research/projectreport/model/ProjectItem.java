package com.lion.rpms.research.projectreport.model;

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
import com.lion.rpms.research.project.model.Project;


/**
 * @description : 项目合并包涵项目明细
 * @date : 2015年4月22日下午5:31:04
 * @author : cpc
 */
@Entity
@Table(name = "RPMS_PROJECT_ITEM")
@ModelProp(symbol = "项目合并包涵项目明细")
public class ProjectItem extends IdentifiableEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Project projectId; // 项目编号
	private String mainId; //MAIN_ID; 
	
	@Column(name = "MAIN_ID")
    @FieldProp(symbol = "MAIN_ID", desc = "")
    public String getMainId(){
        return mainId; 
    }
    
    public void setMainId(String mainId){
        this.mainId=mainId;
    }
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PROJECT_ID")
	@FieldProp(symbol = "项目编号", desc = "")
	public Project getProjectId() {
		return projectId;
	}

	public void setProjectId(Project projectId) {
		this.projectId = projectId;
	}
}
