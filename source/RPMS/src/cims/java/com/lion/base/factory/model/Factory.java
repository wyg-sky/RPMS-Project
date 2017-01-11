package com.lion.base.factory.model;

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

/**
 * @description : 设备供应商model 
 * @date : 2013-8-29上午8:51:13
 * @author : 曹鹏程
 */
@Entity
@Table(name = "BASE_FACTORY")
@ModelProp(symbol = "设备供应商")
public class Factory extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 6129468856685258153L;

	private String factoryCd; //供应商编码;	
	private String factoryName; //供应商名称;	
	private String dataType;//数据类型
	private String address; //联系地址;	
	private String phonenum; //联系电话;	
	private String factoryType; //厂商类别;	
	private String taxNum; //税号;	
	private String bankName; //开户行;	
	private String accountNum; //账号;	
	private String email; //EMAIL;	
	private Double capitalAmt; //注册资金;	
	private String legalPersonName; //法人名称;	
	private String legalPersonPhone; //法人电话;	
	private String factoryNation; //所属国家;	
	private String factoryProvince; //所属省份;	
	private String businessScope; //业务范围;	
	private String certificate; //资质证书;	
	private String reputation; //信誉;	
	private String zip; //邮编;	
	private String fax; //传真;	
	private String linkman; //联系人;	
	private String remark; //备注;	
	private String factoryWebsite; //网址;	
	private String safeSign; //安全认证;	
	private String productionLicense; //产品许可;	
	private String valid; //是否有效,0:无效,1:有效,缺省为1;	
	private String groupValid;	//集团是否有效
	private Organization organization; //所属单位;	
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	private String sysType;//模块代码
	
	public Factory() {
	}
	
	
	@Column(name = "SYSTEM_TYPE")
	@FieldProp(symbol = "模块代码", desc = "")
    public String getSysType() {
		return sysType;
	}


	public void setSysType(String sysType) {
		this.sysType = sysType;
	}


	@Column(name = "FACTORY_CD")
	@FieldProp(symbol = "供应商编码", desc = "")
	public String getFactoryCd(){
		return factoryCd; 
	}
	
	public void setFactoryCd(String factoryCd){
		this.factoryCd=factoryCd;
	}
    
    @Column(name = "FACTORY_NAME")
	@FieldProp(symbol = "供应商名称", desc = "")
	public String getFactoryName(){
		return factoryName; 
	}
	
	public void setFactoryName(String factoryName){
		this.factoryName=factoryName;
	}
    
    @Column(name = "ADDRESS")
	@FieldProp(symbol = "联系地址", desc = "")
	public String getAddress(){
		return address; 
	}
	
	public void setAddress(String address){
		this.address=address;
	}
    
    @Column(name = "PHONENUM")
	@FieldProp(symbol = "联系电话", desc = "")
	public String getPhonenum(){
		return phonenum; 
	}
	
	public void setPhonenum(String phonenum){
		this.phonenum=phonenum;
	}
    
    @Column(name = "FACTORY_TYPE")
	@FieldProp(symbol = "厂商类别", desc = "")
	public String getFactoryType(){
		return factoryType; 
	}
	
	public void setFactoryType(String factoryType){
		this.factoryType=factoryType;
	}
    
    @Column(name = "TAX_NUM")
	@FieldProp(symbol = "税号", desc = "")
	public String getTaxNum(){
		return taxNum; 
	}
	
	public void setTaxNum(String taxNum){
		this.taxNum=taxNum;
	}
    
    @Column(name = "BANK_NAME")
	@FieldProp(symbol = "开户行", desc = "")
	public String getBankName(){
		return bankName; 
	}
	
	public void setBankName(String bankName){
		this.bankName=bankName;
	}
    
    @Column(name = "ACCOUNT_NUM")
	@FieldProp(symbol = "账号", desc = "")
	public String getAccountNum(){
		return accountNum; 
	}
	
	public void setAccountNum(String accountNum){
		this.accountNum=accountNum;
	}
    
    @Column(name = "EMAIL")
	@FieldProp(symbol = "EMAIL", desc = "")
	public String getEmail(){
		return email; 
	}
	
	public void setEmail(String email){
		this.email=email;
	}
    
    @Column(name = "CAPITAL_AMT")
	@FieldProp(symbol = "注册资金", desc = "")
	public Double getCapitalAmt(){
		return capitalAmt; 
	}
	
	public void setCapitalAmt(Double capitalAmt){
		this.capitalAmt=capitalAmt;
	}
    
    @Column(name = "LEGAL_PERSON_NAME")
	@FieldProp(symbol = "法人名称", desc = "")
	public String getLegalPersonName(){
		return legalPersonName; 
	}
	
	public void setLegalPersonName(String legalPersonName){
		this.legalPersonName=legalPersonName;
	}
    
    @Column(name = "LEGAL_PERSON_PHONE")
	@FieldProp(symbol = "法人电话", desc = "")
	public String getLegalPersonPhone(){
		return legalPersonPhone; 
	}
	
	public void setLegalPersonPhone(String legalPersonPhone){
		this.legalPersonPhone=legalPersonPhone;
	}
    
    @Column(name = "FACTORY_NATION")
	@FieldProp(symbol = "所属国家", desc = "")
	public String getFactoryNation(){
		return factoryNation; 
	}
	
	public void setFactoryNation(String factoryNation){
		this.factoryNation=factoryNation;
	}
    
    @Column(name = "FACTORY_PROVINCE")
	@FieldProp(symbol = "所属省份", desc = "")
	public String getFactoryProvince(){
		return factoryProvince; 
	}
	
	public void setFactoryProvince(String factoryProvince){
		this.factoryProvince=factoryProvince;
	}
    
    @Column(name = "BUSINESS_SCOPE")
	@FieldProp(symbol = "业务范围", desc = "")
	public String getBusinessScope(){
		return businessScope; 
	}
	
	public void setBusinessScope(String businessScope){
		this.businessScope=businessScope;
	}
    
    @Column(name = "CERTIFICATE")
	@FieldProp(symbol = "资质证书", desc = "")
	public String getCertificate(){
		return certificate; 
	}
	
	public void setCertificate(String certificate){
		this.certificate=certificate;
	}
    
    @Column(name = "REPUTATION")
	@FieldProp(symbol = "信誉", desc = "")
	public String getReputation(){
		return reputation; 
	}
	
	public void setReputation(String reputation){
		this.reputation=reputation;
	}
    
    @Column(name = "ZIP")
	@FieldProp(symbol = "邮编", desc = "")
	public String getZip(){
		return zip; 
	}
	
	public void setZip(String zip){
		this.zip=zip;
	}
    
    @Column(name = "FAX")
	@FieldProp(symbol = "传真", desc = "")
	public String getFax(){
		return fax; 
	}
	
	public void setFax(String fax){
		this.fax=fax;
	}
    
    @Column(name = "LINKMAN")
	@FieldProp(symbol = "联系人", desc = "")
	public String getLinkman(){
		return linkman; 
	}
	
	public void setLinkman(String linkman){
		this.linkman=linkman;
	}
    
    @Column(name = "REMARK")
	@FieldProp(symbol = "备注", desc = "")
	public String getRemark(){
		return remark; 
	}
	
	public void setRemark(String remark){
		this.remark=remark;
	}
    
    @Column(name = "DATA_TYPE")
	@FieldProp(symbol = "数据类型", desc = "")
    public String getDataType() {
		return dataType;
	}


	public void setDataType(String dataType) {
		this.dataType = dataType;
	}


	@Column(name = "FACTORY_WEBSITE")
	@FieldProp(symbol = "网址", desc = "")
	public String getFactoryWebsite(){
		return factoryWebsite; 
	}
	
	public void setFactoryWebsite(String factoryWebsite){
		this.factoryWebsite=factoryWebsite;
	}
    
    @Column(name = "SAFE_SIGN")
	@FieldProp(symbol = "安全认证", desc = "")
	public String getSafeSign(){
		return safeSign; 
	}
	
	public void setSafeSign(String safeSign){
		this.safeSign=safeSign;
	}
    
    @Column(name = "PRODUCTION_LICENSE")
	@FieldProp(symbol = "产品许可", desc = "")
	public String getProductionLicense(){
		return productionLicense; 
	}
	
	public void setProductionLicense(String productionLicense){
		this.productionLicense=productionLicense;
	}
    
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效,0:无效,1:有效,缺省为1", desc = "")
	public String getValid(){
		return valid; 
	}
	
	public void setValid(String valid){
		this.valid=valid;
	}
	
	@Column(name = "GROUP_VALID")
	@FieldProp(symbol = "集团是否有效,0:无效,1:有效,缺省为1", desc = "")
    public String getGroupValid() {
		return groupValid;
	}

	public void setGroupValid(String groupValid) {
		this.groupValid = groupValid;
	}
	
	/**
	 * 与Organization的关联关系为：单向多对一
	 * 
	 * @return Organization
	 */
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "单位", desc = "")
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
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
	
}
