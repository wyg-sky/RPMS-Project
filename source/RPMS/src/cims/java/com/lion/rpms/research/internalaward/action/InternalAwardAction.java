package com.lion.rpms.research.internalaward.action;

import java.io.IOException;

import com.lion.rpms.research.internalaward.manager.InternalAwardManager;
import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 项目内部报奖Action类
 * @date : 2015年5月19日上午10:30:33
 * @author : cpc
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public class InternalAwardAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public InternalAwardAction(ProjectAward businessObject, InternalAwardManager manager) {
        super(businessObject, manager);
    }
	
	/**
	 * 录入退回原因
	 * @return
	 * @throws IOException
	 */
	public String backReasonAwards() throws IOException{
		try {
			InternalAwardManager internalAwardManager = (InternalAwardManager) this.manager;
			this.print(internalAwardManager.backReasonAwards(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}
	
}
