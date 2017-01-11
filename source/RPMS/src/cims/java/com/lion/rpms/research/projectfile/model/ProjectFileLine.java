package com.lion.rpms.research.projectfile.model;

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
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
*通知管理从表实体类
*Author:王圣磊
*Date：2015-04-15
*/
@Entity
@Table(name = "RPMS_PROJECT_FILE_LINE")
@ModelProp(symbol = "通知接收人表")

public class ProjectFileLine extends AuditableSimpleEntity implements Serializable{
	private static final long serialVersionUID = -2906234428765187458L;
	private String mainId; //MAIN_ID;	
	private Organization receiveUnit; //接收单位;	
	private UserView receivePeople; //查看人;	
	private String fileStatus; //通知状态;	
	private String fileChecktime; //查看时间;	
	private String fileReceipt; //回执;	
	private List<Document> documentsLine = new ArrayList<Document>(); //文档附件
	
	public ProjectFileLine() {
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
    @JoinColumn(name = "RECEIVE_UNIT")
	@FieldProp(symbol = "接收单位", desc = "")
	public Organization getReceiveUnit(){
		return receiveUnit; 
	}
	
	public void setReceiveUnit(Organization receiveUnit){
		this.receiveUnit=receiveUnit;
	}
    
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "RECEIVE_PEOPLE")
	@FieldProp(symbol = "查看人", desc = "")
	public UserView getReceivePeople(){
		return receivePeople; 
	}
	
	public void setReceivePeople(UserView receivePeople){
		this.receivePeople=receivePeople;
	}
    
    @Column(name = "FILE_STATUS")
	@FieldProp(symbol = "通知状态", desc = "")
	public String getFileStatus(){
		return fileStatus; 
	}
	
	public void setFileStatus(String fileStatus){
		this.fileStatus=fileStatus;
	}
    
    @Column(name = "FILE_CHECKTIME")
	@FieldProp(symbol = "查看时间", desc = "")
	public String getFileChecktime(){
		return fileChecktime; 
	}
	
	public void setFileChecktime(String fileChecktime){
		this.fileChecktime=fileChecktime;
	}
    
    @Column(name = "FILE_RECEIPT")
	@FieldProp(symbol = "回执", desc = "")
	public String getFileReceipt(){
		return fileReceipt; 
	}
	
	public void setFileReceipt(String fileReceipt){
		this.fileReceipt=fileReceipt;
	}
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocumentsLine() {
		return documentsLine;
	}

	public void setDocumentsLine(List<Document> documentsLine) {
		this.documentsLine = documentsLine;
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
