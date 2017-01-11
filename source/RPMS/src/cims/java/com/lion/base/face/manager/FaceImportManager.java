package com.lion.base.face.manager;

import com.lion.base.face.model.Face;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 工作面信息导入方法
 * @date : 2013-9-16下午05:15:29
 * @author : 辛尔青
 */
public interface FaceImportManager extends BusinessManager<Face, String> {
	
	public String importFace(String importType, Organization organization, UserView user);
}
