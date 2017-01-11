package com.lion.rpms.research.projectspread.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.research.projectspread.model.ProjectSpread;
import com.lion.rpms.research.projectspread.manager.ProjectSpreadManager;

/**
 * @description ：项目推广管理action
 * @date ： 2015-03-12 15:01:49
 * @author ：WangYG
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectSpreadAction extends BusinessAction {
	private static final long serialVersionUID = 1L;

	public ProjectSpreadAction(ProjectSpread businessObject, ProjectSpreadManager manager) {
		super(businessObject, manager);
	}
}
