package com.lion.base.classify.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.classify.model.Classify;
import com.lion.core.util.json.JSONException;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 分类定义业务处理接口
 * @date : 2013-9-23上午10:19:59
 * @author : 辛尔青
 */
public interface ClassifyManager extends BusinessManager<Classify, String> {

	String listTree(HttpServletRequest request) throws JSONException;
	
	String getUnitForId(HttpServletRequest request) throws JSONException;

	String listForCombolist(HttpServletRequest request) throws Exception ;
}
