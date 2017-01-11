package com.lion.rpms.research.projectacceptance.action;

import com.lion.rpms.research.projectacceptance.manager.AcceptanceExpertManager;
import com.lion.rpms.research.projectacceptance.model.AcceptanceExpert;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 验收专家组明细管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-19 15:44:43
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class AcceptanceExpertAction extends BusinessAction {
     
    private static final long serialVersionUID = 1L;
	
	public AcceptanceExpertAction(AcceptanceExpert businessObject, AcceptanceExpertManager manager) {
        super(businessObject, manager);
    }
	
}
