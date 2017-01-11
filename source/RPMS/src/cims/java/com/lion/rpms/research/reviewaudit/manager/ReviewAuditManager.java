package com.lion.rpms.research.reviewaudit.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 项目鉴定审核业务
 * @Author : 曹鹏程
 * @Date ：2015-05-18 
 */
public interface ReviewAuditManager extends BusinessManager<ProjectAcceptance,String>{
	 public abstract String listOrgTree(HttpServletRequest paramHttpServletRequest)  throws Exception;

}
