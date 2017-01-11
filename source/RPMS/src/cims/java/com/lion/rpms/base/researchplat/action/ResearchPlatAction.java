package com.lion.rpms.base.researchplat.action;

import java.io.File;

import com.lion.rpms.base.researchplat.manager.ResearchPlatManager;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：创新平台管理action
 * @date ： 2015-03-06 13:18:28
 * @author ：WangYG
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class ResearchPlatAction extends BusinessAction {
	private static final long serialVersionUID = 1L;

	public ResearchPlatAction(ResearchPlat businessObject, ResearchPlatManager manager) {
		super(businessObject, manager);
	}

	/**
	 * @description : 创新平台选择树(人员职责设置时使用)
	 * @date : 2015年3月11日下午2:22:18
	 * @author : cpc
	 * @return : String
	 */
	public String getStaffPlatTree() {
		ResearchPlatManager researchPlatManager = (ResearchPlatManager) this.manager;
		try {
			this.print(researchPlatManager.getStaffPlatTree(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return NONE;
	}

	/**
	 * @description : 用于左侧树（下拉树）的展现
	 * @date : 2015-03-10上午09:45:30
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String listResearchPlatTree() {
		try {
			print(((ResearchPlatManager) this.manager).listResearchPlatTree(getRequest()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return NONE;

	}
	
	private File fileObject;

	/**
	 * @description : 上传并导入数据
	 * @date : 2015年4月13日上午10:42:39
	 * @author : cpc
	 * @return : String
	*/
	public String saveImportPlat() throws Exception {
		try {
			if (this.fileObject != null) {
				Long fileLength = fileObject.length();
				if (fileLength > 54857600) {
					this.print("{success:true,,m:'error' repeat: true,msg: '文件不能大于50M！'}");
					return NONE;
				}
				try {
					ResearchPlatManager manager = (ResearchPlatManager) this.manager;
					String msgString = manager.saveImportPlat(getRequest(), fileObject);

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
