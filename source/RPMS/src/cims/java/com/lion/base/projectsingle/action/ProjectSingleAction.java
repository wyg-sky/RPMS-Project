package com.lion.base.projectsingle.action;

import java.io.IOException;

import com.lion.base.projectsingle.manager.ProjectSingleManager;
import com.lion.base.projectsingle.model.ProjectSingle;
import com.lion.system.common.action.BusinessAction;

/**
 * 
 * @description : 单项工程管理action
 * @date : 2013-9-25下午03:00:21
 * @author : yangss
 */
public class ProjectSingleAction extends BusinessAction<ProjectSingle, String>{

	private static final long serialVersionUID = 1L;

	/**
	 * 构造方法
	 * @param businessObject
	 * @param manager
	 */
	public ProjectSingleAction(ProjectSingle businessObject, ProjectSingleManager manager){
		super(businessObject, manager);
	}
	
	/**
	 * @description : 从Excel导入数据库
	 * @date : 2013-11-07上午10:33:19
	 * @author : 辛尔青
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importProjectSingle() throws IOException {
		try {
			//调用导入方法
			ProjectSingleManager projectSingleManager = (ProjectSingleManager)this.manager;
			String mssage = projectSingleManager.importProjectSingle(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}
}
