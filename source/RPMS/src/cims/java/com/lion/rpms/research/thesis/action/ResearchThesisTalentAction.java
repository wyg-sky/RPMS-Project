package com.lion.rpms.research.thesis.action;

import com.lion.rpms.research.thesis.manager.ResearchThesisTalentManager;
import com.lion.rpms.research.thesis.model.ResearchThesisTalent;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：论文管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchThesisTalentAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchThesisTalentAction(ResearchThesisTalent businessObject,ResearchThesisTalentManager manager) {
		super(businessObject, manager);
	}
}
