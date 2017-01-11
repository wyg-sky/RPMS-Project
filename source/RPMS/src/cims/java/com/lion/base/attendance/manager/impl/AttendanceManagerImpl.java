package com.lion.base.attendance.manager.impl;

import com.lion.base.attendance.manager.AttendanceManager;
import com.lion.base.attendance.model.Attendance;
import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 班次信息业务处理实现
 * @date : 2013-9-25上午10:02:27
 * @author : 辛尔青
 */
public class AttendanceManagerImpl extends BusinessManagerImpl<Attendance, String> implements AttendanceManager{

	public AttendanceManagerImpl(GenericDao<Attendance, String> dao) {
		super(dao);
	}
	
}
