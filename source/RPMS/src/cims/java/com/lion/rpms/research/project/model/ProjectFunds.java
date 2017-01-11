package com.lion.rpms.research.project.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.core.entity.IdentifiableEntity;

/**
 * @description : 项目立项管理实体类
 * @Author : 曹鹏程
 * @Date ：2015-03-12 12:57:10
 */
 
@Entity
@Table(name = "RPMS_PROJECT_FUNDS")
@ModelProp(symbol = "项目资金明细")
public class ProjectFunds extends IdentifiableEntity implements Serializable{

    private static final long serialVersionUID = 1L;
    private String mainId; //MAIN_ID; 
    private Double totalBudget; //总预算经费; 
    private Double firstBudget; //第一研发年预算经费; 
    private Double secondBudget; //第二研发年预算经费; 
    private Double firstCapitalAmount; //第一研发年资本化投资总额; 
    private Double secondCapitalAmount; //第二研发年资本化投资总额; 
    private Double specialAmount; //列入集团公司专项计划资金; 
    private Double infrastructureAmount; //列入集团公司基建计划资金; 
    private Double contractFee; //合同费; 
    private Double workingFunds; //工作经费; 
    private Double extraBudget; //集团公司成本预算外投资; 
    private Double subsidies; //外部补助资金; 
    private Double economicBenefits; //项目内转化经济效益; 
    private Double firstEconomicBenefits; //项目完成一年内经济效益; 
    
    public ProjectFunds() {
    }
    
    
    @Column(name = "MAIN_ID")
    @FieldProp(symbol = "MAIN_ID", desc = "")
    public String getMainId(){
        return mainId; 
    }
    
    public void setMainId(String mainId){
        this.mainId=mainId;
    }
    
    @Column(name = "TOTAL_BUDGET")
    @FieldProp(symbol = "总预算经费", desc = "")
    public Double getTotalBudget(){
        return totalBudget; 
    }
    
    public void setTotalBudget(Double totalBudget){
        this.totalBudget=totalBudget;
    }
    
    @Column(name = "FIRST_BUDGET")
    @FieldProp(symbol = "第一研发年预算经费", desc = "")
    public Double getFirstBudget(){
        return firstBudget; 
    }
    
    public void setFirstBudget(Double firstBudget){
        this.firstBudget=firstBudget;
    }
    
    @Column(name = "SECOND_BUDGET")
    @FieldProp(symbol = "第二研发年预算经费", desc = "")
    public Double getSecondBudget(){
        return secondBudget; 
    }
    
    public void setSecondBudget(Double secondBudget){
        this.secondBudget=secondBudget;
    }
    
    @Column(name = "FIRST_CAPITAL_AMOUNT")
    @FieldProp(symbol = "第一研发年资本化投资总额", desc = "")
    public Double getFirstCapitalAmount(){
        return firstCapitalAmount; 
    }
    
    public void setFirstCapitalAmount(Double firstCapitalAmount){
        this.firstCapitalAmount=firstCapitalAmount;
    }
    
    @Column(name = "SECOND_CAPITAL_AMOUNT")
    @FieldProp(symbol = "第二研发年资本化投资总额", desc = "")
    public Double getSecondCapitalAmount(){
        return secondCapitalAmount; 
    }
    
    public void setSecondCapitalAmount(Double secondCapitalAmount){
        this.secondCapitalAmount=secondCapitalAmount;
    }
    
    @Column(name = "SPECIAL_AMOUNT")
    @FieldProp(symbol = "列入集团公司专项计划资金", desc = "")
    public Double getSpecialAmount(){
        return specialAmount; 
    }
    
    public void setSpecialAmount(Double specialAmount){
        this.specialAmount=specialAmount;
    }
    
    @Column(name = "INFRASTRUCTURE_AMOUNT")
    @FieldProp(symbol = "列入集团公司基建计划资金", desc = "")
    public Double getInfrastructureAmount(){
        return infrastructureAmount; 
    }
    
    public void setInfrastructureAmount(Double infrastructureAmount){
        this.infrastructureAmount=infrastructureAmount;
    }
    
    @Column(name = "CONTRACT_FEE")
    @FieldProp(symbol = "合同费", desc = "")
    public Double getContractFee(){
        return contractFee; 
    }
    
    public void setContractFee(Double contractFee){
        this.contractFee=contractFee;
    }
    
    @Column(name = "WORKING_FUNDS")
    @FieldProp(symbol = "工作经费", desc = "")
    public Double getWorkingFunds(){
        return workingFunds; 
    }
    
    public void setWorkingFunds(Double workingFunds){
        this.workingFunds=workingFunds;
    }
    
    @Column(name = "EXTRA_BUDGET")
    @FieldProp(symbol = "集团公司成本预算外投资", desc = "")
    public Double getExtraBudget(){
        return extraBudget; 
    }
    
    public void setExtraBudget(Double extraBudget){
        this.extraBudget=extraBudget;
    }
    
    @Column(name = "SUBSIDIES")
    @FieldProp(symbol = "外部补助资金", desc = "")
    public Double getSubsidies(){
        return subsidies; 
    }
    
    public void setSubsidies(Double subsidies){
        this.subsidies=subsidies;
    }
    
    @Column(name = "ECONOMIC_BENEFITS")
    @FieldProp(symbol = "项目内转化经济效益", desc = "")
    public Double getEconomicBenefits(){
        return economicBenefits; 
    }
    
    public void setEconomicBenefits(Double economicBenefits){
        this.economicBenefits=economicBenefits;
    }
    
    @Column(name = "FIRST_ECONOMIC_BENEFITS")
    @FieldProp(symbol = "项目完成一年内经济效益", desc = "")
    public Double getFirstEconomicBenefits(){
        return firstEconomicBenefits; 
    }
    
    public void setFirstEconomicBenefits(Double firstEconomicBenefits){
        this.firstEconomicBenefits=firstEconomicBenefits;
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
