package com.lion.rpms.base.specialtydictionary.action;

import com.lion.rpms.base.specialtydictionary.manager.SpecialtyDictionaryManager;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：专业词典action
 * @date ： 2015-03-10 09:05:39
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class SpecialtyDictionaryAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public SpecialtyDictionaryAction(SpecialtyDictionary businessObject, SpecialtyDictionaryManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * @description : 控件专业、业务下拉树
	 * @date : 2015年3月16日下午2:25:20
	 * @author : cpc
	 * @return : String
	*/
	public String listSpecialtyDictionaryTree() {
	    try {
	    	print(((SpecialtyDictionaryManager)this.manager).listSpecialtyDictionaryTree(getRequest()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	    return NONE;
	    
	}
}
