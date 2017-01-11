package com.lion.rpms.research.porjectaward.action;

import com.lion.rpms.research.porjectaward.manager.ProjectAwardLineManager;
import com.lion.rpms.research.porjectaward.model.ProjectAwardLine;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：通知管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ProjectAwardLineAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ProjectAwardLineAction(ProjectAwardLine businessObject, ProjectAwardLineManager manager) {
		super(businessObject, manager);
	}
}
