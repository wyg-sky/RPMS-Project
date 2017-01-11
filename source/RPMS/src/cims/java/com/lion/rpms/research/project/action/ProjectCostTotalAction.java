package com.lion.rpms.research.project.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.research.project.manager.ProjectCostTotalManager;
import com.lion.rpms.research.project.model.ProjectCostTotal;

/**
 * @description ：项目费用归集action
 * @date ： 2016-10-13 14:23:10
 * @author ：杨尚山
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectCostTotalAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public ProjectCostTotalAction(ProjectCostTotal businessObject, ProjectCostTotalManager manager) {
		super(businessObject, manager);
	}
}
