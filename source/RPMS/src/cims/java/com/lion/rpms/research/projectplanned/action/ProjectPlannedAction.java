package com.lion.rpms.research.projectplanned.action;

import com.lion.rpms.research.projectplanned.manager.ProjectPlannedManager;
import com.lion.rpms.research.projectplanned.model.ProjectPlanned;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：创新计划Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ProjectPlannedAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ProjectPlannedAction(ProjectPlanned businessObject, ProjectPlannedManager manager) {
		super(businessObject, manager);
	}
}
