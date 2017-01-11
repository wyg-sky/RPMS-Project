package com.lion.rpms.thesis.thesisapplication.manager;

import com.lion.system.common.manager.BusinessManager;
import com.lion.rpms.thesis.thesisapplication.model.ThesisApplication;

/**
 * @description ：论文评比管理业务类
 * @date ： 2015-03-16 09:20:38
 * @author ：周强
 */
public interface ThesisApplicationManager extends BusinessManager<ThesisApplication,String> {
	
	public String award(ThesisApplication obj);
}
