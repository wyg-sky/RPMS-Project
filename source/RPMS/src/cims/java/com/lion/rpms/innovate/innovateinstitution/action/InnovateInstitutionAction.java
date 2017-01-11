package com.lion.rpms.innovate.innovateinstitution.action;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.innovate.innovateinstitution.manager.InnovateInstitutionManager;
import com.lion.rpms.innovate.innovateinstitution.model.InnovateInstitution;

/**
 * @description ：创新制度管理action
 * @date ：2015-03-19 12:33:07
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateInstitutionAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public InnovateInstitutionAction(InnovateInstitution businessObject, InnovateInstitutionManager manager) {
		super(businessObject, manager);
	}
}
