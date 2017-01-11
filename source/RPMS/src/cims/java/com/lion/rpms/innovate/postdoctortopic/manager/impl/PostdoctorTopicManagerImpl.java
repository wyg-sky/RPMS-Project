package com.lion.rpms.innovate.postdoctortopic.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.innovate.postdoctortopic.manager.PostdoctorTopicManager;
import com.lion.rpms.innovate.postdoctortopic.model.PostdoctorTopic;

/**
 * @description ：博士后课题管理业务实现类
 * @date ： 2015-03-16 09:09:33
 * @author ：周强
 */
public class PostdoctorTopicManagerImpl extends BusinessManagerImpl<PostdoctorTopic,String> implements PostdoctorTopicManager {
	public PostdoctorTopicManagerImpl(GenericDao<PostdoctorTopic, String> dao) {
		super(dao);
		//this.setDataPower("100");
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		// TODO Auto-generated method stub
		return PlatCenterUtil.addPlatCtrl(super.genListConditionHql(request), this);
	}
}
