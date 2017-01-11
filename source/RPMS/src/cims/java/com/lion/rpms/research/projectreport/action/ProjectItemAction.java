package com.lion.rpms.research.projectreport.action;

import com.lion.rpms.research.projectreport.manager.ProjectItemManager;
import com.lion.rpms.research.projectreport.model.ProjectItem;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目合并包涵项目明细Action类
 * @Author : 曹鹏程
 * @Date ：2015-04-22 18:27:51
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectItemAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectItemAction(ProjectItem businessObject, ProjectItemManager manager) {
        super(businessObject, manager);
    }
	
}
