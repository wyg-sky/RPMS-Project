package com.lion.rpms.base.standardenact.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.base.standardenact.model.StandardEnact;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：标准制定管理业务类
 * @date ： 2015-03-13 11:06:28
 * @author ：WangYG
 */
public interface StandardEnactManager extends BusinessManager<StandardEnact, String> {

	/**
	 * @description ：将用户选中的标准制定记录置为颁布，并添加到标准库[标准管理].
	 * @date ： 2015-03-13 13:30:28
	 * @author ：WangYG
	 */
	public String insertStandar(HttpServletRequest request) throws Exception;
}
