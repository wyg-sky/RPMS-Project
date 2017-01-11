package com.lion.rpms.patent.patentapplication.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.patent.patentapplication.manager.PatentApplicationLineManager;
import com.lion.rpms.patent.patentapplication.model.PatentApplicationLine;

/**
 * @description ：专利申请管理明细action
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */

@SuppressWarnings({"unchecked","rawtypes"})
public class PatentApplicationLineAction extends BusinessAction{
	private static final long serialVersionUID = 1L;
	public PatentApplicationLineAction(PatentApplicationLine businessObject, PatentApplicationLineManager manager) {
		super(businessObject, manager);
	}
}
