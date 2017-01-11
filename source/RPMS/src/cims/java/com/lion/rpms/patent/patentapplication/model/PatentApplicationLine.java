package com.lion.rpms.patent.patentapplication.model;

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
 * @description ：专利申请管理明细Model
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_PATENT_APPLICATION_TALENT")
@ModelProp(symbol = "专利申请管理明细")
public class PatentApplicationLine extends IdentifiableEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String mainId;	//专利ID
	private ResearchTalent talentId;	//发明人ID

	@Column(name = "MAIN_ID")
	@FieldProp(symbol = "专利ID", desc = "")
	public String getMainId() {
		return mainId;
	}
	public void setMainId(String mainId) {
		this.mainId = mainId;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "TALENT_ID")
	@FieldProp(symbol = "发明人", desc = "")
	public ResearchTalent getTalentId() {
		return talentId;
	}
	
	public void setTalentId(ResearchTalent talentId) {
		this.talentId = talentId;
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
