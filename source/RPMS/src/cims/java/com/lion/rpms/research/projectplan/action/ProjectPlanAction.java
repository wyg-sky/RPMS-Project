package com.lion.rpms.research.projectplan.action;

import com.lion.rpms.research.projectplan.manager.ProjectPlanManager;
import com.lion.rpms.research.projectplan.model.ProjectPlan;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：项目规划Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ProjectPlanAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ProjectPlanAction(ProjectPlan businessObject, ProjectPlanManager manager) {
		super(businessObject, manager);
	}
}
