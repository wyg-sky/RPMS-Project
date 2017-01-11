package com.lion.rpms.base.researchplat.manager;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：创新平台管理业务类
 * @date ： 2015-03-06 13:18:28
 * @author ：WangYG
 */
public interface ResearchPlatManager extends BusinessManager<ResearchPlat, String> {

	/**
	 * @description : 用于左侧树（下拉树）的展现
	 * @date : 2015-03-10上午09:45:30
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String listResearchPlatTree(HttpServletRequest request) throws Exception;

	/**
	 * @description : 创新平台选择树(人员职责设置时使用)
	 * @date : 2015年3月11日下午2:22:18
	 * @author : cpc
	 * @return : String
	 */
	public String getStaffPlatTree(HttpServletRequest paramHttpServletRequest) throws Exception;
	
	/**
	 * @description : 上传并导入数据
	 * @date : 2015年4月13日上午10:42:14
	 * @author : cpc
	 * @return : String
	*/
	public String saveImportPlat(HttpServletRequest request,File fileObject) throws Exception;

}
