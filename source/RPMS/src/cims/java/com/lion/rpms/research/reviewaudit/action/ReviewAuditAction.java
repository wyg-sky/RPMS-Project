package com.lion.rpms.research.reviewaudit.action;

import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.rpms.research.reviewaudit.manager.ReviewAuditManager;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目评议审核Action类
 * @Author : 曹鹏程
 * @Date ：2015-05-18 
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ReviewAuditAction extends BusinessAction {

private static final long serialVersionUID = 1L;
	public ReviewAuditAction(ProjectAcceptance businessObject, ReviewAuditManager manager) {
        super(businessObject, manager);
    }
	
	public String listOrgTree()  throws Exception {
		    try
		    {
		      print(((ReviewAuditManager)this.manager).listOrgTree(getRequest()));
		    } catch (Exception e) {
		      e.printStackTrace();
		    }
		    return "none";
	}
}
