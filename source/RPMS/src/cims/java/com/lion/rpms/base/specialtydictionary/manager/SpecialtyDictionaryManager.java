package com.lion.rpms.base.specialtydictionary.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.system.common.manager.BusinessManager;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;

/**
 * @description ：专业词典业务类
 * @date ： 2015-03-10 09:05:39
 * @author ：周强
 */
public interface SpecialtyDictionaryManager extends BusinessManager<SpecialtyDictionary,String> {

	/**
	 * @description : 控件专业、业务下拉树
	 * @date : 2015年3月16日下午2:27:18
	 * @author : cpc
	 * @return : String
	 */
	public String listSpecialtyDictionaryTree(HttpServletRequest request) throws Exception;
}
