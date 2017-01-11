package com.lion.rpms.research.projectaudit.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 项目立项审核业务
 * @Author : 杨尚山
 * @Date ：2016-04-28
 */
public interface ProjectAuditManager extends BusinessManager<Project,String>{
	
	public String isGuanliRole(HttpServletRequest request) throws Exception;

}
