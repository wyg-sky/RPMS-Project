package com.lion.rpms.research.researchachievement.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.research.researchachievement.model.ResearchAchievement;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：成果管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public interface ResearchAchievementManager extends BusinessManager<ResearchAchievement,String> {
	
	/**
	 * @description : 得到一个指定 projectId的 ResearchAchievement类实体信息(成果推广管理加载指定projectId成果信息时使用)
	 * @date : 2015-05-13  13:20:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String getResearchAchievementInfo(HttpServletRequest request) throws Exception;
	
}
