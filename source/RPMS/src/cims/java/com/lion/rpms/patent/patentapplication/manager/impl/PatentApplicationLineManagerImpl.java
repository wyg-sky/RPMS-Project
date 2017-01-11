package com.lion.rpms.patent.patentapplication.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.patent.patentapplication.manager.PatentApplicationLineManager;
import com.lion.rpms.patent.patentapplication.model.PatentApplicationLine;

/**
 * @description ：专利申请管理明细业务实现类
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */
public class PatentApplicationLineManagerImpl extends BusinessManagerImpl<PatentApplicationLine, String> implements PatentApplicationLineManager {
	public PatentApplicationLineManagerImpl(GenericDao<PatentApplicationLine, String> dao) {
		super(dao);
	}
}
