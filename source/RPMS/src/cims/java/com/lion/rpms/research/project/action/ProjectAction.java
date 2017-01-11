package com.lion.rpms.research.project.action;

import com.lion.rpms.research.project.manager.ProjectManager;
import com.lion.rpms.research.project.model.Project;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目立项管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 13:59:17
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectAction(Project businessObject, ProjectManager manager) {
        super(businessObject, manager);
    }
	
	/**
	 * @description : 得到一个指定 projectId的 Project类实体信息(项目推广管理加载指定项目时使用)
	 * @date : 2015-03-12 下午07:36:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String getProjectInfo() throws Exception {
		ProjectManager manager = (ProjectManager)this.manager;
		try{
			this.print(manager.getProjectInfo(getRequest()));
		}catch(Exception e){
			e.printStackTrace();
		}
		return NONE;
	}
	
	/**
	 * @description : 生成项目编号
	 * @date : 2015年3月26日上午11:28:32
	 * @author : cpc
	 * @return : String
	*/
	public String createProjectCode() throws Exception {
		ProjectManager manager = (ProjectManager)this.manager;
		try{
			this.print(manager.createProjectCode(getRequest()));
		}catch(Exception e){
			e.printStackTrace();
		}
		return NONE;
	}
	
	
	/**
	 * @description : 项目退回
	 * @date : 2015年4月27日下午6:41:47
	 * @author : cpc
	 * @return : String
	*/
	public String updateProjectBackMsg() throws Exception {
		ProjectManager manager = (ProjectManager)this.manager;
		try{
			this.print(manager.updateProjectBackMsg(getRequest()));
		}catch(Exception e){
			e.printStackTrace();
		}
		return NONE;
	}
}
