package com.lion.rpms.research.identifyaudit.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.identifyaudit.manager.IdentifyAuditManager;
import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

public class IdentifyAuditManagerImpl  extends BusinessManagerImpl<ProjectAcceptance,String> implements IdentifyAuditManager {

	public IdentifyAuditManagerImpl(GenericDao<ProjectAcceptance, String> dao) {
		super(dao);
		this.setDataPower("200");
		this.setOrganizationField("reviewUnit");
	}

}
