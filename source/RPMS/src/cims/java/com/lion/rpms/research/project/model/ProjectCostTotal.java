package com.lion.rpms.research.project.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lion.core.entity.IdentifiableEntity;
import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;

/**
 * @description ：项目费用归集Model
 * @date ： 2016-10-13 14:23:10
 * @author ：杨尚山
 */
@Entity
@Table(name = "RPMS_PROJECT_COST_TOTAL")
@ModelProp(symbol = "项目费用归集")
public class ProjectCostTotal extends IdentifiableEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private String mainId;//主表id
	private String dispatchMonth;	//月度
	private String projectStage;	//项目进展阶段
	private Double gzxj;	//工资薪金
	private Double wxyj;	//五险一金
	private Double clf;	//材料费
	private Double rlf;	//燃料费
	private Double dlf;	//动力费
	private Double szf;	//试制费
	private Double ypyjf;	//样品样机费
	private Double jcf;	//检测费
	private Double wxf;	//维修费
	private Double zlf;	//租赁费
	private Double yqzj;	//仪器折旧
	private Double sbzj;	//设备折旧
	private Double rjtx;	//软件摊销
	private Double zltx;	//专利摊销
	private Double fzljstx;	//非专利技术摊销
	private Double sjf;	//设计费
	private Double gczdf;	//规程制定费
	private Double xycsyf;	//新药床试验费
	private Double ktsyf;	//勘探试验费
	private Double xmjdf;	//项目鉴定费
	private Double zlfy;	//专利费用
	private Double qtfy;	//其他费用
	private Double htf;	//合同费
	private Double wxzctx;	//无形资产摊销
	private Double jzwzjf;	//建筑物折旧费
	private Double gzsbyj;	//购置设备原价
	private Double lzzfzj;	//来自政府资金
	private Double tjhj;	//统计合计
	private Double gjhj;	//归集合计

	public ProjectCostTotal(){}

	@Column(name = "MAIN_ID")
	@FieldProp(symbol = "项目进展阶段", desc = "")
	public String getMainId() {
		return mainId;
	}

	public void setMainId(String mainId) {
		this.mainId = mainId;
	}

	@Column(name = "DISPATCH_MONTH")
	@FieldProp(symbol = "月度", desc = "")
	public String getDispatchMonth() {
		return dispatchMonth;
	}
	public void setDispatchMonth(String dispatchMonth) {
		this.dispatchMonth = dispatchMonth;
	}

	@Column(name = "PROJECT_STAGE")
	@FieldProp(symbol = "项目进展阶段", desc = "")
	public String getProjectStage() {
		return projectStage;
	}
	public void setProjectStage(String projectStage) {
		this.projectStage = projectStage;
	}

	@Column(name = "GZXJ")
	@FieldProp(symbol = "工资薪金", desc = "")
	public Double getGzxj() {
		return gzxj;
	}
	public void setGzxj(Double gzxj) {
		this.gzxj = gzxj;
	}

	@Column(name = "WXYJ")
	@FieldProp(symbol = "五险一金", desc = "")
	public Double getWxyj() {
		return wxyj;
	}
	public void setWxyj(Double wxyj) {
		this.wxyj = wxyj;
	}

	@Column(name = "CLF")
	@FieldProp(symbol = "材料费", desc = "")
	public Double getClf() {
		return clf;
	}
	public void setClf(Double clf) {
		this.clf = clf;
	}

	@Column(name = "RLF")
	@FieldProp(symbol = "燃料费", desc = "")
	public Double getRlf() {
		return rlf;
	}
	public void setRlf(Double rlf) {
		this.rlf = rlf;
	}

	@Column(name = "DLF")
	@FieldProp(symbol = "动力费", desc = "")
	public Double getDlf() {
		return dlf;
	}
	public void setDlf(Double dlf) {
		this.dlf = dlf;
	}

	@Column(name = "SZF")
	@FieldProp(symbol = "试制费", desc = "")
	public Double getSzf() {
		return szf;
	}
	public void setSzf(Double szf) {
		this.szf = szf;
	}

	@Column(name = "YPYJF")
	@FieldProp(symbol = "样品样机费", desc = "")
	public Double getYpyjf() {
		return ypyjf;
	}
	public void setYpyjf(Double ypyjf) {
		this.ypyjf = ypyjf;
	}

	@Column(name = "JCF")
	@FieldProp(symbol = "检测费", desc = "")
	public Double getJcf() {
		return jcf;
	}
	public void setJcf(Double jcf) {
		this.jcf = jcf;
	}

	@Column(name = "WXF")
	@FieldProp(symbol = "维修费", desc = "")
	public Double getWxf() {
		return wxf;
	}
	public void setWxf(Double wxf) {
		this.wxf = wxf;
	}

	@Column(name = "ZLF")
	@FieldProp(symbol = "租赁费", desc = "")
	public Double getZlf() {
		return zlf;
	}
	public void setZlf(Double zlf) {
		this.zlf = zlf;
	}

	@Column(name = "YQZJ")
	@FieldProp(symbol = "仪器折旧", desc = "")
	public Double getYqzj() {
		return yqzj;
	}
	public void setYqzj(Double yqzj) {
		this.yqzj = yqzj;
	}

	@Column(name = "SBZJ")
	@FieldProp(symbol = "设备折旧", desc = "")
	public Double getSbzj() {
		return sbzj;
	}
	public void setSbzj(Double sbzj) {
		this.sbzj = sbzj;
	}

	@Column(name = "RJTX")
	@FieldProp(symbol = "软件摊销", desc = "")
	public Double getRjtx() {
		return rjtx;
	}
	public void setRjtx(Double rjtx) {
		this.rjtx = rjtx;
	}

	@Column(name = "ZLTX")
	@FieldProp(symbol = "专利摊销", desc = "")
	public Double getZltx() {
		return zltx;
	}
	public void setZltx(Double zltx) {
		this.zltx = zltx;
	}

	@Column(name = "FZLJSTX")
	@FieldProp(symbol = "非专利技术摊销", desc = "")
	public Double getFzljstx() {
		return fzljstx;
	}
	public void setFzljstx(Double fzljstx) {
		this.fzljstx = fzljstx;
	}

	@Column(name = "SJF")
	@FieldProp(symbol = "设计费", desc = "")
	public Double getSjf() {
		return sjf;
	}
	public void setSjf(Double sjf) {
		this.sjf = sjf;
	}

	@Column(name = "GCZDF")
	@FieldProp(symbol = "规程制定费", desc = "")
	public Double getGczdf() {
		return gczdf;
	}
	public void setGczdf(Double gczdf) {
		this.gczdf = gczdf;
	}

	@Column(name = "XYCSYF")
	@FieldProp(symbol = "新药床试验费", desc = "")
	public Double getXycsyf() {
		return xycsyf;
	}
	public void setXycsyf(Double xycsyf) {
		this.xycsyf = xycsyf;
	}

	@Column(name = "KTSYF")
	@FieldProp(symbol = "勘探试验费", desc = "")
	public Double getKtsyf() {
		return ktsyf;
	}
	public void setKtsyf(Double ktsyf) {
		this.ktsyf = ktsyf;
	}

	@Column(name = "XMJDF")
	@FieldProp(symbol = "项目鉴定费", desc = "")
	public Double getXmjdf() {
		return xmjdf;
	}
	public void setXmjdf(Double xmjdf) {
		this.xmjdf = xmjdf;
	}

	@Column(name = "ZLFY")
	@FieldProp(symbol = "专利费用", desc = "")
	public Double getZlfy() {
		return zlfy;
	}
	public void setZlfy(Double zlfy) {
		this.zlfy = zlfy;
	}

	@Column(name = "QTFY")
	@FieldProp(symbol = "其他费用", desc = "")
	public Double getQtfy() {
		return qtfy;
	}
	public void setQtfy(Double qtfy) {
		this.qtfy = qtfy;
	}

	@Column(name = "HTF")
	@FieldProp(symbol = "合同费", desc = "")
	public Double getHtf() {
		return htf;
	}
	public void setHtf(Double htf) {
		this.htf = htf;
	}

	@Column(name = "WXZCTX")
	@FieldProp(symbol = "无形资产摊销", desc = "")
	public Double getWxzctx() {
		return wxzctx;
	}
	public void setWxzctx(Double wxzctx) {
		this.wxzctx = wxzctx;
	}

	@Column(name = "JZWZJF")
	@FieldProp(symbol = "建筑物折旧费", desc = "")
	public Double getJzwzjf() {
		return jzwzjf;
	}
	public void setJzwzjf(Double jzwzjf) {
		this.jzwzjf = jzwzjf;
	}

	@Column(name = "GZSBYJ")
	@FieldProp(symbol = "购置设备原价", desc = "")
	public Double getGzsbyj() {
		return gzsbyj;
	}
	public void setGzsbyj(Double gzsbyj) {
		this.gzsbyj = gzsbyj;
	}

	@Column(name = "LZZFZJ")
	@FieldProp(symbol = "来自政府资金", desc = "")
	public Double getLzzfzj() {
		return lzzfzj;
	}
	public void setLzzfzj(Double lzzfzj) {
		this.lzzfzj = lzzfzj;
	}

	@Column(name = "TJHJ")
	@FieldProp(symbol = "统计合计", desc = "")
	public Double getTjhj() {
		return tjhj;
	}
	public void setTjhj(Double tjhj) {
		this.tjhj = tjhj;
	}

	@Column(name = "GJHJ")
	@FieldProp(symbol = "归集合计", desc = "")
	public Double getGjhj() {
		return gjhj;
	}
	public void setGjhj(Double gjhj) {
		this.gjhj = gjhj;
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
