package com.lion.base.roadway.manager.impl;

import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;

import com.lion.base.roadway.manager.RoadwayHistoryManager;
import com.lion.base.roadway.manager.RoadwayImportManager;
import com.lion.base.roadway.manager.RoadwayManager;
import com.lion.base.roadway.model.Roadway;
import com.lion.base.roadway.model.RoadwayHistory;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.CnToSpell;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 巷道基础信息业务处理实现
 * @date : 2013-9-17下午03:11:32
 * @author : 辛尔青
 */
public class RoadwayManagerImpl extends BusinessManagerImpl<Roadway, String> implements RoadwayManager{
	private RoadwayHistoryManager roadwayHistoryManager;
	private RoadwayImportManager roadwayImportManager;
	
	public RoadwayManagerImpl(GenericDao<Roadway, String> dao) {
		super(dao);
		this.setDataPower("400");
	}
	
	/**
	 * @description : 根据巷道名称自动设置巷道简拼
	 * @date : 2013-9-27下午02:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			Roadway roadway
		}
	 * @return : String
	 */
	public boolean beforeSave(HttpServletRequest request, Roadway roadway) {
		CnToSpell.getFullSpell(roadway.getRoadwayName());
		roadway.setRoadwaySimp(CnToSpell.firstSpellStr);
		return true;
	}
	
	/**
	 * @description : 把巷道信息存到历史表中并设置有效期开始和结束
	 * @date : 2013-9-27下午02:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			Roadway roadway
		}
	 * @return : String
	 */
	public boolean afterSave(HttpServletRequest request, Roadway roadway) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		RoadwayHistory rh = new RoadwayHistory();
		try {
			BeanUtils.copyProperties(rh, roadway);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		rh.setId(null);
		rh.setEffectiveFrom(sdf.format(new Date()));
		rh.setEffectiveTo("");
		String sql = "update base_roadway_history rh set rh.effective_to = '" +
				sdf.format(new Date())  +
				"' where rh.roadway = (select max(roadway) from base_roadway_history)" +
				" and rh.create_time = (select max(create_time) from base_roadway_history)";
		executeSql(sql, new Object[0]);
		roadwayHistoryManager.save(request, rh);
		return true;
	}
	
	/**
	 * @description : 导入方法
	 * @date : 2013-10-18上午11:26:02
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request
		}
	 * @return : String
	 */
	@Override
	public String importRoadway(HttpServletRequest request) {
		String importType = request.getParameter("importType");		
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)request.getSession().getAttribute(Constants.USER_VIEW);
		String str = this.roadwayImportManager.importRoadway(importType, organization, user);
		return str;
	}
	
	public RoadwayHistoryManager getRoadwayHistoryManager() {
		return roadwayHistoryManager;
	}

	public void setRoadwayHistoryManager(RoadwayHistoryManager roadwayHistoryManager) {
		this.roadwayHistoryManager = roadwayHistoryManager;
	}
	
	public RoadwayImportManager getRoadwayImportManager() {
		return roadwayImportManager;
	}

	public void setRoadwayImportManager(RoadwayImportManager roadwayImportManager) {
		this.roadwayImportManager = roadwayImportManager;
	}
}
