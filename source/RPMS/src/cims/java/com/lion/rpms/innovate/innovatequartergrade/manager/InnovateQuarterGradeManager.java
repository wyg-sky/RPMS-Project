package com.lion.rpms.innovate.innovatequartergrade.manager;

import com.lion.system.common.manager.BusinessManager;
import com.lion.rpms.innovate.innovatequartergrade.model.InnovateQuarterGrade;

/**
 * @description ：季度检查打分管理业务类
 * @date ： 2015-03-13 11:05:31
 * @author ：周强
 */
public interface InnovateQuarterGradeManager extends BusinessManager<InnovateQuarterGrade,String> {
	
	public void init(String year,String quarter, String platCenter) throws Exception;
}
