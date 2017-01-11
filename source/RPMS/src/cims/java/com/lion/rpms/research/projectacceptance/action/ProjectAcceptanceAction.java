package com.lion.rpms.research.projectacceptance.action;

import com.lion.rpms.research.projectacceptance.manager.ProjectAcceptanceManager;
import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目验收管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 15:56:38
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectAcceptanceAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectAcceptanceAction(ProjectAcceptance businessObject, ProjectAcceptanceManager manager) {
        super(businessObject, manager);
    }
	
}
