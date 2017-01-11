package com.lion.rpms.research.thesis.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.thesis.manager.ResearchThesisLineManager;
import com.lion.rpms.research.thesis.model.ResearchThesisLine;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：专利管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchThesisLineManagerImpl extends BusinessManagerImpl<ResearchThesisLine,String> implements ResearchThesisLineManager {
	public ResearchThesisLineManagerImpl(GenericDao<ResearchThesisLine, String> dao) {
		super(dao);
//		this.setDataPower("100");
	}
}
