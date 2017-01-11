package com.lion.base.location.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.location.model.Location;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 设备位置管理业务接口
 * @date : 2013-8-29下午3:13:56
 * @author : 曹鹏程
 */
public abstract interface LocationManager extends BusinessManager<Location, String>{
	
	/**
	 * @description : 用于左侧树（下拉树）的展现
	 * @date : 2013-8-30上午11:45:30
	 * @author : 曹鹏程
	 * @params : {
			
		}
	 * @return : String
	*/
	public abstract String listTree(HttpServletRequest paramHttpServletRequest) throws Exception;

	public  String importLocation(HttpServletRequest request);
}