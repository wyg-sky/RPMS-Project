package com.lion.base.face.action;

import com.lion.base.face.manager.FaceHistoryManager;
import com.lion.base.face.model.FaceHistory;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 工作面历史信息Action
 * @date : 2013-9-16下午05:13:39
 * @author : 辛尔青
 */
@SuppressWarnings("unchecked")
public class FaceHistoryAction extends BusinessAction {
	
	private static final long serialVersionUID = 1L;
	
	public FaceHistoryAction(FaceHistory businessObject, FaceHistoryManager manager) {
		super(businessObject, manager);
	}
	
}
