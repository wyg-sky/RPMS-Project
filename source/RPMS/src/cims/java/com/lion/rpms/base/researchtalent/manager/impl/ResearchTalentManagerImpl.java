package com.lion.rpms.base.researchtalent.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.researchtalent.manager.ResearchTalentManager;
import com.lion.rpms.base.researchtalent.model.ResearchTalent;
import com.lion.rpms.common.UserToPlat;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description ：创新人才管理业务实现类
 * @date ： 2015-03-09 15:39:36
 * @author ：WangYG
 */
public class ResearchTalentManagerImpl extends BusinessManagerImpl<ResearchTalent, String> implements ResearchTalentManager {

	public ResearchTalentManagerImpl(GenericDao<ResearchTalent, String> dao) {
		super(dao);
	}

	/**
	 * @description : 重写genListConditionHql 方法加上权限设置
	 * @date : 2015-03-30上午08:35:18
	 * @author : WangYG
	 */
	@SuppressWarnings("unchecked")
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sbHql = new StringBuilder(" where 1=1 ");
		sbHql.append(" and obj.valid='1' ");//设置无效数据不显示
		String platId = request.getParameter("platId");
		if (!StringUtils.isBlank(platId)) {
			String platArray = "";
			String sql = "select id from rpms_research_plat t " + "start with t.id = '" + platId + "' connect by prior t.id = t.parent";
			List<String> platlist = this.executeQuerySql(sql, new Object[0]);
			if (null != platlist && platlist.size() > 0) {
				for (int i = 0; i < platlist.size(); i++) {
					platArray = platlist.get(i) + "','" + platArray.toString();
				}

			}
			if (!StringUtils.isBlank(platArray)) {
				platArray = "'" + platArray.substring(0, platArray.length() - 2);
			} else {
				platArray = "''";
			}
			sbHql.append(" and obj.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}

		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		// 添加人员管理平台权限设置
		UserToPlat userToPlat = new UserToPlat();
		String platStr = userToPlat.getPlatsStr(userView.getId(), this);
		sbHql.append(" and obj.platInstitution.id in(");
		sbHql.append(platStr);
		sbHql.append(") ");
		String[] queryFields = request.getParameterValues("queryFields");
		String[] operatorValues = request.getParameterValues("operatorValues");
		String hql = request.getParameter("hql");

		if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
			for (int i = 0; i < queryFields.length; i++) {
				if ((queryFields[i] != null) && (!"".equals(queryFields[i]))) {
					sbHql.append(" and ");
					sbHql.append(queryFields[i]);
					sbHql.append(" ");
					sbHql.append(operatorValues[i]);
					sbHql.append(" ? ");
				} else {
					System.err.println("查询字段不能为空!");
					break;
				}
			}
		}
		sbHql.append(StringUtils.isEmpty(hql) ? "" : hql);
		return sbHql;
	}
}
