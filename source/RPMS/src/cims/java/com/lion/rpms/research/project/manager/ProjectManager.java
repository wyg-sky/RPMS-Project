package com.lion.rpms.research.project.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 项目立项管理业务类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 13:59:17
 */

public interface ProjectManager extends BusinessManager<Project,String> {
     
	/**
	 * @description : 得到一个指定 projectId的 Project类实体信息(项目推广管理加载指定projectId项目时使用)
	 * @date : 2015-03-12 下午07:36:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String getProjectInfo(HttpServletRequest request) throws Exception;
	
	/**
	 * @description : 生成项目编号
	 * @date : 2015年3月26日上午11:28:32
	 * @author : cpc
	 * @return : String
	 */
	public String createProjectCode(HttpServletRequest request) throws Exception;
	
	/**
	 * @description : 项目退回
	 * @date : 2015年4月27日下午6:41:47
	 * @author : cpc
	 * @return : String
	*/
	public String updateProjectBackMsg(HttpServletRequest request) throws Exception;
	
}
