package com.lion.base.factory.manager;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.factory.model.Factory;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.organization.model.Organization;

/**
 * @description : 设备供应商业务接口
 * @date : 2013-8-19下午03:55:08
 * @author : 曹鹏程
 */
public abstract interface FactoryManager extends BusinessManager<Factory, String>{
	/**
	 * 
	 * @description : 导入方法
	 * @date : 2013-11-12上午09:25:26
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importFactory(HttpServletRequest request);
	
	/**
	 * 
	 * @param organization 组织单位
	 * @param id
	 * @param factoryCd 编码
	 * @param factoryName 名称
	 * @param mobilePhone 手机号
	 * @param telephone 座机号
	 * @param taxNum 税号
	 * @param bankName 开户行
	 * @param accountNum 账号
	 * @param email 邮箱
	 * @param capitalAmt 注册资金
	 * @param legalPersonName 法人代表
	 * @param factoryNation 国家
	 * @param factoryProvince 城市
	 * @param zip 邮编
	 * @param fax 传真
	 * @param linkMan 联系人
	 * @param remark 备注
	 * @param createTime  创建时间
	 * @param groupValid 集团是否有效
	 * @return
	 */
	public boolean insertInto(Organization organization,String id,String factoryCd,String factoryName,String mobilePhone,
			String telephone,String taxNum,String bankName,String accountNum,String email,String capitalAmt,String legalPersonName,
			String factoryNation,String factoryProvince,String zip,String fax,String linkMan,String remark,Date createTime,
			String groupValid,String factoryType);
}

