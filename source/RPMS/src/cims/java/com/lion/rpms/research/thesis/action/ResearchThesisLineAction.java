package com.lion.rpms.research.thesis.action;

import com.lion.rpms.research.thesis.manager.ResearchThesisLineManager;
import com.lion.rpms.research.thesis.model.ResearchThesisLine;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：论文管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchThesisLineAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchThesisLineAction(ResearchThesisLine businessObject,ResearchThesisLineManager manager) {
		super(businessObject, manager);
	}
}
