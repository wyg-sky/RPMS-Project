package com.lion.rpms.research.projectacceptance.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.projectacceptance.manager.AcceptanceExpertManager;
import com.lion.rpms.research.projectacceptance.model.AcceptanceExpert;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 验收专家组明细管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-19 15:44:43
 */

public class AcceptanceExpertManagerImpl extends BusinessManagerImpl<AcceptanceExpert,String> implements AcceptanceExpertManager {

    public AcceptanceExpertManagerImpl(GenericDao<AcceptanceExpert, String> dao) {
        super(dao);
    }
     
}
