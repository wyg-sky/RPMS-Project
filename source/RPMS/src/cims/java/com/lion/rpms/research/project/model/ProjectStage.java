package com.lion.rpms.research.project.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;

/**
 * @description : 项目进度阶段实体类
 * @Author : 曹鹏程
 * @Date ：2015-04-28 11:41:22
 */
 
@Entity
@Table(name = "RPMS_PROJECT_STAGE")
@ModelProp(symbol = "项目进度阶段")
public class ProjectStage extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private String mainId; //main_id;	
	private String startTime; //开始时间;	
	private String endTime; //结束时间;	
	private String stageType; //项目阶段;	
	private String keyJob; //主要工作;	
	
	public ProjectStage() {
	}
	
    
    @Column(name = "MAIN_ID")
	@FieldProp(symbol = "main_id", desc = "")
	public String getMainId(){
		return mainId; 
	}
	
	public void setMainId(String mainId){
		this.mainId=mainId;
	}
	
	@Column(name = "START_TIME")
	@FieldProp(symbol = "开始时间", desc = "")
	public String getStartTime(){
		return startTime; 
	}
	
	public void setStartTime(String startTime){
		this.startTime=startTime;
	}
    
    @Column(name = "END_TIME")
	@FieldProp(symbol = "结束时间", desc = "")
	public String getEndTime(){
		return endTime; 
	}
	
	public void setEndTime(String endTime){
		this.endTime=endTime;
	}
    
    @Column(name = "STAGE_TYPE")
	@FieldProp(symbol = "项目阶段", desc = "")
	public String getStageType(){
		return stageType; 
	}
	
	public void setStageType(String stageType){
		this.stageType=stageType;
	}
    
    @Column(name = "KEY_JOB")
	@FieldProp(symbol = "主要工作", desc = "")
	public String getKeyJob(){
		return keyJob; 
	}
	
	public void setKeyJob(String keyJob){
		this.keyJob=keyJob;
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
