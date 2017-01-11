package com.lion.base.location.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Filter;
import org.hibernate.Session;

import com.lion.base.location.manager.LocationImportManager;
import com.lion.base.location.manager.LocationManager;
import com.lion.base.location.model.Location;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.ClassUtil;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONTreeConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.framework.model.LoginInfo;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 设备位置管理业务实现
 * @date : 2013-8-29下午3:14:37
 * @author : 曹鹏程
 */
public class LocationManagerImpl extends BusinessManagerImpl<Location, String> implements LocationManager {
	private LocationImportManager locationImportManager;
	public LocationManagerImpl(GenericDao<Location, String> dao) {
		super(dao);
		this.setCollection(false);
	}
	@Override
	public String list(HttpServletRequest request, Location businessObject) throws Exception {
	
		Organization organization = (Organization) request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		StringBuilder hql = new StringBuilder("select obj from Location obj where 1=1");
		String id = request.getParameter("id");
		String[] queryFields = request.getParameterValues("queryFields");
	    String[] operatorValues = request.getParameterValues("operatorValues");
	    String[] values = request.getParameterValues("fieldValues");
	    String hqlnew = request.getParameter("hql");
	    String type = request.getParameter("type");
	    LoginInfo loginInfo = (LoginInfo)request.getSession().getAttribute(Constants.LOGININFO);	
		String systemCode = loginInfo.getModuleCode();
		
	    String json =  "";
	    if("locationCd".equals(type)){
	    	  if (!StringUtils.isEmpty(id)) { 
	  			hql.append(" and obj.parent.id='" + id + "'");
	  		} else {
	  			if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
	  			      for (int i = 0; i < queryFields.length; ++i) {
	  			        if ((queryFields[i] != null) && (!("".equals(queryFields[i])))) {
	  			        	hql.append(" and ");
	  			        	hql.append(queryFields[i]);
	  			        	hql.append(" ");
	  			        	hql.append(operatorValues[i]);
	  			        	hql.append(" '");
	  			        	hql.append(values[i]);
	  			        	hql.append("' ");
	  			        } else {
	  			        	System.err.println("查询字段不能为空!");
	  			        	break;
	  			        }
	  			      }
	  			    } else {
	  			    	hql.append(" and obj.parent is null ");
	  				}
	  			    
	  				if(!StringUtils.isEmpty(hqlnew)){
	  					hql.append(hqlnew);
	  				}
	  		}
	  		if(systemCode!=null&&!systemCode.equals("")){
	  			hql.append(" and obj.sysType = '");
	  			hql.append(systemCode);
	  			hql.append("'");
	  		}
	  		hql.append("   and obj.organization = '"+organization.getId()+"' order by obj.locationCd asc");
	  		
	  		List<Location> types = this.find(hql.toString());
	  		JSONConfig config = new JSONConfig();
	  		config.setParentModel("parent", "id");
	  		config.setIterableAsSize(true);
	  		json = JSONUtil.serializeForTreeGrid(types, "root", types.size(), config);
	    }else{
	    	if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
			      for (int i = 0; i < queryFields.length; ++i) {
			        if ((queryFields[i] != null) && (!("".equals(queryFields[i])))) {
			        	hql.append(" and ");
			        	hql.append(queryFields[i]);
			        	hql.append(" ");
			        	hql.append(operatorValues[i]);
			        	hql.append(" '");
			        	hql.append(values[i]);
			        	hql.append("' ");
			        } else {
			        	System.err.println("查询字段不能为空!");
			        	break;
			        }
			      }
			  }
	    	if(!StringUtils.isEmpty(hqlnew)){
					hql.append(hqlnew);
			   }
	    	hql.append(" and obj.valid = '1' and obj.parent is null and obj.organization = '"+organization.getId()+"'");
	    	hql.append(" order by obj.locationCd asc");
	    	
	    	Session session = this.getCurrentSession();
	        Filter filter = session.enableFilter("locationFilter");
	        filter.setParameter("valid", "1");
	        
			List<Location> types = this.find(hql.toString());
			JSONTreeConfig config = new JSONTreeConfig("id", "locationName");
		    config.setIncludeChildren("children.*");
		     json = JSONUtil.serializeForTree(types, config);
	    }
	  

		return json;
	}
	
	/**
	 * @description : 用于左侧树（下拉树）的展现
	 * @date : 2013-8-30上午11:45:30
	 * @author : 曹鹏程
	 * @params : {
			
		}
	 * @return : String
	*/
	public String listTree(HttpServletRequest request) throws Exception {
	    String parentId = request.getParameter("parentId");
	    String orgId = request.getParameter("orgId");
	    StringBuilder sbHql = new StringBuilder("from Location where 1=1 ");
	    JSONTreeConfig config = new JSONTreeConfig("id", "locationName");

	    if (!(StringUtils.isEmpty(parentId))) {
	      sbHql.append(" and parent.id = '");
	      sbHql.append(parentId);
	      sbHql.append("'");
	    } else {
	      sbHql.append(" and parent is null");
	    }

	    if (!(StringUtils.isEmpty(orgId))) {
	      sbHql.append(" and organization = '");
	      sbHql.append(orgId);
	      sbHql.append("'");
	    }

	    sbHql.append(" and valid='1' order by locationCd asc");
	    List<?> locations = find(sbHql.toString(), new Object[0]);
	    
	    config.setIncludeChildren("children.*");
	    String json = JSONUtil.serializeForTree(locations, config);
	    return json;
	  }
	
	/**
	 * @description : 如果子节点中有有效的数据，父节点不能够置为无效
	 * @date : 2013-9-02上午11:45:30
	 * @author : 曹鹏程
	 * @params : {
	 
		}
	 * @return : String
	*/
	public String changeStatus(HttpServletRequest request, String ids, String property, String value){
		ids = "'" + ids.replaceAll(",", "','") + "'";
        StringBuilder sbHql = new StringBuilder("from Location where 1=1 ");
        if(value.equals("0")&&!(StringUtils.isEmpty(ids))) {
  	      sbHql.append(" and parent.id in (");
  	      sbHql.append(ids);
  	      sbHql.append(") and valid = '1'");
  	    }
        List<Location> location = find(sbHql.toString(), new Object[0]);
        if(location.size()>0&&value.equals("0")){
           return  "{success : false, msg : \"存在有效的子节点，父节点无法置为无效！\"}";
        }else{
        	StringBuilder sbHqlnew = new StringBuilder();
        	sbHqlnew.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
        	sbHqlnew.append(" set ").append(property).append(" = '").append(value);
        	sbHqlnew.append("' where id in (").append(ids).append(")");
            bulkUpdate(sbHqlnew.toString(), new Object[0]);
           return "{success : true}";
        }
	}

	@Override
	public String importLocation(HttpServletRequest request) {
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)request.getSession().getAttribute(Constants.USER_VIEW);
		String importType = request.getParameter("importType");
		String importCode = request.getParameter("importCode");
		String importSysId = request.getParameter("importSysId");		
		String str = this.locationImportManager.importLocation(importType, importCode, importSysId, organization, user);
		return str;
	}

	public LocationImportManager getLocationImportManager() {
		return locationImportManager;
	}

	public void setLocationImportManager(LocationImportManager locationImportManager) {
		this.locationImportManager = locationImportManager;
	}
	
}
