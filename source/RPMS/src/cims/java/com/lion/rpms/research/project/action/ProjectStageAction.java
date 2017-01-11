package com.lion.rpms.research.project.action;

import com.lion.rpms.research.project.manager.ProjectStageManager;
import com.lion.rpms.research.project.model.ProjectStage;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目进度阶段Action类
 * @Author : 曹鹏程
 * @Date ：2015-04-28 11:41:22
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectStageAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectStageAction(ProjectStage businessObject, ProjectStageManager manager) {
        super(businessObject, manager);
    }
	
}
