package com.lion.rpms.research.scienceactivity.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.scienceactivity.model.ScienceActivity;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：科技活动费用
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public interface ScienceActivityManager extends BusinessManager<ScienceActivity,String> {
	public String changeReportStatus(HttpServletRequest request);
}
