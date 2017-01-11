package com.lion.rpms.base.platorganization.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.base.platorganization.model.Platorganization;
import com.lion.system.common.manager.BusinessManager;

public interface PlatorganizationManager extends BusinessManager<Platorganization, String>{


	String listTree(HttpServletRequest arg0) throws Exception;

	String listForCombolist(HttpServletRequest arg0) throws Exception;

}
