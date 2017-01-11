package com.lion.rpms.research.researchpatent.manager;

import com.lion.rpms.research.researchpatent.model.ResearchPatent;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：专利管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public interface ResearchPatentManager extends BusinessManager<ResearchPatent,String> {
	
	public void updateProtectStatus();
	
	public void updateProtectAlert();
}
