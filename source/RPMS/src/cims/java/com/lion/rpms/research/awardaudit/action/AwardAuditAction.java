package com.lion.rpms.research.awardaudit.action;

import com.lion.rpms.research.awardaudit.manager.AwardAuditManager;
import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 内部报奖审核
 * @date : 2015年5月20日上午8:33:49
 * @author : cpc
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public class AwardAuditAction  extends BusinessAction  {
	private static final long serialVersionUID = 1L;
	public AwardAuditAction(ProjectAward businessObject, AwardAuditManager manager) {
        super(businessObject, manager);
    }
}
