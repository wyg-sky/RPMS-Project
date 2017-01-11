package com.lion.rpms.organizationgeneral.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.organization.model.Organization;

/**
 * @description ：单位概况管理Model
 * @date ： 2016-11-16 17:49:47
 * @author ：杨尚山
 */
@Entity
@Table(name = "RPMS_ORGANIZATION_GENERAL")
@ModelProp(symbol = "单位概况管理")
public class OrganizationGeneral extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String projectCode;	//projectCode
	private String shengfen;	//省份
	private ResearchPlat centerPlat;	//分中心
	private String year;	//年度
	private String month;	//月度
	private Double yfzbj;	//研发准备金
	private Double sndzyywsr;	//上年度主营业务收入
	private Double bndzyywsrys;	//本年度主营业务收入预算
	private Double yfjftrzb;	//研发经费投入指标
	private Double yffygjzb;	//研发费用归集指标
	private Double yfxmgs;	//研发项目个数
	private Double yfxmys;	//研发项目预算
	private Double yfjftj;	//研发经费统计
	private Double gjxmgs;	//归集项目个数
	private Double yffygj;	//研发费用归集
	private Double snrkyfjf;	//山能认可研发经费
	private Double stlrje;	//视同利润金额
	private Double swrkyfjf;	//税务认可研发经费
	private Double yjssdszc;	//应减少所得税支出
	private Double sjjssdszc;	//实际减少所得税支出
	private String zxsm;	//专项说明
	private String tbr;	//填报人
	private String remark;	//备注
	private Organization organization; //组织单位;	

	public OrganizationGeneral(){}

	@Column(name = "PROJECT_CODE")
	@FieldProp(symbol = "projectCode", desc = "")
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}

	@Column(name = "SHENGFEN")
	@FieldProp(symbol = "省份", desc = "")
	public String getShengfen() {
		return shengfen;
	}
	public void setShengfen(String shengfen) {
		this.shengfen = shengfen;
	}

	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "CENTER_PLAT")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getCenterPlat() {
		return centerPlat;
	}
	public void setCenterPlat(ResearchPlat centerPlat) {
		this.centerPlat = centerPlat;
	}

	@Column(name = "YEAR")
	@FieldProp(symbol = "年度", desc = "")
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}

	@Column(name = "MONTH")
	@FieldProp(symbol = "月度", desc = "")
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}

	@Column(name = "YFZBJ")
	@FieldProp(symbol = "研发准备金", desc = "")
	public Double getYfzbj() {
		return yfzbj;
	}
	public void setYfzbj(Double yfzbj) {
		this.yfzbj = yfzbj;
	}

	@Column(name = "SNDZYYWSR")
	@FieldProp(symbol = "上年度主营业务收入", desc = "")
	public Double getSndzyywsr() {
		return sndzyywsr;
	}
	public void setSndzyywsr(Double sndzyywsr) {
		this.sndzyywsr = sndzyywsr;
	}

	@Column(name = "BNDZYYWSRYS")
	@FieldProp(symbol = "本年度主营业务收入预算", desc = "")
	public Double getBndzyywsrys() {
		return bndzyywsrys;
	}
	public void setBndzyywsrys(Double bndzyywsrys) {
		this.bndzyywsrys = bndzyywsrys;
	}

	@Column(name = "YFJFTRZB")
	@FieldProp(symbol = "研发经费投入指标", desc = "")
	public Double getYfjftrzb() {
		return yfjftrzb;
	}
	public void setYfjftrzb(Double yfjftrzb) {
		this.yfjftrzb = yfjftrzb;
	}

	@Column(name = "YFFYGJZB")
	@FieldProp(symbol = "研发费用归集指标", desc = "")
	public Double getYffygjzb() {
		return yffygjzb;
	}
	public void setYffygjzb(Double yffygjzb) {
		this.yffygjzb = yffygjzb;
	}

	@Column(name = "YFXMGS")
	@FieldProp(symbol = "研发项目个数", desc = "")
	public Double getYfxmgs() {
		return yfxmgs;
	}
	public void setYfxmgs(Double yfxmgs) {
		this.yfxmgs = yfxmgs;
	}

	@Column(name = "YFXMYS")
	@FieldProp(symbol = "研发项目预算", desc = "")
	public Double getYfxmys() {
		return yfxmys;
	}
	public void setYfxmys(Double yfxmys) {
		this.yfxmys = yfxmys;
	}

	@Column(name = "YFJFTJ")
	@FieldProp(symbol = "研发经费统计", desc = "")
	public Double getYfjftj() {
		return yfjftj;
	}
	public void setYfjftj(Double yfjftj) {
		this.yfjftj = yfjftj;
	}

	@Column(name = "GJXMGS")
	@FieldProp(symbol = "归集项目个数", desc = "")
	public Double getGjxmgs() {
		return gjxmgs;
	}
	public void setGjxmgs(Double gjxmgs) {
		this.gjxmgs = gjxmgs;
	}

	@Column(name = "YFFYGJ")
	@FieldProp(symbol = "研发费用归集", desc = "")
	public Double getYffygj() {
		return yffygj;
	}
	public void setYffygj(Double yffygj) {
		this.yffygj = yffygj;
	}

	@Column(name = "SNRKYFJF")
	@FieldProp(symbol = "山能认可研发经费", desc = "")
	public Double getSnrkyfjf() {
		return snrkyfjf;
	}
	public void setSnrkyfjf(Double snrkyfjf) {
		this.snrkyfjf = snrkyfjf;
	}

	@Column(name = "STLRJE")
	@FieldProp(symbol = "视同利润金额", desc = "")
	public Double getStlrje() {
		return stlrje;
	}
	public void setStlrje(Double stlrje) {
		this.stlrje = stlrje;
	}

	@Column(name = "SWRKYFJF")
	@FieldProp(symbol = "税务认可研发经费", desc = "")
	public Double getSwrkyfjf() {
		return swrkyfjf;
	}
	public void setSwrkyfjf(Double swrkyfjf) {
		this.swrkyfjf = swrkyfjf;
	}

	@Column(name = "YJSSDSZC")
	@FieldProp(symbol = "应减少所得税支出", desc = "")
	public Double getYjssdszc() {
		return yjssdszc;
	}
	public void setYjssdszc(Double yjssdszc) {
		this.yjssdszc = yjssdszc;
	}

	@Column(name = "SJJSSDSZC")
	@FieldProp(symbol = "实际减少所得税支出", desc = "")
	public Double getSjjssdszc() {
		return sjjssdszc;
	}
	public void setSjjssdszc(Double sjjssdszc) {
		this.sjjssdszc = sjjssdszc;
	}

	@Column(name = "ZXSM")
	@FieldProp(symbol = "专项说明", desc = "")
	public String getZxsm() {
		return zxsm;
	}
	public void setZxsm(String zxsm) {
		this.zxsm = zxsm;
	}

	@Column(name = "TBR")
	@FieldProp(symbol = "填报人", desc = "")
	public String getTbr() {
		return tbr;
	}
	public void setTbr(String tbr) {
		this.tbr = tbr;
	}

	@Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public Organization getOrganization(){
		return organization; 
	}
	
	public void setOrganization(Organization organization){
		this.organization=organization;
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
