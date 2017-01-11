package com.lion.rpms.research.projectfile.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.projectfile.manager.ProjectFileManager;
import com.lion.rpms.research.projectfile.model.ProjectFile;
import com.lion.system.Constants;
import com.lion.system.code.manager.CodeLineManager;
import com.lion.system.code.model.CodeLine;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.notice.manager.NoticeManager;
import com.lion.system.user.model.UserView;

/**
 * @description ：通知管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ProjectFileManagerImpl extends BusinessManagerImpl<ProjectFile,String> implements ProjectFileManager {
	private NoticeManager noticeManager;
	private CodeLineManager codeLineManager;
	
	public ProjectFileManagerImpl(GenericDao<ProjectFile, String> dao) {
		super(dao);
		this.setDataPower("100");
	}
	
	public void sendNoticeForPFile(HttpServletRequest request) throws Exception{
		String ids = request.getParameter("ids");
		if(!"".equals(ids) && ids != null){
			String[] fId = ids.split(",");
			for(String id : fId){
				ProjectFile projectFile = this.get(id);
				// 发送消息
				UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
				String noticeTitle = getFileName(projectFile.getTileType())+"通知";
				String noticeContent = "    您有一封未读的调度通知： “"+projectFile.getFileName()+"”，请点击此处查看。";
				this.noticeManager.sendNotice("system_notice", noticeTitle,	noticeContent, userView, "");
			}
		}
	}
	
	public String getFileName(String itemVale) throws Exception{
		String hql = "from CodeLine line where line.itemValue='" + itemVale + "' and line.codeid = '2c9ffa9f4c029e65014c02a582ec0004'";
		CodeLine codeLine = (CodeLine) codeLineManager.find(hql, new Object[0]).get(0);
		return codeLine.getItemText();
	}
	
	public NoticeManager getNoticeManager() {
		return noticeManager;
	}
	public void setNoticeManager(NoticeManager noticeManager) {
		this.noticeManager = noticeManager;
	}

	public CodeLineManager getCodeLineManager() {
		return codeLineManager;
	}

	public void setCodeLineManager(CodeLineManager codeLineManager) {
		this.codeLineManager = codeLineManager;
	}
}
