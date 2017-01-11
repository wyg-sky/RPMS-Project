package com.lion.base.storage.action;

import java.io.IOException;

import com.lion.base.storage.manager.StorageManager;
import com.lion.base.storage.model.Storage;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 设备仓库基本信息
 * @date : 2013-9-22
 * @author : 姜华敏
 */
@SuppressWarnings("unchecked")
public class StorageAction extends BusinessAction {

	private static final long serialVersionUID = 1L;

	public StorageAction(Storage businessObject, StorageManager manager) {
		super(businessObject, manager);
	}
	public String listStorageAll() throws IOException{
		try {
	    	print(((StorageManager)this.manager).listStorageAll(getRequest()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	    return "none";
	}
	
	/**
	 * @description : 从Excel导入数据库
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importStorageMothod() throws IOException {
		try {
			//调用导入方法
			StorageManager storageManager = (StorageManager)this.manager;
			String mssage = storageManager.importStorageManager(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}
}