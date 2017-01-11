package com.lion.rpms.common.previewdoc.action;

import java.io.IOException;

import com.lion.rpms.common.previewdoc.manager.PreviewdocManager;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：合同管理action
 * @date ： 2015-03-12 09:47:49
 * @author ：周强
 */

@SuppressWarnings("rawtypes")
public class PreviewdocAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	
	String docId = null;
	
	private PreviewdocManager manager;
	public PreviewdocAction(PreviewdocManager manager) {
		this.manager = manager;
	}
	
	public void convert() throws IOException{
		try {
			String result = this.manager.documentConverter(docId);
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
			e.printStackTrace();
		}
	}

	public String getDocId() {
		return docId;
	}

	public void setDocId(String docId) {
		this.docId = docId;
	}
	
}
