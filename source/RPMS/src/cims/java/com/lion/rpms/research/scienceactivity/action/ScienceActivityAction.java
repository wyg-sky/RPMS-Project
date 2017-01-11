package com.lion.rpms.research.scienceactivity.action;

import java.io.IOException;

import com.lion.rpms.research.scienceactivity.manager.ScienceActivityManager;
import com.lion.rpms.research.scienceactivity.model.ScienceActivity;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：科技活动费用Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ScienceActivityAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ScienceActivityAction(ScienceActivity businessObject, ScienceActivityManager manager) {
		super(businessObject, manager);
	}
	public void changeReportStatus() throws IOException{
		print(((ScienceActivityManager)manager).changeReportStatus(getRequest()));
	}
}
