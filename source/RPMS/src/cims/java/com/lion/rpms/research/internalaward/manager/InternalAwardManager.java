package com.lion.rpms.research.internalaward.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 项目内部报奖业务类
 * @date : 2015年5月19日上午10:32:04
 * @author : cpc
 */
public interface InternalAwardManager   extends BusinessManager<ProjectAward,String>{
	
	public String backReasonAwards(HttpServletRequest request) throws Exception;

}
