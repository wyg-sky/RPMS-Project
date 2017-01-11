package com.lion.rpms.innovate.innovatecompact.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.innovatecompact.manager.InnovateCompactManager;
import com.lion.rpms.innovate.innovatecompact.model.InnovateCompact;

/**
 * @description ：合同管理action
 * @date ： 2015-03-12 09:47:49
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateCompactAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public InnovateCompactAction(InnovateCompact businessObject, InnovateCompactManager manager) {
		super(businessObject, manager);
	}
}
