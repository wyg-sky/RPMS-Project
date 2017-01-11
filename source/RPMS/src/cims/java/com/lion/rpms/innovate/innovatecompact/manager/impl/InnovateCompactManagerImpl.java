package com.lion.rpms.innovate.innovatecompact.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.innovate.innovatecompact.manager.InnovateCompactManager;
import com.lion.rpms.innovate.innovatecompact.model.InnovateCompact;

/**
 * @description ：合同管理业务实现类
 * @date ： 2015-03-12 09:47:49
 * @author ：周强
 */
public class InnovateCompactManagerImpl extends BusinessManagerImpl<InnovateCompact,String> implements InnovateCompactManager {
	public InnovateCompactManagerImpl(GenericDao<InnovateCompact, String> dao) {
		super(dao);
		//this.setDataPower("100");
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		// TODO Auto-generated method stub
		return PlatCenterUtil.addPlatCtrl(super.genListConditionHql(request), this);
	}
}
