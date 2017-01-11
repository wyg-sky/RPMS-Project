package com.lion.rpms.patent.patentapplication.action;

import java.io.IOException;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.patent.patentapplication.manager.PatentApplicationManager;
import com.lion.rpms.patent.patentapplication.model.PatentApplication;

/**
 * @description ：专利申请管理action
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class PatentApplicationAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public PatentApplicationAction(PatentApplication businessObject, PatentApplicationManager manager) {
		super(businessObject, manager);
	}
	
	/**
	 * 
	 * @description : 专利申请受理
	 * @date : 2015年3月11日下午4:51:27
	 * @author : 周强
	 * @params : {
			
		}
	 * @return : void
	 */
	public void accept() throws IOException{
		try {
			((PatentApplicationManager)this.manager).accept(this.businessObject);
			this.print("{success:true}");
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @description : 专利申请授权
	 * @date : 2015年3月11日下午4:51:59
	 * @author : 周强
	 * @params : {
			
		}
	 * @return : void
	 */
	public void accredit() throws IOException{
		try {
			((PatentApplicationManager)this.manager).accredit(this.businessObject);
			this.print("{success:true}");
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
			e.printStackTrace();
		}
	}
}
