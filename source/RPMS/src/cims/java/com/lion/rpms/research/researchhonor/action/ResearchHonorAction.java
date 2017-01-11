package com.lion.rpms.research.researchhonor.action;

import com.lion.rpms.research.researchhonor.manager.ResearchHonorManager;
import com.lion.rpms.research.researchhonor.model.ResearchHonor;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：荣誉管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchHonorAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchHonorAction(ResearchHonor businessObject, ResearchHonorManager manager) {
		super(businessObject, manager);
	}
}
