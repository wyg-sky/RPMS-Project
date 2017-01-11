package com.lion.base.storage.action;

import java.io.IOException;

import com.lion.base.storage.manager.StorageLineManager;
import com.lion.base.storage.model.StorageLine;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 仓库保管员
 * @date : 2013-9-22下午03:26:28
 * @author : 姜华敏
 */
@SuppressWarnings("unchecked")
public class StorageLineAction extends BusinessAction {

	private static final long serialVersionUID = 1L;

	public StorageLineAction(StorageLine businessObject, StorageLineManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * @description : 从Excel导入数据库
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importStorageLineMothod() throws IOException {
		try {
			//调用导入方法
			StorageLineManager storageLineManager = (StorageLineManager)this.manager;
			String mssage = storageLineManager.importStorageLineManager(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}

}