package com.lion.rpms.research.researchachievement.action;

import com.lion.rpms.research.researchachievement.manager.ResearchAchievementManager;
import com.lion.rpms.research.researchachievement.model.ResearchAchievement;
import com.lion.system.common.action.BusinessAction;
/**
 * @description ：成果管理Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

@SuppressWarnings({ "unchecked"})
public class ResearchAchievementAction extends BusinessAction {
    private static final long serialVersionUID = 1L;
	public ResearchAchievementAction(ResearchAchievement businessObject, ResearchAchievementManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * @description : 得到一个指定 projectId的 ResearchAchievement类实体信息(成果推广管理加载指定projectId成果信息时使用)
	 * @date : 2015-05-13  13:20:49
	 * @author : WangYG
	 * @return : String
	 */
	public String getResearchAchievementInfo() throws Exception {
		ResearchAchievementManager manager = (ResearchAchievementManager)this.manager;
		try{
			this.print(manager.getResearchAchievementInfo(getRequest()));
		}catch(Exception e){
			e.printStackTrace();
		}
		return NONE;
	}
}
