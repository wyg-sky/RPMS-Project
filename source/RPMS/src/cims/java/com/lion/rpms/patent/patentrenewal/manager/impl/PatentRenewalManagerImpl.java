package com.lion.rpms.patent.patentrenewal.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.patent.patentrenewal.manager.PatentRenewalManager;
import com.lion.rpms.patent.patentrenewal.model.PatentRenewal;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：专利续费申请管理业务实现类
 * @date ： 2015-06-03 09:50:24
 * @author ：WangYG
 */
public class PatentRenewalManagerImpl extends BusinessManagerImpl<PatentRenewal,String> implements PatentRenewalManager {
	public PatentRenewalManagerImpl(GenericDao<PatentRenewal, String> dao) {
		super(dao);
//		this.setDataPower("500");
	}
}
