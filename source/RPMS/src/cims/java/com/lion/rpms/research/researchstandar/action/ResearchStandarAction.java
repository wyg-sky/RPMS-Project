package com.lion.rpms.research.researchstandar.action;

import com.lion.rpms.research.researchstandar.manager.ResearchStandarManager;
import com.lion.rpms.research.researchstandar.model.ResearchStandar;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：标准管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchStandarAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchStandarAction(ResearchStandar businessObject, ResearchStandarManager manager) {
		super(businessObject, manager);
	}
}
