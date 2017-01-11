package com.lion.rpms.innovate.innovateyearcheck.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.innovateyearcheck.manager.InnovateYearCheckManager;
import com.lion.rpms.innovate.innovateyearcheck.model.InnovateYearCheck;

/**
 * @description ：年度考核标准管理action
 * @date ： 2015-03-16 08:49:30
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateYearCheckAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public InnovateYearCheckAction(InnovateYearCheck businessObject, InnovateYearCheckManager manager) {
		super(businessObject, manager);
	}
}
