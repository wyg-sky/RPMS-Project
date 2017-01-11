package com.lion.base.projectsingle.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.projectsingle.model.ProjectSingle;
import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 单项工程管理  管理类接口
 * @date : 2013-9-25下午03:01:37
 * @author : yangss
 */
public interface ProjectSingleManager extends BusinessManager<ProjectSingle, String>{
	
	public String importProjectSingle(HttpServletRequest request);

}
