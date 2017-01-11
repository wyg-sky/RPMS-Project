package com.lion.base.face.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.face.model.Face;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 工作面信息业务处理接口
 * @date : 2013-9-16下午05:15:29
 * @author : 辛尔青
 */
public interface FaceManager extends BusinessManager<Face, String> {
	
	public String importFace(HttpServletRequest request);
	
}
