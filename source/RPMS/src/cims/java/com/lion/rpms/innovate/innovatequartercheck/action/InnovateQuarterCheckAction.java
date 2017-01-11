package com.lion.rpms.innovate.innovatequartercheck.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.innovatequartercheck.manager.InnovateQuarterCheckManager;
import com.lion.rpms.innovate.innovatequartercheck.model.InnovateQuarterCheck;

/**
 * @description ：季度检查项目管理action
 * @date ： 2015-03-12 13:39:57
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateQuarterCheckAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public InnovateQuarterCheckAction(InnovateQuarterCheck businessObject, InnovateQuarterCheckManager manager) {
		super(businessObject, manager);
	}
}
