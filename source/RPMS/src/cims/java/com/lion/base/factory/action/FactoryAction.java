package com.lion.base.factory.action;

import java.io.IOException;

import com.lion.base.factory.manager.FactoryManager;
import com.lion.base.factory.model.Factory;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 设备供应商action
 * @date : 2013-8-29上午8:53:18
 * @author : 曹鹏程
 */
@SuppressWarnings("unchecked")
public class FactoryAction  extends BusinessAction {
	private static final long serialVersionUID = -1048575408085810858L;

	public FactoryAction(Factory businessObject, FactoryManager manager){
	    super(businessObject, manager);
	}
	
	/**
	 * 从Excel导入数据库
	 * 
	 * @return
	 * @throws IOException
	 */
	public String importFactoryMothod() throws IOException {
		try {
			//调用导入方法
			FactoryManager manager = (FactoryManager)this.manager;
			String mssage = manager.importFactory(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}
	
	
}
