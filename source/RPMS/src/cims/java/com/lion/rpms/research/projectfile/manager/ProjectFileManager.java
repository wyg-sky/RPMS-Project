package com.lion.rpms.research.projectfile.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.projectfile.model.ProjectFile;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：通知管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public interface ProjectFileManager extends BusinessManager<ProjectFile,String> {
	public void sendNoticeForPFile(HttpServletRequest request)throws Exception;
}
