package com.lion.base.classify.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.classify.manager.ClassifyManager;
import com.lion.base.classify.model.Classify;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.ClassUtil;
import com.lion.core.util.PageBean;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONException;
import com.lion.core.util.json.JSONTreeConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.module.model.Module;
import com.lion.system.organization.model.Organization;

/**
 * @description : 分类定义业务处理实现
 * @date : 2013-9-23上午10:21:02
 * @author : 辛尔青
 */
public class ClassifyManagerImpl extends BusinessManagerImpl<Classify,String> implements ClassifyManager {
	private GenericDao<Module, String> moduleDao;
	
	public ClassifyManagerImpl(GenericDao<Classify, String> dao) {
		super(dao);
	}
	
	/**
	 * @description : 列表树形结构显示
	 * @date : 2013-9-23下午08:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			Classify businessObject
		}
	 * @return : String
	 */
	@SuppressWarnings("unchecked")
	public String list(HttpServletRequest request, Classify businessObject) throws Exception {
		JSONConfig config = new JSONConfig();
		PageBean pageBean = new PageBean();
		String fieldValues[] = request.getParameterValues("fieldValues");
		StringBuilder hql = genListHeadHql(businessObject);
		hql.append(genListConditionHql(request).append(genListDataPowerHql(request)));
		if(null == fieldValues || fieldValues.length <= 0 ){
			String id = request.getParameter("id");
			if (StringUtils.isEmpty(id)) {
				hql.append(" and obj.parent is null ");
			} else {
				hql.append(" and obj.parent.id='" + id + "'");
			}
		}
		if(fieldValues != null){
			String id = request.getParameter("id");
			if (StringUtils.isEmpty(id)) {
				hql.append(" ");
			} else {
				hql.append(" and obj.parent.id='" + id + "'");
			}
		}
		hql.append(genListOrderHql(request));
		pageBean.setLimit(request.getParameter("limit"));
		pageBean.setStart(request.getParameter("start"));
		pageBean.setQueryHql(hql.toString());
		pageBean.setValues(fieldValues);
		findPageAll(pageBean);
		List<Classify> types = (List<Classify>) pageBean.getResult();
		if(types.size() > 0){
			for(Classify obj : types){
				Classify classify = this.get(obj.getId());
				List<Module> modules = moduleDao.findByProperty("code", classify.getSystemType());
				if(null != modules && modules.size() > 0) {
					classify.setModule(modules.get(0));
					
				}
			}
		}
		config.setParentModel("parent", "id");
		config.setIterableAsSize(true);
		String json = JSONUtil.serializeForTreeGrid(types, "root", types.size(), config);
		return json;
	}
	
	/**
	 * @description : 加载指定id数据
	 * @date : 2013-9-23下午08:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request
		}
	 * @return : String
	 */
	public String load(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		if (!StringUtils.isEmpty(id)) {
			Classify classify = this.get(id);
			List<Module> modules = moduleDao.findByProperty("code", classify.getSystemType());
			if(modules != null && modules.size() > 0) {
				classify.setModule(modules.get(0));
			}
			JSONConfig config = new JSONConfig();
			config.setClosCollection(true);      //关闭集合
			String json = JSONUtil.serializeForForm(classify, "root", config);
			return json;
		} else {
			throw new Exception("id为空");
		}
	}
	
	/**
	 * @description : 置为有效、置为无效
	 * @date : 2013-9-23下午08:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			String ids, 
			String property, 
			String value
		}
	 * @return : String
	 */
	public String changeStatus(HttpServletRequest request, String ids, String property, String value) throws Exception {
		if (!(StringUtils.isEmpty(ids))) {
			String idsString = ids;
			StringBuilder sbHql = new StringBuilder();
			if (("valid").equals(property)) {
				ids = "'" + ids.replaceAll(",", "','") + "'";
				String parentHql = "";
				//当把叶子节点置为有效时，同时把父节点也置为有效
		    	if("1".equals(value)){
					parentHql = "from Classify c where c.id in (" + ids + ")";
					List<Classify> childens = this.find(parentHql, new Object[0]);
					if(null != childens && childens.size() > 0){
						sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
						sbHql.append(" set ").append(property).append(" = '").append(value);
						sbHql.append("' where id in (").append(ids).append(")");
						sbHql.append("or id in (select s.parent from Classify s where id in (").append(ids).append("))");
						bulkUpdate(sbHql.toString(), new Object[0]);
					}
				} else {
					//当把父节点置为无效时，把子节点也置为无效
					parentHql = "from Classify c where c.parent.id in (" + ids + ") or c.id in (" + ids + ")";
					List<Classify> childens = this.find(parentHql, new Object[0]);
					if (null != childens && childens.size() > 0) {
						sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
						sbHql.append(" set ").append(property).append(" = '").append(value);
						sbHql.append("' where id in (").append(ids).append(")");
						sbHql.append(" or parent in (").append(ids).append(")");
						bulkUpdate(sbHql.toString(), new Object[0]);
					} else {
						super.changeStatus(request, idsString, property, value);
					}
				}
			} else {
				super.changeStatus(request, idsString, property, value);
			}
		}
		return "{success : true, ids : \"" + ids + "\"}";
	}
	
	/**
	 * @description : 只有无效以及没有被引用的数据才能删除
	 * @date : 2013-9-23下午08:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			String[] ids
		}
	 * @return : String
	 */
	public boolean beforeDelete(HttpServletRequest request, String[] ids){
		boolean flag =true;
		try {
			//查询需要删除的记录是否没有子节点且状态为无效 ，否则不能删除
			for (String id : ids ) {
				String parenthql = "from Classify c where c.parent.id = '"+id+"' or c.id='"+id+"' and c.valid = '1'";
				List<Classify> childens = this.find(parenthql, new Object[0]);
				if (null != childens && childens.size() >0) {
					flag = false;
				}
			}
			if(!flag) {
				this.setMessage("{success : false, msg : \"存在关联数据！\"}");
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.setMessage("{success : false}");
			flag = false;
		}
		return flag;
	}

	public GenericDao<Module, String> getModuleDao() {
		return moduleDao;
	}

	public void setModuleDao(GenericDao<Module, String> moduleDao) {
		this.moduleDao = moduleDao;
	}

	@Override
	public String listTree(HttpServletRequest request) throws JSONException {
	    String json = "";
	    String id = request.getParameter("node");
	    String orgId = request.getParameter("orgId");
	    String parentId = request.getParameter("parentId");
	    JSONTreeConfig config = new JSONTreeConfig("id", "classifyName");
	    StringBuilder sbHql = new StringBuilder("from Classify where 1=1 ");

		if (!(StringUtils.isEmpty(id)) && !id.startsWith("node_")) {
			sbHql.append(" and parent.id ='");
			sbHql.append(id);
			sbHql.append("'");
		} else {
			if (!(StringUtils.isEmpty(parentId))) {
				sbHql.append(" and parent.id = '");
				sbHql.append(parentId);
				sbHql.append("'");
			} else {

				sbHql.append(" and parent is null");
			}
		}

	    if (!(StringUtils.isEmpty(orgId))) {
	      sbHql.append(" and organization = '");
	      sbHql.append(orgId);
	      sbHql.append("'");
	    }

	    sbHql.append(" and valid='1' order by classifyCd asc");
	    List<?> treeNodes = find(sbHql.toString(), new Object[0]);
	    config.setIncludeProperties("id, parent, leaf");
	    config.setIncludeChildren("children.*");
	    config.setDepth(1);
	    json = JSONUtil.serializeForTree(treeNodes, config);
	    return json;
	}
	/**
	 * 根据分类编号获得单位
	 */
	public String getUnitForId(HttpServletRequest request) {
		String classifyId = request.getParameter("classifyId");
		//Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		String sql = "select t.unit from BASE_CLASSIFY t where t.id='"+classifyId+"'";
		List<?> list = this.executeQuerySql(sql, null);
		if(list!=null&&list.size() > 0){
			if(list.get(0)!=null&&!list.get(0).equals("")){
				String str = list.get(0).toString();
				return str;
			}
			return "";
		}else{
			return "";
		}
	}

	@Override
	public String listForCombolist(HttpServletRequest request) throws Exception {
	    String orgClassifyFlag = request.getParameter("orgClassifyFlag");
	    JSONConfig config = new JSONConfig();
	    config.setClosCollection(true);

	    StringBuilder sbHql = new StringBuilder("from Classify obj where obj.valid = '1' ");

	    String hql = request.getParameter("hql");
	    if (!StringUtils.isEmpty(hql)) {
	      sbHql.append(hql);
	    }
	    if(!StringUtils.isBlank(orgClassifyFlag)&&"true".equals(orgClassifyFlag)){
		    //根据单位指标过滤产品指标
	    	String ids = "";
	    	StringBuilder sbForIds = new StringBuilder();
	    	Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
	    	@SuppressWarnings("unchecked")
			List<String> idList = (List<String>)this.executeQuerySql(
					"select t.classify_id from base_org_classify t where t.valid = '1' and t.organization=?", new Object[]{organization.getId()});
	    	for(String id :idList){
	    		sbForIds.append("'").append(id).append("',");
	    	}
	    	if(sbForIds.length()>0) ids = (sbForIds.substring(0,sbForIds.length()-1)).toString();
	    	sbHql.append(" and id in (").append(ids).append(") ");
	    }

	    sbHql.append(" order by obj.sort asc ");

	    PageBean pageBean = new PageBean();
	    pageBean.setQueryHql(sbHql.toString());

	    findPageAll(pageBean);
	    String json = JSONUtil.serializeForGrid(pageBean.getResult(), "root", pageBean.getTotalCount(), config);
	    return json;
	}
}
