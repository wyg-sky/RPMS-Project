package com.lion.rpms.base.researchequipment.action;

import java.io.File;

import com.lion.rpms.base.researchequipment.manager.ResearchEquipmentManager;
import com.lion.rpms.base.researchequipment.model.ResearchEquipment;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：创新设备管理action
 * @date ： 2015-03-09 16:47:04
 * @author ：WangYG
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ResearchEquipmentAction extends BusinessAction {
	private static final long serialVersionUID = 1L;

	public ResearchEquipmentAction(ResearchEquipment businessObject, ResearchEquipmentManager manager) {
		super(businessObject, manager);
	}

	/**
	 * 上传并保存数据
	 */
	private File fileObject;

	public String saveImportEquipment() throws Exception {
		try {
			if (this.fileObject != null) {
				Long fileLength = fileObject.length();
				if (fileLength > 54857600) {
					this.print("{success:true,,m:'error' repeat: true,msg: '文件不能大于50M！'}");
					return NONE;
				}

				try {
					ResearchEquipmentManager manager = (ResearchEquipmentManager) this.manager;
					String msgString = manager.saveImportEquipment(getRequest(), fileObject);

					if (null == msgString || "".equalsIgnoreCase(msgString) || "null".equalsIgnoreCase(msgString)) {
						this.print("{success:true,msg:\"上传数据成功\"}");
					} else {
						this.print("{success:true,msg:\"" + msgString + "\"}");
					}
				} catch (Exception e) {
					e.printStackTrace();
					this.print("{success:true,msg:\"导入失败！" + e.getMessage() + "\"}");
				}

				this.print("{success:true,msg: '导入数据成功！'}");
			} else {
				this.print("{success:true,msg:\"请选择需要导入的excel文档！\"}");
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false}");
		}
		return NONE;
	}

	public File getFileObject() {
		return fileObject;
	}

	public void setFileObject(File fileObject) {
		this.fileObject = fileObject;
	}
	
	
}
