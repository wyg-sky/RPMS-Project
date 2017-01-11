package com.lion.rpms.innovate.innovateyearcheck.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.innovate.innovateyearcheck.manager.InnovateYearCheckManager;
import com.lion.rpms.innovate.innovateyearcheck.model.InnovateYearCheck;

/**
 * @description ：年度考核标准管理业务实现类
 * @date ： 2015-03-16 08:49:30
 * @author ：周强
 */
public class InnovateYearCheckManagerImpl extends BusinessManagerImpl<InnovateYearCheck,String> implements InnovateYearCheckManager {
	public InnovateYearCheckManagerImpl(GenericDao<InnovateYearCheck, String> dao) {
		super(dao);
		//this.setDataPower("100");
	}
}
