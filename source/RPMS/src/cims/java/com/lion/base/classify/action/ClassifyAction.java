package com.lion.base.classify.action;

import java.io.IOException;

import com.lion.base.classify.manager.ClassifyManager;
import com.lion.base.classify.model.Classify;
import com.lion.system.common.action.BusinessAction;

/**
 * @description : 分类定义Action
 * @date : 2013-9-23上午10:22:21
 * @author : 辛尔青
 */
@SuppressWarnings("unchecked")
public class ClassifyAction extends BusinessAction {

	private static final long serialVersionUID = 1L;

	public ClassifyAction(Classify businessObject, ClassifyManager manager) {
		super(businessObject, manager);
	}

	public String listTree() throws Exception {
		try {
			print(((ClassifyManager) this.manager).listTree(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "none";
	}
	/**
     * 根据分类编号获得单位
     */
	public String getUnit() throws IOException{
		try {
			ClassifyManager classify = (ClassifyManager) this.manager;
			
			this.print("{success:true,unit:'"+classify.getUnitForId(getRequest())+"'}");
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}
	
	public String listForCombolist(){
		try {
			print(((ClassifyManager) this.manager).listForCombolist(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "none";
	}
}
