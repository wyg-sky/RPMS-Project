package com.lion.base.roadway.action;

import com.lion.base.roadway.manager.RoadwayHistoryManager;
import com.lion.base.roadway.model.RoadwayHistory;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 巷道基础历史信息Action
 * @date : 2013-9-17下午03:11:32
 * @author : 辛尔青
 */
@SuppressWarnings("unchecked")
public class RoadwayHistoryAction extends BusinessAction{

	private static final long serialVersionUID = 4318831543987832640L;

	public RoadwayHistoryAction(RoadwayHistory businessObject, RoadwayHistoryManager manager) {
		super(businessObject, manager);
	}

}
