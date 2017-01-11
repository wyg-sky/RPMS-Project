package com.lion.base.projectsingle.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.projectsingle.manager.ProjectSingleImportManager;
import com.lion.base.projectsingle.manager.ProjectSingleManager;
import com.lion.base.projectsingle.model.ProjectSingle;
import com.lion.core.dao.GenericDao;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * 
 * @description : 单项工程管理  管理类接口实现
 * @date : 2013-9-25下午03:01:54
 * @author : yangss
 */
public class ProjectSingleManagerImpl extends BusinessManagerImpl<ProjectSingle, String> implements ProjectSingleManager{
	
	private ProjectSingleImportManager projectSingleImportManager;

	public ProjectSingleManagerImpl(GenericDao<ProjectSingle, String> dao) {
		super(dao);
	}
	
	/**
	 * @description : 导入方法
	 * @date : 2013-11-07上午10:33:19
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request
		}
	 * @return : String
	 */
	@Override
	public String importProjectSingle(HttpServletRequest request) {
		String importType = request.getParameter("importType");		
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)request.getSession().getAttribute(Constants.USER_VIEW);
		String str = this.projectSingleImportManager.importProjectSingle(importType, organization, user);
		return str;
	}
	
	public ProjectSingleImportManager getProjectSingleImportManager() {
		return projectSingleImportManager;
	}

	public void setProjectSingleImportManager(ProjectSingleImportManager projectSingleImportManager) {
		this.projectSingleImportManager = projectSingleImportManager;
	}
}
