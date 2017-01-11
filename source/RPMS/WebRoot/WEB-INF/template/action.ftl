package com.lion.${generateInfo.systemName}.${generateInfo.packageName}.action;

import org.apache.log4j.Logger;

import com.lion.${generateInfo.systemName}.${generateInfo.packageName}.manager.${generateInfo.className}Manager;
import com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${generateInfo.className};
import com.lion.system.common.action.BusinessAction;

/**
 * @description : ${generateInfo.classRemark}Action
 * @date : ${generateInfo.createDate}
 * @author : ${generateInfo.createUser}
 */
@SuppressWarnings("unchecked")
public class ${generateInfo.className}Action extends BusinessAction {
	private static final long serialVersionUID = 1L;
	
	protected static final Logger logger = Logger.getLogger(${generateInfo.className}Action.class);
	
	public ${generateInfo.className}Action(${generateInfo.className} businessObject, ${generateInfo.className}Manager manager) {
		super(businessObject, manager);
	}
	
}
