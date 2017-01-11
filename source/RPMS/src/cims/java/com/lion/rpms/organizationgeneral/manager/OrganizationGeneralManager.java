package com.lion.rpms.organizationgeneral.manager;

import com.lion.system.common.manager.BusinessManager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.organizationgeneral.model.OrganizationGeneral;

/**
 * @description ：单位概况管理业务类
 * @date ： 2016-11-16 17:49:47
 * @author ：杨尚山
 */
public interface OrganizationGeneralManager extends BusinessManager<OrganizationGeneral,String> {

	/**
	 * 根据分中心,年度,月度获取项目信息
	 */
	public String genOrgGeneralData(HttpServletRequest request) throws Exception;
}
