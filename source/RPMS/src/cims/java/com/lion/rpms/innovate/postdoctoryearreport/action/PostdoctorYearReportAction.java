package com.lion.rpms.innovate.postdoctoryearreport.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.postdoctoryearreport.manager.PostdoctorYearReportManager;
import com.lion.rpms.innovate.postdoctoryearreport.model.PostdoctorYearReport;

/**
 * @description ：年报评估管理action
 * @date ：2015-05-11 17:22:42
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class PostdoctorYearReportAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public PostdoctorYearReportAction(PostdoctorYearReport businessObject, PostdoctorYearReportManager manager) {
		super(businessObject, manager);
	}
}
