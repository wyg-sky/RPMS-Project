package com.lion.rpms.base.platorganization.action;

import org.apache.log4j.Logger;

import com.lion.rpms.base.platorganization.manager.PlatorganizationManager;
import com.lion.rpms.base.platorganization.model.Platorganization;
import com.lion.system.common.action.BusinessAction;

@SuppressWarnings("rawtypes")
public class PlatorganizationAction extends BusinessAction {

	private static final long serialVersionUID = -1378862460163909317L;
	protected static final Logger logger = Logger.getLogger(PlatorganizationAction.class);

	@SuppressWarnings("unchecked")
	public PlatorganizationAction(Platorganization businessObject, PlatorganizationManager manager) {
		super(businessObject, manager);
	}

	public String listTree() throws Exception {
		try {
			this.print(((PlatorganizationManager) this.manager).listTree(this.getRequest()));
		} catch (Exception arg1) {
			arg1.printStackTrace();
		}

		return "none";
	}

	public String listForCombolist() throws Exception {
		try {
			this.print(((PlatorganizationManager) this.manager).listForCombolist(this.getRequest()));
		} catch (Exception arg1) {
			arg1.printStackTrace();
		}

		return "none";
	}

}
