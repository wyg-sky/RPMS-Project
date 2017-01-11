package com.lion.rpms.research.researchpatent.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.researchpatent.manager.ResearchPatentLineManager;
import com.lion.rpms.research.researchpatent.model.ResearchPatentLine;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：专利管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchPatentLineManagerImpl extends BusinessManagerImpl<ResearchPatentLine,String> implements ResearchPatentLineManager {
	public ResearchPatentLineManagerImpl(GenericDao<ResearchPatentLine, String> dao) {
		super(dao);
		this.setDataPower("100");
	}
}
