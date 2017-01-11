package com.lion.rpms.common.rolecontrol.manager.impl;

import java.io.Serializable;
import java.util.Set;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.common.rolecontrol.manager.RoleControlManager;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

public class RoleControlManagerImpl extends BusinessManagerImpl<Object, Serializable>implements RoleControlManager{

	public RoleControlManagerImpl(GenericDao<Object, Serializable> dao) {
		super(dao);
	}
	
	public String isAllRole() throws Exception{
		
		StringBuilder code = new StringBuilder("roles");
		
		Set<String> roleCodes = PlatCenterUtil.getCurrentRoleCodes();
		if(PlatCenterUtil.hasRoleCode(roleCodes, "RPMS_INTERNALAWARD_ALL_ROLL")){
			code.append(",").append("INTERNALAWARD");
		}
		if(PlatCenterUtil.hasRoleCode(roleCodes, "RPMS_PATENT_ALL_ROLL")){
			code.append(",").append("PATENT");
		}
		return "{success:true,code:\""+code.toString()+"\"}";
	}

}
