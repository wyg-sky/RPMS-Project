package com.lion.rpms.research.projectdispatch.manager.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ibm.icu.text.SimpleDateFormat;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.PageBean;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.project.manager.ProjectCostTotalManager;
import com.lion.rpms.research.project.model.ProjectCostTotal;
import com.lion.rpms.research.projectdispatch.manager.ProjectDispatchManager;
import com.lion.rpms.research.projectdispatch.model.ProjectDispatch;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.role.model.Role;
import com.lion.system.user.model.UserView;

/**
 * @description : 项目调度管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 14:59:24
 */

public class ProjectDispatchManagerImpl extends BusinessManagerImpl<ProjectDispatch,String> implements ProjectDispatchManager {
	private ProjectCostTotalManager projectCostTotalManager;
    public ProjectDispatchManagerImpl(GenericDao<ProjectDispatch, String> dao) {
        super(dao);
    }

	public ProjectCostTotalManager getProjectCostTotalManager() {
		return projectCostTotalManager;
	}
	public void setProjectCostTotalManager(ProjectCostTotalManager projectCostTotalManager) {
		this.projectCostTotalManager = projectCostTotalManager;
	}


	@SuppressWarnings("unchecked")
	@Override
   	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
   	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
   	    String platId = request.getParameter("platId");
	    if(!StringUtils.isBlank(platId)){
	    	String platArray  = "";
			String sql = "select id from rpms_research_plat t "
					+ "start with t.id = '"+platId+"' connect by prior t.id = t.parent";
			List<String> platlist = this.executeQuerySql(sql, new Object[0]);
			if (null != platlist && platlist.size()>0) {
				for (int i = 0; i < platlist.size(); i++) {
					platArray = platlist.get(i) +"','"+platArray.toString();
				}
				
			}
			if(!StringUtils.isBlank(platArray)){
				platArray = "'"+platArray.substring(0, platArray.length()-2);
			}else{
				platArray ="''";
			}
			sbHql.append(" and obj.projectId.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}
	    
   	    UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
   	    //添加人员管理平台权限设置
   	    UserToPlat  userToPlat = new UserToPlat();
   	    /*
   	     * 修改by杨尚山,2016-05-18
   	     * 若拥有权限名称为"专业专家审核权限"的用户登录,
   	     * 则可查看该用户对应的 "单位数据权限" 所包含的单位,
   	     * 在"专业词典管理"模块中对应专业的数据
   	     * 否则根据人员职责分中心,分中心机构进行权限过滤
    	*/
   	    boolean roleCheck = false;
		List<Role> role = (List<Role>) request.getSession().getAttribute(Constants.USER_ROLES);
		for(Role r : role){
			if("RPMS_SPECIAL_CHECK_ROLE".equalsIgnoreCase(r.getCode())){
				roleCheck = true;
			}
		}
   	    if(roleCheck){
   	    	String platStr = userToPlat.getSpecialtyStr(userView.getId(),this);
   	    	sbHql.append(" and obj.projectId.specialty.id in(");
	   	    sbHql.append(platStr);
	   	    sbHql.append(") ");
   	    } else{
   	    	String platStr = userToPlat.getPlatsStr(userView.getId(),this);
   	   	    sbHql.append(" and obj.projectId.platInstitution.id in(");
   	   	    sbHql.append(platStr);
   	   	    sbHql.append(") ");
   	    }
   	    
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
    
	/**
	 * 修改调度状态
	 */
    @SuppressWarnings("unchecked")
	public String changeStatus(HttpServletRequest request, String ids, String property, String value) throws Exception {
	    if (!StringUtils.isEmpty(ids)) {
	    	String[] idsArray = ids.split(",");
//	    	ids = "'" + ids.replaceAll(",", "','") + "'";
//	        StringBuilder sbHql = new StringBuilder();
//	        sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
//	        sbHql.append(" set ").append(property).append(" = '").append(value);
//	        sbHql.append("' where id in (").append(ids).append(")");
//	        bulkUpdate(sbHql.toString(), new Object[0]);
	      
	        for (int i = 0; i < idsArray.length; i++) {
	        	ProjectDispatch pjd = this.get(idsArray[i]);
	        	String sql = "";
	        	
	        	if ("0005".equals(value)) {
	        		if ("0001".equals(pjd.getType())) {//调度完成后,修改项目管理对应项目的信息
	    
	        			String projectCostHql = "select obj from ProjectCostTotal obj where obj.mainId=? order by obj.dispatchMonth desc";
	        			List<ProjectCostTotal> projectCostTotalList = this.projectCostTotalManager.executeQuery(projectCostHql, new Object[]{pjd.getProjectId().getId()});
	        			ProjectCostTotal pct = null;
	        			if(projectCostTotalList.size()>0){
	        				pct = projectCostTotalList.get(0);
	        			}
	        			//往项目立项管理模块,费用归集标签页添加记录;最新值=最后一次费用归集数+本次调度数
	        			StringBuilder insertSql = new StringBuilder();
	        			insertSql.append(" insert into RPMS_PROJECT_COST_TOTAL (id,main_id,Dispatch_Month,Project_Stage,gzxj,wxyj,clf,rlf,dlf,szf,ypyjf,jcf,wxf,zlf,yqzj,sbzj,rjtx,zltx,fzljstx,sjf,gczdf,xycsyf,ktsyf,xmjdf,zlfy,qtfy,htf,wxzctx,jzwzjf,gzsbyj,lzzfzj,tjhj,gjhj) ");
	        			insertSql.append(" values(sys_guid(),'").append(pjd.getProjectId().getId()).append("',");
	        			insertSql.append("'").append(pjd.getDispatchMonth()).append("',");
	        			insertSql.append("'").append(pjd.getProjectStage()).append("',");
	        			insertSql.append(pjd.getGzxj() + (pct == null?0.0:pct.getGzxj())).append(",");
	        			insertSql.append(pjd.getWxyj() + (pct == null?0.0:pct.getWxyj())).append(",");
	        			insertSql.append(pjd.getClf() + (pct == null?0.0:pct.getClf())).append(",");
	        			insertSql.append(pjd.getRlf() + (pct == null?0.0:pct.getRlf())).append(",");
	        			insertSql.append(pjd.getDlf() + (pct == null?0.0:pct.getDlf())).append(",");
	        			insertSql.append(pjd.getSzf() + (pct == null?0.0:pct.getSzf())).append(",");
	        			insertSql.append(pjd.getYpyjf() + (pct == null?0.0:pct.getYpyjf())).append(",");
	        			insertSql.append(pjd.getJcf() + (pct == null?0.0:pct.getJcf())).append(",");
	        			insertSql.append(pjd.getWxf() + (pct == null?0.0:pct.getWxf())).append(",");
	        			insertSql.append(pjd.getZlf() + (pct == null?0.0:pct.getZlf())).append(",");
	        			insertSql.append(pjd.getYqzj() + (pct == null?0.0:pct.getYqzj())).append(",");
	        			insertSql.append(pjd.getSbzj() + (pct == null?0.0:pct.getSbzj())).append(",");
	        			insertSql.append(pjd.getRjtx() + (pct == null?0.0:pct.getRjtx())).append(",");
	        			insertSql.append(pjd.getZltx() + (pct == null?0.0:pct.getZltx())).append(",");
	        			insertSql.append(pjd.getFzljstx() + (pct == null?0.0:pct.getFzljstx())).append(",");
	        			insertSql.append(pjd.getSjf() + (pct == null?0.0:pct.getSjf())).append(",");
	        			insertSql.append(pjd.getGczdf() + (pct == null?0.0:pct.getGczdf())).append(",");
	        			insertSql.append(pjd.getXycsyf() + (pct == null?0.0:pct.getXycsyf())).append(",");
	        			insertSql.append(pjd.getKtsyf() + (pct == null?0.0:pct.getKtsyf())).append(",");
	        			insertSql.append(pjd.getXmjdf() + (pct == null?0.0:pct.getXmjdf())).append(",");
	        			insertSql.append(pjd.getZlfy() + (pct == null?0.0:pct.getZlfy())).append(",");
	        			insertSql.append(pjd.getQtfy() + (pct == null?0.0:pct.getQtfy())).append(",");
	        			insertSql.append(pjd.getHtf() + (pct == null?0.0:pct.getHtf())).append(",");
	        			insertSql.append(pjd.getWxzctx() + (pct == null?0.0:pct.getWxzctx())).append(",");
	        			insertSql.append(pjd.getJzwzjf() + (pct == null?0.0:pct.getJzwzjf())).append(",");
	        			insertSql.append(pjd.getGzsbyj() + (pct == null?0.0:pct.getGzsbyj())).append(",");
	        			insertSql.append(pjd.getLzzfzj() + (pct == null?0.0:pct.getLzzfzj())).append(",");
	        			insertSql.append(pjd.getTjhj() + (pct == null?0.0:pct.getTjhj())).append(",");
	        			insertSql.append(pjd.getGjhj() + (pct == null?0.0:pct.getGjhj())).append(")");
	        			this.executeSql(insertSql.toString(), new Object[0]);
	        			
	        			//更新项目立项模块中,调度时间,累计 合计,归集合计字段
	        			StringBuilder updateSql = new StringBuilder();
	        			updateSql.append(" update rpms_Project t set ");
	        			updateSql.append(" t.ddsj ='").append(pjd.getDispatchMonth()).append("', ");
	        			updateSql.append(" t.LJTJ =").append(pjd.getTjhj() + (pct == null?0.0:pct.getTjhj())).append(", ");
	        			updateSql.append(" t.LJGJ =").append(pjd.getGjhj() + (pct == null?0.0:pct.getGjhj())).append(" ");
	        			updateSql.append(" where t.id ='").append(pjd.getProjectId().getId()).append("' ");
	        			this.executeSql(updateSql.toString(), new Object[0]);
	        			
	        			if ("0001".equals(pjd.getProjectStage())) {
	        				sql = "update rpms_Project t set  t.PROJECT_STATUS = '0003'  where t.id ='"+pjd.getProjectId().getId()+"'";
							this.executeSql(sql, new Object[0]);
						} else {
							sql = "update rpms_Project t set  t.PROJECT_STATUS = '0004'  where t.id ='"+pjd.getProjectId().getId()+"'";
							this.executeSql(sql, new Object[0]);
						}
					} else {
						if ("0001".equals(pjd.getChangeType())) {
							sql = "update rpms_Project t set  t.project_annual = '"+pjd.getDelayYear()+"'  where t.id ='"+pjd.getProjectId().getId()+"'";
							this.executeSql(sql, new Object[0]);
						} else {
							sql = "update rpms_Project t set  t.PROJECT_STATUS = '0007'  where t.id ='"+pjd.getProjectId().getId()+"'";
							this.executeSql(sql, new Object[0]);
						}
					}
				}
		    }  
	    }
	    return "{success : true, ids : \"" + ids + "\"}";
	}
    
    public String list(HttpServletRequest request, ProjectDispatch businessObject, JSONConfig config, String queryHql, String countHql, Object[] values) throws Exception {
        PageBean pageBean = new PageBean();
        pageBean.setLimit(request.getParameter("limit"));
        pageBean.setStart(request.getParameter("start"));
        pageBean.setCountHql(countHql);
        pageBean.setQueryHql(queryHql);
        pageBean.setValues(values);
//        config.setIncludeProperties(commaDelim);
        config.setDepth(3);
        findPageAll(pageBean);
        String json = JSONUtil.serializeForGrid(pageBean.getResult(), "root", pageBean.getTotalCount(), config);
        return json;
      }
    
    /**
     * 更改 项目立项管理模块 中对应记录的 项目进展阶段 状态
     * */
    public String changeProjectStage(HttpServletRequest request) throws Exception{
    	String projectId = request.getParameter("projectId");
    	String projectStage = request.getParameter("projectStage");//项目进展阶段
    	String ysxjjxy = request.getParameter("ysxjjxy");//已实现经济效益
    	String investmentTotal = request.getParameter("investmentTotal");//总研发经费已投入
    	StringBuilder sql = new StringBuilder();
    	sql.append("update Rpms_Project t set ");
    	sql.append("t.PROJECT_STAGE = '").append(projectStage).append("' ");
    	sql.append(",t.YSXJJXY = '").append(ysxjjxy).append("' ");
    	sql.append(",t.INVESTMENT_TOTAL = '").append(investmentTotal).append("' ");
    	sql.append("where t.id ='").append(projectId).append("'");
    	this.executeSql(sql.toString(), new Object[0]);
    	return "{success : true}";
    }
    
    /**
     * 获取最新调度项目
     * 获取项目立项管理模块,项目进展阶段 不是状态为"项目完成" 的记录
     * */
    @SuppressWarnings("unchecked")
	public String genNewProjectDispatch(HttpServletRequest request)  throws Exception{
    	UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
    	String msg = "";
    	String dispatchMonth = request.getParameter("dispatchMonth");
    	
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
    	if(dispatchMonth == null || "".equals(dispatchMonth)){
    		dispatchMonth = sdf.format(new Date());;
    	}
    	
    	String disMon = dispatchMonth.substring(5, 7);
    	StringBuilder vaildMonthSql = new StringBuilder();
    	vaildMonthSql.append("select item_text from v_code c where c.code ='rpms_pro_dispatch_month' ");
    	vaildMonthSql.append("and '").append(disMon).append("' in c.item_value ");
    	List<String> vaildMonthData = this.executeQuerySql(vaildMonthSql.toString(), new Object[0]);
    	if(vaildMonthData.size() > 0){
    		
	    	StringBuilder existSql = new StringBuilder();
	    	existSql.append("select count(*) from RPMS_PROJECT_DISPATCH where DISPATCH_MONTH=");
	    	existSql.append("'").append(dispatchMonth).append("'");
	    	List<BigDecimal> existData = this.executeQuerySql(existSql.toString(), new Object[0]);
	    	if(existData.get(0).intValue() > 0){
	    		msg = "当季调度数据已存在!";
	    		return "{success : false,msg:\""+msg+"\"}";
	    	}
	    	
		    String insertSql =  "insert into RPMS_PROJECT_DISPATCH(id,PROJECT_ID,PROJECT_STAGE,STATUS,TYPE,DISPATCH_MONTH,CREATE_USER,CREATE_TIME) select sys_guid(),id,PROJECT_STAGE,'0001','0001','"+dispatchMonth+"','"+userView.getUserName()+"',sysdate from RPMS_PROJECT p where p.PROJECT_STAGE !='0007' and p.status='0004' and p.project_stage is not null and p.PLAT_CENTER is not null";
		    this.executeSql(insertSql, new Object[0]);
	    	return "{success : true}";
    	} else {
    		msg = "当前月份非调度月份,无法进行项目调度!";
    		return "{success : false,msg:\""+msg+"\"}";
    	}
    }
    
    public String load(HttpServletRequest request) throws Exception
    {
      String id = request.getParameter("id");
      if (!(StringUtils.isEmpty(id))) {
    	  ProjectDispatch businessObject = get(id);
    	  JSONConfig config = new JSONConfig();
    	  config.setClosCollection(true);
    	  config.setDepth(3);
    	  String json = JSONUtil.serializeForForm(businessObject, "root", config);
    	  return json;
      }
      throw new Exception("id为空");
    }
     
}
