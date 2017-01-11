package com.lion.rpms.research.researchpatent.action;

import com.lion.rpms.research.researchpatent.manager.ResearchPatentManager;
import com.lion.rpms.research.researchpatent.model.ResearchPatent;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：专利管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchPatentAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchPatentAction(ResearchPatent businessObject,ResearchPatentManager manager) {
		super(businessObject, manager);
	}
}
