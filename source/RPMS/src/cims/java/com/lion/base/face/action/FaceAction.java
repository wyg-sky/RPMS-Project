package com.lion.base.face.action;

import java.io.IOException;

import com.lion.base.face.manager.FaceManager;
import com.lion.base.face.model.Face;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 工作面信息Action
 * @date : 2013-9-16下午05:13:39
 * @author : 辛尔青
 */
@SuppressWarnings("unchecked")
public class FaceAction extends BusinessAction {
	
	private static final long serialVersionUID = 1L;
	
	public FaceAction(Face businessObject, FaceManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * @description : 从Excel导入数据库
	 * @date : 2013-10-18上午11:26:02
	 * @author : 辛尔青
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importFace() throws IOException {
		try {
			//调用导入方法
			FaceManager faceManager = (FaceManager)this.manager;
			String mssage = faceManager.importFace(getRequest());
			this.print(mssage);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:\"服务器出错！\"}");
			return NONE;
		}
		return NONE;
	}
	
}
