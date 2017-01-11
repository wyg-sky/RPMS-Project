package com.lion.rpms.common.rolecontrol.action;

import com.lion.rpms.common.rolecontrol.manager.RoleControlManager;
import com.lion.system.common.action.BusinessAction;

/**
 * 修改所有状态数据的权限设置
 * @author 杨尚山
 * @date 2016-04-13
 *
 */
@SuppressWarnings({ "serial", "rawtypes" })
public class RoleControlAction extends BusinessAction{
	
	private RoleControlManager roleControlManager;
	
	public String isAllRole()throws Exception {
		try{
			String result = this.roleControlManager.isAllRole();
			this.print(result);
		}catch(Exception e){
			e.printStackTrace();
		}
		return NONE;
	} 

	public RoleControlManager getRoleControlManager() {
		return roleControlManager;
	}

	public void setRoleControlManager(RoleControlManager roleControlManager) {
		this.roleControlManager = roleControlManager;
	}
	
	

}
