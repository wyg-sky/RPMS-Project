package com.lion.rpms.research.identifyaudit.action;

import com.lion.rpms.research.identifyaudit.manager.IdentifyAuditManager;
import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.system.common.action.BusinessAction;
/**
 * @description : 项目鉴定审核Action类
 * @Author : 曹鹏程
 * @Date ：2015-05-18 
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public class IdentifyAuditAction extends BusinessAction{
	
	private static final long serialVersionUID = 1L;

	public IdentifyAuditAction(ProjectAcceptance businessObject, IdentifyAuditManager manager) {
        super(businessObject, manager);
    }
}
