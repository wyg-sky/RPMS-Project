package com.lion.base.factory.manager.impl;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.factory.manager.FactoryImportManager;
import com.lion.base.factory.manager.FactoryManager;
import com.lion.base.factory.model.Factory;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.framework.model.LoginInfo;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 供应商业务实现
 * @date : 2013-8-29上午8:56:31
 * @author : 曹鹏程
 */
public class FactoryManagerImpl extends BusinessManagerImpl<Factory, String> implements FactoryManager {
	private FactoryImportManager factoryImportManager;
	public FactoryManagerImpl(GenericDao<Factory, String> dao) {
		super(dao);
		this.setDataPower("100");
	}
	/**
	 * 	查询登录系统类型编码
	 */
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sbHql = super.genListConditionHql(request);
		LoginInfo loginInfo = (LoginInfo)request.getSession().getAttribute(Constants.LOGININFO);	
		String systemCode = loginInfo.getModuleCode();
		if(!StringUtils.isEmpty(systemCode)) {
			sbHql.append(" and obj.sysType = '");
			sbHql.append(systemCode);
			sbHql.append("'");
		}
		return sbHql;
	}
	@Override
	public String importFactory(HttpServletRequest request) {
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)request.getSession().getAttribute(Constants.USER_VIEW);
		String importType = request.getParameter("importType");
		String importCode = request.getParameter("importCode");
		String importSysId = request.getParameter("importSysId");		
		String str = this.factoryImportManager.importFactory(importType, importCode, importSysId, organization, user);
		return str;
	}
	
	public FactoryImportManager getFactoryImportManager() {
		return factoryImportManager;
	}

	public void setFactoryImportManager(FactoryImportManager factoryImportManager) {
		this.factoryImportManager = factoryImportManager;
	}

	@Override
	public boolean insertInto(Organization organization, String id, String factoryCd, String factoryName,
			String mobilePhone, String telephone, String taxNum, String bankName, String accountNum, String email,
			String capitalAmt, String legalPersonName, String factoryNation, String factoryProvince, String zip,
			String fax, String linkMan, String remark, Date createTime, String groupValid,String factoryType) {
		
		try {
			Factory factory = new Factory();
			
			if(organization!=null){
				factory.setOrganization(organization);
			}
			
			if(factoryType.equals("外部供应商")){
				factory.setFactoryType("0005");
			}
			if(factoryType.equals("内部供应商")){
				factory.setFactoryType("0006");
			}
			if(factoryType.equals("员工供应商")){
				factory.setFactoryType("0007");
			}
			
			if(!StringUtils.isBlank(id)){
				factory.setId(id);
			}else{
				return false;
			}
			
			if(!StringUtils.isBlank(factoryCd)){
				factory.setFactoryCd(factoryCd);
			}else{
				return false;
			}
			
			if(!StringUtils.isBlank(factoryName)){
				factory.setFactoryName(factoryName);
			}else{
				return false;
			}
			
			if(!StringUtils.isBlank(mobilePhone)&&!StringUtils.isBlank(telephone)){
				String phone = mobilePhone+"("+telephone+")";
				factory.setPhonenum(phone);
			}else if(!StringUtils.isBlank(mobilePhone)&&StringUtils.isBlank(telephone)){
				factory.setPhonenum(mobilePhone);
			}else if(StringUtils.isBlank(mobilePhone)&&!StringUtils.isBlank(telephone)){
				factory.setPhonenum(telephone);
			}
			
			if(!StringUtils.isBlank(taxNum)){
				factory.setTaxNum(taxNum);
			}
			
			if(!StringUtils.isBlank(groupValid)){
				factory.setGroupValid(groupValid);
			}else{
				return false;
			}
			
			if(createTime!=null){
				factory.setCreateTime(createTime);
			}else{
				return false;
			}
			
			factory.setBankName(bankName);
			
			factory.setAccountNum(accountNum);
			
			factory.setEmail(email);
			
			if(!StringUtils.isBlank(capitalAmt)){
				factory.setCapitalAmt(Double.parseDouble(capitalAmt));
			}
			
			factory.setLegalPersonName(legalPersonName);
			
			factory.setFactoryNation(factoryNation);
			
			factory.setFactoryProvince(factoryProvince);
			
			factory.setZip(zip);
			
			factory.setFax(fax);
			
			factory.setLinkman(linkMan);
			
			factory.setRemark(remark);
			
			factory.setValid("1");
			 
			factory.setDataType("0001");
			
			factory.setSysType("015");
			
			this.save(factory);
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
