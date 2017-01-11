package com.lion.rpms.innovate.innovatequartercheck.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.innovate.innovatequartercheck.manager.InnovateQuarterCheckManager;
import com.lion.rpms.innovate.innovatequartercheck.model.InnovateQuarterCheck;

/**
 * @description ：季度检查项目管理业务实现类
 * @date ： 2015-03-12 13:39:57
 * @author ：周强
 */
public class InnovateQuarterCheckManagerImpl extends BusinessManagerImpl<InnovateQuarterCheck,String> implements InnovateQuarterCheckManager {
	public InnovateQuarterCheckManagerImpl(GenericDao<InnovateQuarterCheck, String> dao) {
		super(dao);
		//this.setDataPower("100");
	}
}
