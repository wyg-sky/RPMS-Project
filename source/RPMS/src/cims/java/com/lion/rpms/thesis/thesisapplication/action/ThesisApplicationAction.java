package com.lion.rpms.thesis.thesisapplication.action;

import java.io.IOException;

import com.lion.system.common.action.BusinessAction;
import com.lion.rpms.patent.patentapplication.manager.PatentApplicationManager;
import com.lion.rpms.thesis.thesisapplication.manager.ThesisApplicationManager;
import com.lion.rpms.thesis.thesisapplication.model.ThesisApplication;

/**
 * @description ：论文评比管理action
 * @date ： 2015-03-16 09:20:38
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ThesisApplicationAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	public ThesisApplicationAction(ThesisApplication businessObject, ThesisApplicationManager manager) {
		super(businessObject, manager);
	}
	
	public void award() throws IOException{
		try {
			((ThesisApplicationManager)this.manager).award((ThesisApplication)this.businessObject);
			this.print("{success:true}");
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
			e.printStackTrace();
		}
	}
}
