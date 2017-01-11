package com.lion.rpms.patent.patentapplication.manager;

import com.lion.system.common.manager.BusinessManager;
import com.lion.rpms.patent.patentapplication.model.PatentApplication;

/**
 * @description ：专利申请管理业务类
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */
public interface PatentApplicationManager extends BusinessManager<PatentApplication,String> {
	
	public void accept(Object obj);
	
	public void accredit(Object obj) throws Exception;
}
