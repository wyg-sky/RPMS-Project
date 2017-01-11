package com.lion.rpms.research.porjectaward.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：项目报奖管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public interface ProjectAwardManager extends BusinessManager<ProjectAward,String> {
	public void insertAwards(HttpServletRequest request);
	public String listProjectAward(HttpServletRequest request)throws Exception ;
}
