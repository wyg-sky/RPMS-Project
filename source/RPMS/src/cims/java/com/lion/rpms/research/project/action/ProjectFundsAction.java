package com.lion.rpms.research.project.action;

import com.lion.rpms.research.project.manager.ProjectFundsManager;
import com.lion.rpms.research.project.model.ProjectFunds;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目立项管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-12 12:57:10
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectFundsAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectFundsAction(ProjectFunds businessObject, ProjectFundsManager manager) {
        super(businessObject, manager);
    }
	
}
