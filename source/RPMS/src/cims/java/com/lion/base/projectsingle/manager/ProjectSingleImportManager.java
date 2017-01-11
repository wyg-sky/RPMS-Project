package com.lion.base.projectsingle.manager;

import com.lion.base.projectsingle.model.ProjectSingle;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 单项工程导入方法
 * @date : 2013-11-07上午10:33:19
 * @author : 辛尔青
 */
public interface ProjectSingleImportManager extends BusinessManager<ProjectSingle, String> {
	
	public String importProjectSingle(String importType, Organization organization, UserView user);

}
