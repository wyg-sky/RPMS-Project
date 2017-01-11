package com.lion.rpms.research.porjectaward.action;

import java.io.IOException;

import com.lion.rpms.research.porjectaward.manager.ProjectAwardManager;
import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：项目报奖管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ProjectAwardAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ProjectAwardAction(ProjectAward businessObject,ProjectAwardManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * 审批完成同时，将数据插入荣誉库
	* @Title: insertAwards
	* @param @return
	* @param @throws IOException
	* @return String
	* @throws
	 */
	public String insertAwards() throws IOException{
		try {
			ProjectAwardManager projectAwardManager = (ProjectAwardManager) this.manager;
			projectAwardManager.insertAwards(getRequest());
			
			this.print("{success:true}");
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}
	public String listProjectAward(){
		ProjectAwardManager projectAwardManager = (ProjectAwardManager) this.manager;
	    try {
	    	this.print(projectAwardManager.listProjectAward(this.getRequest()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	    return "none";
	}
}
