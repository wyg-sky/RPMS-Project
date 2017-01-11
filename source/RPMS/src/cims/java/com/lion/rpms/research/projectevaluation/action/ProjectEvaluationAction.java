package com.lion.rpms.research.projectevaluation.action;

import com.lion.rpms.research.projectevaluation.manager.ProjectEvaluationManager;
import com.lion.rpms.research.projectevaluation.model.ProjectEvaluation;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目后评价管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 16:30:07
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectEvaluationAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectEvaluationAction(ProjectEvaluation businessObject, ProjectEvaluationManager manager) {
        super(businessObject, manager);
    }
	
}
