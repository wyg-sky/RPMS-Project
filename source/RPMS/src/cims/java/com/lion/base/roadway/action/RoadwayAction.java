package com.lion.base.roadway.action;

import java.io.IOException;

import com.lion.base.roadway.manager.RoadwayManager;
import com.lion.base.roadway.model.Roadway;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 巷道基础信息Action
 * @date : 2013-9-17下午03:11:32
 * @author : 辛尔青
 */
@SuppressWarnings("unchecked")
public class RoadwayAction extends BusinessAction{

	private static final long serialVersionUID = 4318831543987832640L;

	public RoadwayAction(Roadway businessObject, RoadwayManager manager) {
		 super(businessObject, manager);
	}
	
	/**
	 * @description : 从Excel导入数据库
	 * @date : 2013-10-21上午09:03:02
	 * @author : 辛尔青
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importRoadway() throws IOException {
		try {
			//调用导入方法
			RoadwayManager roadwayManager = (RoadwayManager)this.manager;
			String mssage = roadwayManager.importRoadway(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}

}
