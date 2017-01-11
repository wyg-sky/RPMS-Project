package com.lion.rpms.research.projectdispatch.action;

import java.io.IOException;

import com.lion.rpms.research.projectdispatch.manager.ProjectDispatchManager;
import com.lion.rpms.research.projectdispatch.model.ProjectDispatch;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目调度管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-10 14:59:24
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ProjectDispatchAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public ProjectDispatchAction(ProjectDispatch businessObject, ProjectDispatchManager manager) {
        super(businessObject, manager);
    }
	
	/**
     * 更改 项目立项管理模块 中对应记录的 项目进展阶段 状态
     * */
	public String changeProjectStage() throws IOException {
		try {
			ProjectDispatchManager projectDispatchManager = (ProjectDispatchManager) this.manager;
			this.print(projectDispatchManager.changeProjectStage(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}
	
	/**
     * 获取最新调度项目
     * 获取项目立项管理模块,项目进展阶段 不是状态为"项目完成" 的记录
     * */
	public String genNewProjectDispatch() throws IOException {
		try {
			ProjectDispatchManager projectDispatchManager = (ProjectDispatchManager) this.manager;
			this.print(projectDispatchManager.genNewProjectDispatch(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}
	
}
