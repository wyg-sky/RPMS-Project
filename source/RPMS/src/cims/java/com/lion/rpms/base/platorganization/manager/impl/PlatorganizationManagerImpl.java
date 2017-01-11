package com.lion.rpms.base.platorganization.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Filter;
import org.hibernate.Session;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.PageBean;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONTreeConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.base.platorganization.manager.PlatorganizationManager;
import com.lion.rpms.base.platorganization.model.Platorganization;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

public class PlatorganizationManagerImpl extends BusinessManagerImpl<Platorganization, String> implements PlatorganizationManager{

	public PlatorganizationManagerImpl(GenericDao<Platorganization, String> dao) {
		super(dao);
		this.setDataPower("400");
	}

	public String list(HttpServletRequest request, Platorganization businessObject) throws Exception {
		JSONConfig config = new JSONConfig();
		StringBuilder hql = new StringBuilder("from Platorganization obj");
		hql.append(this.genListRelationHql(businessObject, false)).append(this.genListConditionHql(request));
		String id = request.getParameter("id");
		if (StringUtils.isEmpty(id)) {
			hql.append(" and obj.parent is null ");
		} else {
			hql.append(" and obj.parent.id=\'").append(id).append("\'");
		}

		hql.append(" order by obj.sortOrder asc");
		List orgs = this.find(hql.toString(), request.getParameterValues("fieldValues"));
		config.setParentModel("parent", "id");
		config.setIterableAsSize(true);
		String json = JSONUtil.serializeForTreeGrid(orgs, "root", orgs.size(), config);
		return json;
	}

	public String listTree(HttpServletRequest request) throws Exception {
		String isReload = request.getParameter("isReload");
		boolean isSet = false;
		String globalOrgJson = null;
		if (StringUtils.isEmpty(isReload)) {
			globalOrgJson = (String) request.getSession().getAttribute("globalOrgJson");
			if (!StringUtils.isEmpty(globalOrgJson)) {
				return globalOrgJson;
			}

			isSet = true;
		}

		String id = request.getParameter("id");
		String disableParent = request.getParameter("disableParent");
		String level = request.getParameter("level");
		String parentId = request.getParameter("parentId");
		JSONTreeConfig config = new JSONTreeConfig("id", "name");
		StringBuilder sbHql = new StringBuilder("from Platorganization org where 1=1 ");
		if (!StringUtils.isEmpty(level)) {
			config.setDepth(Integer.parseInt(level));
		}

		if (!StringUtils.isEmpty(id)) {
			sbHql.append(" and org.id = \'");
			sbHql.append(id);
			sbHql.append("\'");
		} else if (!StringUtils.isEmpty(parentId)) {
			sbHql.append(" and org.parent.id=\'").append(parentId).append("\'");
		} else {
			sbHql.append(" and org.parent is null");
		}

		sbHql.append(" and valid=\'1\' order by sortOrder asc");
		Session session = this.getCurrentSession();
		Filter filter = session.enableFilter("organizationFilter");
		filter.setParameter("valid", "1");
		List organizations = this.find(sbHql.toString(), new Object[0]);
		if (organizations != null && organizations.size() == 1) {
			Platorganization o = (Platorganization) organizations.get(0);
			o.setExpanded(true);
			if (!StringUtils.isEmpty(disableParent)) {
				o.setDisabled(true);
			}

			config.setIncludeProperties("id, name, expanded, disabled");
		}

		config.setIncludeChildren("children.*");
		if (isSet) {
			globalOrgJson = JSONUtil.serializeForTree(organizations, config);
			request.getSession().setAttribute("globalOrgJson", globalOrgJson);
		} else {
			globalOrgJson = JSONUtil.serializeForTree(organizations, config);
		}

		return globalOrgJson;
	}

	public String listForCombolist(HttpServletRequest request) throws Exception {
		JSONConfig config = new JSONConfig();
		config.setClosCollection(true);
		StringBuilder sbSql = new StringBuilder("from Platorganization obj where obj.valid = \'1\' ");
		String hql = request.getParameter("hql");
		if (!StringUtils.isEmpty(hql)) {
			sbSql.append(hql);
		}

		sbSql.append(" order by obj.sortOrder asc ");
		PageBean pageBean = new PageBean();
		pageBean.setQueryHql(sbSql.toString());
		this.findPageAll(pageBean);
		String json = JSONUtil.serializeForGrid(pageBean.getResult(), "root", pageBean.getTotalCount(), config);
		return json;
	}

	public String changeStatus(HttpServletRequest request, String ids, String property, String value) throws Exception {
		this.clearApplication(request);
		return super.changeStatus(request, ids, property, value);
	}

	public void clearApplication(HttpServletRequest request) {
		request.getSession().setAttribute("globalOrgJson", "");
	}


}
