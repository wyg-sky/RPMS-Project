package com.lion.rpms.innovate.innovatetask.model;

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
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @description ：工作任务管理Model
 * @date ： 2015-03-11 14:48:31
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_INNOVATE_TASK")
@ModelProp(symbol = "工作任务管理")
public class InnovateTask extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private String taskName;	//任务名称
	private String taskType;	//任务类型
	private String planStartDate;	//计划开始时间
	private String palnCompleteDate;	//计划完成时间
	private String actualCompleteDate;	//实际完成时间
	private String taskContent;	//任务内容
	private String performance;	//完成情况
	private String status;	//状态
	private String executor;	//任务执行人
	private String valid;	//是否有效
	private String remark;	//备注
	private List<Document> documents = new ArrayList<Document>(); //文档附件

	public InnovateTask(){}
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}
	
	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getPlatCenter() {
		return platCenter;
	}
	public void setPlatCenter(ResearchPlat platCenter) {
		this.platCenter = platCenter;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution() {
		return platInstitution;
	}
	public void setPlatInstitution(ResearchPlat platInstitution) {
		this.platInstitution = platInstitution;
	}

	@Column(name = "TASK_NAME")
	@FieldProp(symbol = "任务名称", desc = "")
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	@Column(name = "TASK_TYPE")
	@FieldProp(symbol = "任务类型", desc = "")
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}

	@Column(name = "PLAN_START_DATE")
	@FieldProp(symbol = "计划开始时间", desc = "")
	public String getPlanStartDate() {
		return planStartDate;
	}
	public void setPlanStartDate(String planStartDate) {
		this.planStartDate = planStartDate;
	}

	@Column(name = "PALN_COMPLETE_DATE")
	@FieldProp(symbol = "计划完成时间", desc = "")
	public String getPalnCompleteDate() {
		return palnCompleteDate;
	}
	public void setPalnCompleteDate(String palnCompleteDate) {
		this.palnCompleteDate = palnCompleteDate;
	}

	@Column(name = "ACTUAL_COMPLETE_DATE")
	@FieldProp(symbol = "实际完成时间", desc = "")
	public String getActualCompleteDate() {
		return actualCompleteDate;
	}
	public void setActualCompleteDate(String actualCompleteDate) {
		this.actualCompleteDate = actualCompleteDate;
	}

	@Column(name = "TASK_CONTENT")
	@FieldProp(symbol = "任务内容", desc = "")
	public String getTaskContent() {
		return taskContent;
	}
	public void setTaskContent(String taskContent) {
		this.taskContent = taskContent;
	}

	@Column(name = "PERFORMANCE")
	@FieldProp(symbol = "完成情况", desc = "")
	public String getPerformance() {
		return performance;
	}
	public void setPerformance(String performance) {
		this.performance = performance;
	}

	@Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "EXECUTOR")
	@FieldProp(symbol = "任务执行人", desc = "")
	public String getExecutor() {
		return executor;
	}
	

	public void setExecutor(String executor) {
		this.executor = executor;
	}

	@Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
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
