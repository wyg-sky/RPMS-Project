package com.lion.rpms.innovate.innovatetask.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.innovate.innovatetask.manager.InnovateTaskManager;
import com.lion.rpms.innovate.innovatetask.model.InnovateTask;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：工作任务管理业务实现类
 * @date ： 2015-03-11 14:48:31
 * @author ：周强
 */
public class InnovateTaskManagerImpl extends BusinessManagerImpl<InnovateTask,String> implements InnovateTaskManager {
	public InnovateTaskManagerImpl(GenericDao<InnovateTask, String> dao) {
		super(dao);
		//this.setDataPower("100");
	}
	
}
