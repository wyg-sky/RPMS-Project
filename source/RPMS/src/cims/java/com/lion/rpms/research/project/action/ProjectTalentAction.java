package com.lion.rpms.research.project.action;

import com.lion.rpms.research.project.manager.ProjectTalentManager;
import com.lion.rpms.research.project.model.ProjectTalent;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目立项管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-12 12:57:10
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectTalentAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectTalentAction(ProjectTalent businessObject, ProjectTalentManager manager) {
        super(businessObject, manager);
    }
	
}
