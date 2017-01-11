package com.lion.rpms.innovate.postdoctortopic.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.postdoctortopic.manager.PostdoctorTopicManager;
import com.lion.rpms.innovate.postdoctortopic.model.PostdoctorTopic;

/**
 * @description ：博士后课题管理action
 * @date ： 2015-03-16 09:09:33
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class PostdoctorTopicAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public PostdoctorTopicAction(PostdoctorTopic businessObject, PostdoctorTopicManager manager) {
		super(businessObject, manager);
	}
}
