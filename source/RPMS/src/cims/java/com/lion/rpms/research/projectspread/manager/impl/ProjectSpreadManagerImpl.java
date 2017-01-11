package com.lion.rpms.research.projectspread.manager.impl;

import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import com.lion.core.util.json.JSONUtil;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.json.JSONConfig;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.projectspread.manager.ProjectSpreadManager;
import com.lion.rpms.research.projectspread.model.ProjectSpread;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description ：(项目推广管理)成果推广管理业务实现类
 * @date ： 2015-03-12 15:01:49
 * @author ：WangYG
 */
public class ProjectSpreadManagerImpl extends BusinessManagerImpl<ProjectSpread, String> implements ProjectSpreadManager {
	
	public ProjectSpreadManagerImpl(GenericDao<ProjectSpread, String> dao) {
		super(dao);
		this.setDataPower("500");
	}
	
	@Override
	public String list(HttpServletRequest request, ProjectSpread businessObject) throws Exception {
		JSONConfig config = new JSONConfig();
		config.setClosCollection(true);
		config.setDepth(3);
		return super.list(request, businessObject, config);
	}

	@Override
	public String load(HttpServletRequest request) throws Exception {
		ProjectSpread projectSpread = this.get(getRequest().getParameter("id"));
		JSONConfig config = new JSONConfig();
		config.setClosCollection(true);
		config.setDepth(3);
		return JSONUtil.serializeForForm(projectSpread, "root", config);
	}

	/*@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sbHql = new StringBuilder(" where 1=1 ");
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		// 添加人员管理平台权限设置
		UserToPlat userToPlat = new UserToPlat();
		String platStr = userToPlat.getPlatsStr(userView.getId(), this);
		sbHql.append(" and obj.projectId.platInstitution.id in(");
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
	}*/
}
