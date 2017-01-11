package com.lion.rpms.research.awardaudit.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.awardaudit.manager.AwardAuditManager;
import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 内部报奖审核业务实现
 * @date : 2015年5月20日上午8:36:02
 * @author : cpc
 */
public class AwardAuditManagerImpl  extends BusinessManagerImpl<ProjectAward,String> implements AwardAuditManager {

	public AwardAuditManagerImpl(GenericDao<ProjectAward, String> dao) {
		super(dao);
		this.setDataPower("200");
		this.setOrganizationField("chargeDepartnent");
	}
	
}
