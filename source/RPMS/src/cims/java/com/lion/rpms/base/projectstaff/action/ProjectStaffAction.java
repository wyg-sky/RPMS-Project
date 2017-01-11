package com.lion.rpms.base.projectstaff.action;

import com.lion.rpms.base.projectstaff.manager.ProjectStaffManager;
import com.lion.rpms.base.projectstaff.model.ProjectStaff;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 人员职责管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 13:09:38
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectStaffAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectStaffAction(ProjectStaff businessObject, ProjectStaffManager manager) {
        super(businessObject, manager);
    }
	
}
