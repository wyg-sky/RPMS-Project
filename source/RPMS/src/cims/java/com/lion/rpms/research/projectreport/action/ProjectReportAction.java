package com.lion.rpms.research.projectreport.action;

import com.lion.rpms.research.projectreport.manager.ProjectReportManager;
import com.lion.rpms.research.projectreport.model.ProjectReport;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 外部项目申报Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 14:27:23
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectReportAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectReportAction(ProjectReport businessObject, ProjectReportManager manager) {
        super(businessObject, manager);
    }
	
}
