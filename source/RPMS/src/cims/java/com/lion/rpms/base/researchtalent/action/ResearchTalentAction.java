package com.lion.rpms.base.researchtalent.action;

import com.lion.rpms.base.researchtalent.manager.ResearchTalentManager;
import com.lion.rpms.base.researchtalent.model.ResearchTalent;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：创新人才管理action
 * @date ： 2015-03-09 15:39:36
 * @author ：WangYG
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ResearchTalentAction extends BusinessAction {
	private static final long serialVersionUID = 1L;

	public ResearchTalentAction(ResearchTalent businessObject, ResearchTalentManager manager) {
		super(businessObject, manager);
	}

}
