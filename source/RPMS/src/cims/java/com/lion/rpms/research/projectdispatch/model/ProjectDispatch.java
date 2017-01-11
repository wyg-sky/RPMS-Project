package com.lion.rpms.research.projectdispatch.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;

/**
 * @description : 项目调度管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 14:59:24
 */
 
@Entity
@Table(name = "RPMS_PROJECT_DISPATCH")
@ModelProp(symbol = "项目调度(变更)管理")
public class ProjectDispatch extends AuditableSimpleEntity implements Serializable{

    private static final long serialVersionUID = 1L;
	private Project projectId; //项目编号;	
	private String dispatchMonth; //调度月份;	
	private String dispatchQuarter; //调度季度;	
	private String dispatchType; //调度类型;	
	private String projectStage; //项目进展阶段;	
	private String projectProgress; //形象进度;	
	private String completionRate; //项目进度完成率;	
	private Double investmentTotal; //总研发经费已投入;	
	private Double investmentNext; //总研发经费下季度预计投入;	
	private Double contractAll; //签订合同总额;	
	private Double contractInvestment; //合同费已投入;	
	private Double contractNext; //合同费下季度预计投入;	
	private Double subsidiesAll; //外部资金总额;	
	private Double subsidiesTotal; //外部资金已到位;	
	private Double subsidiesNext; //外部资金下季度预计到位;	
	private Double capitalTotal; //累计资本化投入;	
	private String projectStatus; //项目状态;	
	private String changeType; //变更类型;	
	private String delayYear; //延期年度;	
	private String changeReason; //项目变更原因;	
	private String reportUser; //填报人;	
	private String reportTime; //填报时间;	
	private String status; //状态;	
	private String approveUser; //审批人;	
	private String approveTime; //填报时间;	
	private String organization; //组织单位;	
	private String remark; //备注;
	private String type; //（0001项目调度，0002项目变更）;	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	private Double ysxjjxy;//已实现经济效益
	private Double caiwuCost;//财务归集研发费用
	
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
	
	public ProjectDispatch() {
	}
	
	@Column(name = "YSXJJXY")
	@FieldProp(symbol = "已实现经济效益", desc = "")
	public Double getYsxjjxy() {
		return ysxjjxy;
	}

	public void setYsxjjxy(Double ysxjjxy) {
		this.ysxjjxy = ysxjjxy;
	}
	
	@Column(name = "TYPE")
	@FieldProp(symbol = "0001项目调度，0002项目变更", desc = "")
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
    
	@ManyToOne(cascade={javax.persistence.CascadeType.REFRESH}, fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name = "PROJECT_ID")
	@FieldProp(symbol = "项目编号", desc = "")
	public Project getProjectId(){
		return projectId; 
	}
	
	public void setProjectId(Project projectId){
		this.projectId=projectId;
	}
    
    @Column(name = "DISPATCH_MONTH")
	@FieldProp(symbol = "调度月份", desc = "")
	public String getDispatchMonth(){
		return dispatchMonth; 
	}
	
	public void setDispatchMonth(String dispatchMonth){
		this.dispatchMonth=dispatchMonth;
	}
    
    @Column(name = "DISPATCH_QUARTER")
	@FieldProp(symbol = "调度季度", desc = "")
	public String getDispatchQuarter(){
		return dispatchQuarter; 
	}
	
	public void setDispatchQuarter(String dispatchQuarter){
		this.dispatchQuarter=dispatchQuarter;
	}
    
    @Column(name = "DISPATCH_TYPE")
	@FieldProp(symbol = "调度类型", desc = "")
	public String getDispatchType(){
		return dispatchType; 
	}
	
	public void setDispatchType(String dispatchType){
		this.dispatchType=dispatchType;
	}
    
    @Column(name = "PROJECT_STAGE")
	@FieldProp(symbol = "项目进展阶段", desc = "")
	public String getProjectStage(){
		return projectStage; 
	}
	
	public void setProjectStage(String projectStage){
		this.projectStage=projectStage;
	}
    
    @Column(name = "PROJECT_PROGRESS")
	@FieldProp(symbol = "形象进度", desc = "")
	public String getProjectProgress(){
		return projectProgress; 
	}
	
	public void setProjectProgress(String projectProgress){
		this.projectProgress=projectProgress;
	}
    
    @Column(name = "COMPLETION_RATE")
	@FieldProp(symbol = "项目进度完成率", desc = "")
	public String getCompletionRate(){
		return completionRate; 
	}
	
	public void setCompletionRate(String completionRate){
		this.completionRate=completionRate;
	}
    
    @Column(name = "INVESTMENT_TOTAL")
	@FieldProp(symbol = "总研发经费已投入", desc = "")
	public Double getInvestmentTotal(){
		return investmentTotal; 
	}
	
	public void setInvestmentTotal(Double investmentTotal){
		this.investmentTotal=investmentTotal;
	}
    
    @Column(name = "INVESTMENT_NEXT")
	@FieldProp(symbol = "总研发经费下季度预计投入", desc = "")
	public Double getInvestmentNext(){
		return investmentNext; 
	}
	
	public void setInvestmentNext(Double investmentNext){
		this.investmentNext=investmentNext;
	}
    
    @Column(name = "CONTRACT_ALL")
	@FieldProp(symbol = "签订合同总额", desc = "")
	public Double getContractAll(){
		return contractAll; 
	}
	
	public void setContractAll(Double contractAll){
		this.contractAll=contractAll;
	}
    
    @Column(name = "CONTRACT_INVESTMENT")
	@FieldProp(symbol = "合同费已投入", desc = "")
	public Double getContractInvestment(){
		return contractInvestment; 
	}
	
	public void setContractInvestment(Double contractInvestment){
		this.contractInvestment=contractInvestment;
	}
    
    @Column(name = "CONTRACT_NEXT")
	@FieldProp(symbol = "合同费下季度预计投入", desc = "")
	public Double getContractNext(){
		return contractNext; 
	}
	
	public void setContractNext(Double contractNext){
		this.contractNext=contractNext;
	}
    
    @Column(name = "SUBSIDIES_ALL")
	@FieldProp(symbol = "外部资金总额", desc = "")
	public Double getSubsidiesAll(){
		return subsidiesAll; 
	}
	
	public void setSubsidiesAll(Double subsidiesAll){
		this.subsidiesAll=subsidiesAll;
	}
    
    @Column(name = "SUBSIDIES_TOTAL")
	@FieldProp(symbol = "外部资金已到位", desc = "")
	public Double getSubsidiesTotal(){
		return subsidiesTotal; 
	}
	
	public void setSubsidiesTotal(Double subsidiesTotal){
		this.subsidiesTotal=subsidiesTotal;
	}
    
    @Column(name = "SUBSIDIES_NEXT")
	@FieldProp(symbol = "外部资金下季度预计到位", desc = "")
	public Double getSubsidiesNext(){
		return subsidiesNext; 
	}
	
	public void setSubsidiesNext(Double subsidiesNext){
		this.subsidiesNext=subsidiesNext;
	}
    
    @Column(name = "CAPITAL_TOTAL")
	@FieldProp(symbol = "累计资本化投入", desc = "")
	public Double getCapitalTotal(){
		return capitalTotal; 
	}
	
	public void setCapitalTotal(Double capitalTotal){
		this.capitalTotal=capitalTotal;
	}
    
    @Column(name = "PROJECT_STATUS")
	@FieldProp(symbol = "项目状态", desc = "")
	public String getProjectStatus(){
		return projectStatus; 
	}
	
	public void setProjectStatus(String projectStatus){
		this.projectStatus=projectStatus;
	}
    
    @Column(name = "CHANGE_TYPE")
	@FieldProp(symbol = "变更类型", desc = "")
	public String getChangeType(){
		return changeType; 
	}
	
	public void setChangeType(String changeType){
		this.changeType=changeType;
	}
    
    @Column(name = "DELAY_YEAR")
	@FieldProp(symbol = "", desc = "")
	public String getDelayYear(){
		return delayYear; 
	}
	
	public void setDelayYear(String delayYear){
		this.delayYear=delayYear;
	}
    
    @Column(name = "CHANGE_REASON")
	@FieldProp(symbol = "项目变更原因", desc = "")
	public String getChangeReason(){
		return changeReason; 
	}
	
	public void setChangeReason(String changeReason){
		this.changeReason=changeReason;
	}
    
    @Column(name = "REPORT_USER")
	@FieldProp(symbol = "填报人", desc = "")
	public String getReportUser(){
		return reportUser; 
	}
	
	public void setReportUser(String reportUser){
		this.reportUser=reportUser;
	}
    
    @Column(name = "REPORT_TIME")
	@FieldProp(symbol = "填报时间", desc = "")
	public String getReportTime(){
		return reportTime; 
	}
	
	public void setReportTime(String reportTime){
		this.reportTime=reportTime;
	}
    
    @Column(name = "STATUS")
	@FieldProp(symbol = "状态", desc = "")
	public String getStatus(){
		return status; 
	}
	
	public void setStatus(String status){
		this.status=status;
	}
    
    @Column(name = "APPROVE_USER")
	@FieldProp(symbol = "审批人", desc = "")
	public String getApproveUser(){
		return approveUser; 
	}
	
	public void setApproveUser(String approveUser){
		this.approveUser=approveUser;
	}
    
    @Column(name = "APPROVE_TIME")
	@FieldProp(symbol = "填报时间", desc = "")
	public String getApproveTime(){
		return approveTime; 
	}
	
	public void setApproveTime(String approveTime){
		this.approveTime=approveTime;
	}
    
    @Column(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
	public String getOrganization(){
		return organization; 
	}
	
	public void setOrganization(String organization){
		this.organization=organization;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
	
	@OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}
	
	@Column(name = "CAIWU_COST")
	@FieldProp(symbol = "财务归集研发费用", desc = "")
	public Double getCaiwuCost() {
		return caiwuCost;
	}

	public void setCaiwuCost(Double caiwuCost) {
		this.caiwuCost = caiwuCost;
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
