package com.lion.rpms.research.projectfile.action;

import com.lion.rpms.research.projectfile.manager.ProjectFileLineManager;
import com.lion.rpms.research.projectfile.model.ProjectFileLine;
import com.lion.system.common.action.BusinessAction;
import com.opensymphony.oscache.util.StringUtil;
/**
 * @description ：通知管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ProjectFileLineAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ProjectFileLineAction(ProjectFileLine businessObject, ProjectFileLineManager manager) {
		super(businessObject, manager);
	}
	
	public String saveProjectFileLine() throws Exception {
		ProjectFileLineManager projectFileLineManager = (ProjectFileLineManager)this.manager;
		String msg = projectFileLineManager.saveProjectFileLine(this.getRequest());
		if(!StringUtil.isEmpty(msg)){
			this.print("{success:false,msg:\""+msg+"\"}");
		}else{
			this.print("{success:true}");
		}
		return NONE;
	}
	
	public String selectProjectFileLine(){
		ProjectFileLineManager projectFileLineManager = (ProjectFileLineManager)this.manager;
	    try {
	    	this.print(projectFileLineManager.selectProjectFileLine(this.getRequest()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	    return "none";
	}
}
