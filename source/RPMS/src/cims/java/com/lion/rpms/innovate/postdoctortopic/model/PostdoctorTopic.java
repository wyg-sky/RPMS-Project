package com.lion.rpms.innovate.postdoctortopic.model;

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
import com.lion.rpms.base.researchtalent.model.ResearchTalent;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @description ：博士后课题管理Model
 * @date ： 2015-03-16 09:09:33
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_POSTDOCTOR_TOPIC")
@ModelProp(symbol = "博士后课题管理")
public class PostdoctorTopic extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
	private String topic;	//课题名称
	private String startDate;	//开始日期
	private String endDate;	//结束日期
	private ResearchTalent talent;	//博士后姓名
	private String state;	//状态
	private String inDate;	//进站时间
	private String outDate;	//出站时间
	private String remark;	//备注
	private List<Document> documents = new ArrayList<Document>(); //文档附件

	public PostdoctorTopic(){}
	
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

	@Column(name = "TOPIC")
	@FieldProp(symbol = "课题名称", desc = "")
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}

	@Column(name = "START_DATE")
	@FieldProp(symbol = "开始日期", desc = "")
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	@Column(name = "END_DATE")
	@FieldProp(symbol = "结束日期", desc = "")
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "TALENT_ID")
	@FieldProp(symbol = "博士后", desc = "")
	public ResearchTalent getTalent() {
		return talent;
	}

	public void setTalent(ResearchTalent talent) {
		this.talent = talent;
	}

	@Column(name = "STATE")
	@FieldProp(symbol = "状态", desc = "")
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

	@Column(name = "IN_DATE")
	@FieldProp(symbol = "进站时间", desc = "")
	public String getInDate() {
		return inDate;
	}
	public void setInDate(String inDate) {
		this.inDate = inDate;
	}

	@Column(name = "OUT_DATE")
	@FieldProp(symbol = "出站时间", desc = "")
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
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
