package com.lion.rpms.research.projectaudit.action;

import java.io.IOException;

import com.lion.rpms.research.project.model.Project;
import com.lion.rpms.research.projectaudit.manager.ProjectAuditManager;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目立项审核Action类
 * @Author : 杨尚山
 * @Date ：2016-04-28
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectAuditAction extends BusinessAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ProjectAuditAction(Project businessObject, ProjectAuditManager manager) {
        super(businessObject, manager);
    }
	
	/**
	 * 是否管理专业人员
	 * @return
	 * @throws IOException
	 */
	public String isGuanliRole() throws IOException{
		try {
			ProjectAuditManager projectAuditManager = (ProjectAuditManager) this.manager;
			this.print(projectAuditManager.isGuanliRole(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}

}
