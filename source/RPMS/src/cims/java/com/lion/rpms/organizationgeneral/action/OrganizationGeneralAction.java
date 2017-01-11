package com.lion.rpms.organizationgeneral.action;

import com.lion.rpms.organizationgeneral.manager.OrganizationGeneralManager;
import com.lion.rpms.organizationgeneral.model.OrganizationGeneral;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：单位概况管理action
 * @date ： 2016-11-16 17:49:47
 * @author ：杨尚山
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class OrganizationGeneralAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public OrganizationGeneralAction(OrganizationGeneral businessObject, OrganizationGeneralManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * 根据分中心,年度,月度获取项目信息
	 */
	public String genOrgGeneralData() throws Exception{
		OrganizationGeneralManager manager = (OrganizationGeneralManager) this.manager;
		String json = manager.genOrgGeneralData(this.getRequest());
		this.print(json);
		return NONE;
	}
}
