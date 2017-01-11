package com.lion.base.location.action;

import java.io.IOException;

import com.lion.base.location.manager.LocationManager;
import com.lion.base.location.model.Location;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 设备位置action
 * @date : 2013-8-29下午2:35:17
 * @author : 曹鹏程
 */
@SuppressWarnings("unchecked")
public class LocationAction extends BusinessAction{
	private static final long serialVersionUID = 8002731928866870072L;

	public LocationAction(Location businessObject, LocationManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * @description : 用于左侧树（下拉树）的展现
	 * @date : 2013-8-30上午11:45:30
	 * @author : 曹鹏程
	 * @params : {
			
		}
	 * @return : String
	*/
	public String listTree() throws Exception {
	    try {
	    	print(((LocationManager)this.manager).listTree(getRequest()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	    return "none";
    }
	
	/**
	 * 从Excel导入数据库
	 * 
	 * @return
	 * @throws IOException
	 */
	public String importLocationMothod() throws IOException {
		try {
			//调用导入方法
			LocationManager manager = (LocationManager)this.manager;
			String mssage = manager.importLocation(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}
	
}