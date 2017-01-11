package com.lion.rpms.innovate.innovatetask.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.innovatetask.manager.InnovateTaskManager;
import com.lion.rpms.innovate.innovatetask.model.InnovateTask;

/**
 * @description ：工作任务管理action
 * @date ： 2015-03-11 14:48:31
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateTaskAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public InnovateTaskAction(InnovateTask businessObject, InnovateTaskManager manager) {
		super(businessObject, manager);
	}
}
