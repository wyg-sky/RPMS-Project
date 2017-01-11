package com.lion.rpms.research.reviewaudit.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Filter;
import org.hibernate.Session;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONTreeConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.rpms.research.reviewaudit.manager.ReviewAuditManager;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.manager.OrganizationManager;
import com.lion.system.organization.model.Organization;

public class ReviewAuditManagerImpl extends BusinessManagerImpl<ProjectAcceptance, String> implements ReviewAuditManager {
    private OrganizationManager organizationManager;
	public ReviewAuditManagerImpl(GenericDao<ProjectAcceptance, String> dao) {
		super(dao);
		this.setDataPower("200");
		this.setOrganizationField("reviewUnit");
	}

	@Override
	public String listOrgTree(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		String level = request.getParameter("level");
		String parentId = request.getParameter("parentId");
		JSONTreeConfig config = new JSONTreeConfig("id", "name");
		String disableParent = request.getParameter("disableParent");
		StringBuilder sbHql = new StringBuilder("from Organization org where 1=1 ");
		if (!StringUtils.isEmpty(level)) {
			config.setDepth(Integer.parseInt(level));
		}
		
		String hql = request.getParameter("hql");
		sbHql.append(hql);

		if (!StringUtils.isEmpty(id)) {
			sbHql.append(" and org.id = '");
			sbHql.append(id);
			sbHql.append("'");
		} else if (!StringUtils.isEmpty(parentId)) {
			sbHql.append(" and org.parent.id='").append(parentId).append("'");
		} else {
			sbHql.append(" and org.parent is not null");
		}
		
		sbHql.append(" and valid='1' order by sortOrder asc");

		Session session = getCurrentSession();
		Filter filter = session.enableFilter("organizationFilter");
		filter.setParameter("valid", "1");

		List<Organization> organizations = this.organizationManager.find(sbHql.toString(), new Object[0]);

		if ((organizations != null) && (organizations.size() == 1)) {
			Organization o = (Organization) organizations.get(0);
			o.setExpanded(true);
			if (!StringUtils.isEmpty(disableParent)) {
				o.setDisabled(true);
			}

			config.setIncludeProperties("id, name, expanded, disabled");
		}

		config.setIncludeChildren("children.*");
		String globalOrgJson = JSONUtil.serializeForTree(organizations, config);
		return globalOrgJson;
	}

	public OrganizationManager getOrganizationManager() {
		return organizationManager;
	}

	public void setOrganizationManager(OrganizationManager organizationManager) {
		this.organizationManager = organizationManager;
	}
	
}
