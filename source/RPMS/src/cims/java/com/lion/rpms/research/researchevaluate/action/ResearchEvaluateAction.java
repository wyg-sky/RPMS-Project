package com.lion.rpms.research.researchevaluate.action;

import com.lion.rpms.research.researchevaluate.manager.ResearchEvaluateManager;
import com.lion.rpms.research.researchevaluate.model.ResearchEvaluate;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：评价管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchEvaluateAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchEvaluateAction(ResearchEvaluate businessObject, ResearchEvaluateManager manager) {
		super(businessObject, manager);
	}
}
