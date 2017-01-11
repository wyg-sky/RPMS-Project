package com.lion.rpms.thesis.thesisapplication.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.research.thesis.model.ResearchThesis;
import com.lion.rpms.research.thesis.model.ResearchThesisLine;
import com.lion.rpms.thesis.thesisapplication.manager.ThesisApplicationManager;
import com.lion.rpms.thesis.thesisapplication.model.ThesisApplication;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：论文评比管理业务实现类
 * @date ： 2015-03-16 09:20:38
 * @author ：周强
 */
public class ThesisApplicationManagerImpl extends BusinessManagerImpl<ThesisApplication,String> implements ThesisApplicationManager {
	public ThesisApplicationManagerImpl(GenericDao<ThesisApplication, String> dao) {
		super(dao);
		//this.setDataPower("100");
	}
	
	@Override
	public String award(ThesisApplication obj) {
		ResearchThesis thesis = (ResearchThesis)this.commonFindById(ResearchThesis.class, obj.getThesisTitle().getId());
		List<ResearchThesisLine> list = thesis.getResearchThesisLine();
		
		ResearchThesisLine line = new ResearchThesisLine();
		line.setAwardsName(obj.getAwardsName());
		line.setAwardsItem(obj.getAwardsItem());
		line.setAwardsRank(obj.getAwardsRank());
		line.setAwardsTime(obj.getAwardsTime());
		line.setAwardsUnit(obj.getAwardsUnit());
		list.add(line);
		this.getCurrentSession().save(thesis);
		this.save(obj);
		return null;
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		// TODO Auto-generated method stub
		return PlatCenterUtil.addPlatCtrl(super.genListConditionHql(request), this);
	}
}
