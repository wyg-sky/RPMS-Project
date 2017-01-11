package com.lion.rpms.innovate.innovateinstitution.manager;

import com.lion.system.common.manager.BusinessManager;
import com.lion.rpms.innovate.innovateinstitution.model.InnovateInstitution;

/**
 * @description ：创新制度管理业务类
 * @date ： 2015-03-19 12:33:07
 * @author ：周强
 */
public interface InnovateInstitutionManager extends BusinessManager<InnovateInstitution,String> {
	
	public  void checkOutDate();

}
