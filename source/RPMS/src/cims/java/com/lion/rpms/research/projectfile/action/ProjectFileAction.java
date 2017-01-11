package com.lion.rpms.research.projectfile.action;

import com.lion.rpms.research.projectfile.manager.ProjectFileManager;
import com.lion.rpms.research.projectfile.model.ProjectFile;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：通知管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ProjectFileAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ProjectFileAction(ProjectFile businessObject, ProjectFileManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * 推送系统消息（全员接收）
	* @Title: sendNoticeForPFile
	* @param @throws Exception
	* @return void
	* @throws
	 */
	public void sendNoticeForPFile() throws Exception {
		try {
			ProjectFileManager projectFileManager = (ProjectFileManager)this.manager;
			projectFileManager.sendNoticeForPFile(this.getRequest());
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success : false}");
		}
	}
}
