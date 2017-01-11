package com.lion.rpms.base.standardenact.action;


import com.lion.rpms.base.standardenact.manager.StandardEnactManager;
import com.lion.rpms.base.standardenact.model.StandardEnact;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：标准制定管理action
 * @date ： 2015-03-13 11:06:28
 * @author ：WangYG
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class StandardEnactAction extends BusinessAction {
	private static final long serialVersionUID = 1L;

	public StandardEnactAction(StandardEnact businessObject, StandardEnactManager manager) {
		super(businessObject, manager);
	}

	/**
	 * @description ：将用户选中的标准制定记录置为颁布，并添加到标准库[标准管理].
	 * @date ： 2015-03-13 13:30:28
	 * @author ：WangYG
	 */
	public String insertStandar() {
		try {
			StandardEnactManager standardEnactManager = (StandardEnactManager) this.manager;
			this.print(standardEnactManager.insertStandar(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return NONE;
	}
}
