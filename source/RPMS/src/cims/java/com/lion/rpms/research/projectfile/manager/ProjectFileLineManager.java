package com.lion.rpms.research.projectfile.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.projectfile.model.ProjectFileLine;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：通知接收
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public interface ProjectFileLineManager extends BusinessManager<ProjectFileLine,String> {
	public String saveProjectFileLine(HttpServletRequest request)throws Exception;
	public String selectProjectFileLine(HttpServletRequest request)throws Exception;
}
