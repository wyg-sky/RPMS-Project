package com.lion.rpms.innovate.postdoctoryearreport.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.innovate.postdoctoryearreport.manager.PostdoctorYearReportManager;
import com.lion.rpms.innovate.postdoctoryearreport.model.PostdoctorYearReport;

/**
 * @description ：年报评估管理业务实现类
 * @date ：2015-05-11 17:22:42
 * @author ：周强
 */
public class PostdoctorYearReportManagerImpl extends BusinessManagerImpl<PostdoctorYearReport,String> implements PostdoctorYearReportManager {
	public PostdoctorYearReportManagerImpl(GenericDao<PostdoctorYearReport, String> dao) {
		super(dao);
//		this.setDataPower("500");
	}
}
