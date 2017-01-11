package com.lion.rpms.research.thesis.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;

/**
*论文管理从表实体类
*Author:王圣磊
*Date：2015-03-19
*/
@Entity
@Table(name = "RPMS_RESEARCH_THESIS_LINE")
@ModelProp(symbol = "论文获奖")

public class ResearchThesisLine extends IdentifiableEntity implements Serializable{
	private static final long serialVersionUID = -5549850208103836721L;
	private String mainId; //main_id;	
	private String awardsName; //获奖名称;	
	private String awardsItem; //奖项名称;	
	private String awardsRank; //奖励等级;	
	private String awardsTime; //颁发时间;	
	private String awardsUnit; //颁发单位;	
	private String remark; //备注;	
	
	public ResearchThesisLine() {
	}
	
    
    @Column(name = "MAIN_ID")
	@FieldProp(symbol = "main_id", desc = "")
	public String getMainId(){
		return mainId; 
	}
	
	public void setMainId(String mainId){
		this.mainId=mainId;
	}
    
    @Column(name = "AWARDS_NAME")
	@FieldProp(symbol = "获奖名称", desc = "")
	public String getAwardsName(){
		return awardsName; 
	}
	
	public void setAwardsName(String awardsName){
		this.awardsName=awardsName;
	}
    
    @Column(name = "AWARDS_ITEM")
	@FieldProp(symbol = "奖项名称", desc = "")
	public String getAwardsItem(){
		return awardsItem; 
	}
	
	public void setAwardsItem(String awardsItem){
		this.awardsItem=awardsItem;
	}
    
    @Column(name = "AWARDS_RANK")
	@FieldProp(symbol = "奖励等级", desc = "")
	public String getAwardsRank(){
		return awardsRank; 
	}
	
	public void setAwardsRank(String awardsRank){
		this.awardsRank=awardsRank;
	}
    
    @Column(name = "AWARDS_TIME")
	@FieldProp(symbol = "颁发时间", desc = "")
	public String getAwardsTime(){
		return awardsTime; 
	}
	
	public void setAwardsTime(String awardsTime){
		this.awardsTime=awardsTime;
	}
    
    @Column(name = "AWARDS_UNIT")
	@FieldProp(symbol = "颁发单位", desc = "")
	public String getAwardsUnit(){
		return awardsUnit; 
	}
	
	public void setAwardsUnit(String awardsUnit){
		this.awardsUnit=awardsUnit;
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
