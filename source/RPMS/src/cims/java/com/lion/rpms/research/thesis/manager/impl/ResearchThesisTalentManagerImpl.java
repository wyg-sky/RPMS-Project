package com.lion.rpms.research.thesis.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.thesis.manager.ResearchThesisTalentManager;
import com.lion.rpms.research.thesis.model.ResearchThesisTalent;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：专利管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchThesisTalentManagerImpl extends BusinessManagerImpl<ResearchThesisTalent,String> implements ResearchThesisTalentManager {
	public ResearchThesisTalentManagerImpl(GenericDao<ResearchThesisTalent, String> dao) {
		super(dao);
//		this.setDataPower("100");
	}
}
