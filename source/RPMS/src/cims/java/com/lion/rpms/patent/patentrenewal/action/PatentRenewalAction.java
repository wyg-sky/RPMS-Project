package com.lion.rpms.patent.patentrenewal.action;

import com.lion.rpms.patent.patentrenewal.manager.PatentRenewalManager;
import com.lion.rpms.patent.patentrenewal.model.PatentRenewal;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：专利续费申请管理action
 * @date ： 2015-06-03 09:50:24
 * @author ：WangYG
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class PatentRenewalAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public PatentRenewalAction(PatentRenewal businessObject, PatentRenewalManager manager) {
		super(businessObject, manager);
	}
}
