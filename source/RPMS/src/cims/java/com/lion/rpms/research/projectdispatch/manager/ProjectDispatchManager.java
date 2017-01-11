package com.lion.rpms.research.projectdispatch.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.projectdispatch.model.ProjectDispatch;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 项目调度管理业务类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 14:59:24
 */

public interface ProjectDispatchManager extends BusinessManager<ProjectDispatch,String> {
	
	/**
     * 更改 项目立项管理模块 中对应记录的 项目进展阶段 状态
     * */
	public String changeProjectStage(HttpServletRequest request) throws Exception;
	
	/**
     * 获取最新调度项目
     * 获取项目立项管理模块,项目进展阶段 不是状态为"项目完成" 的记录
     * */
	public String genNewProjectDispatch(HttpServletRequest request)  throws Exception;
     
}
