package com.lion.rpms.base.researchequipment.manager;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.base.researchequipment.model.ResearchEquipment;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description ：创新设备管理业务类
 * @date ： 2015-03-09 16:47:04
 * @author ：WangYG
 */
public interface ResearchEquipmentManager extends BusinessManager<ResearchEquipment, String> {

	public String saveImportEquipment(HttpServletRequest request,File fileObject) throws Exception;
}
