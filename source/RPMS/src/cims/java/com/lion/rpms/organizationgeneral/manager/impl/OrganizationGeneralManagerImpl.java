package com.lion.rpms.organizationgeneral.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.organizationgeneral.manager.OrganizationGeneralManager;
import com.lion.rpms.organizationgeneral.model.OrganizationGeneral;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：单位概况管理业务实现类
 * @date ： 2016-11-16 17:49:47
 * @author ：杨尚山
 */
public class OrganizationGeneralManagerImpl extends BusinessManagerImpl<OrganizationGeneral,String> implements OrganizationGeneralManager {
	public OrganizationGeneralManagerImpl(GenericDao<OrganizationGeneral, String> dao) {
		super(dao);
	}
	
	/**
	 * 根据分中心,年度,月度获取项目信息
	 */
	@SuppressWarnings("unchecked")
	public String genOrgGeneralData(HttpServletRequest request) throws Exception{
		Double yfxmgs=0.0,yfxmys=0.0,yfjftj=0.0,yffygj=0.0,snrkyfjf=0.0,swrkyfjf=0.0,yjssdszc=0.0;
		
		String centerPlatId = request.getParameter("centerPlat");
		String year = request.getParameter("year");
		String month = request.getParameter("month");
		
		StringBuilder baseSql = new StringBuilder();
		baseSql.append(" select ");
		baseSql.append(" p.project_annual,p.plat_center, ");
		baseSql.append(" pf.total_budget,p.snrk,p.swrk ");
		baseSql.append(" from RPMS_PROJECT p ");
		baseSql.append(" left join RPMS_PROJECT_FUNDS pf on p.id=pf.main_id ");
		baseSql.append(" where p.project_annual='").append(year).append("' ");
		baseSql.append(" and p.plat_center='").append(centerPlatId).append("' ");
		baseSql.append(" and (p.RECOMMEND_TYPE <>'0005' or p.RECOMMEND_TYPE is null) ");
		
		//研发项目个数
		StringBuilder countSql = new StringBuilder();
		countSql.append(" select count(*) from (").append(baseSql).append(")");
		List<Object> countList = this.executeQuerySql(countSql.toString(), null);
		if(countList.size()>0){
			yfxmgs = Double.valueOf(countList.get(0)==null?"0":countList.get(0).toString());
		}
		
		//研发项目预算,山能认可研发经费,税务认可研发经费
		StringBuilder proSql = new StringBuilder();
		proSql.append(" select t.project_annual,t.plat_center,");
		proSql.append(" nvl(sum(t.total_budget),0) ys,nvl(sum(t.snrk),0) snrk,nvl(sum(t.swrk),0) swrk ");
		proSql.append(" from (").append(baseSql).append(") t");
		proSql.append(" group by t.project_annual,t.plat_center");
		List<Object[]> proList = this.executeQuerySql(proSql.toString(), null);
		if(proList.size()>0){
			yfxmys = Double.valueOf(proList.get(0)[2]==null?"0":proList.get(0)[2].toString());
			snrkyfjf = Double.valueOf(proList.get(0)[3]==null?"0":proList.get(0)[3].toString());
			swrkyfjf = Double.valueOf(proList.get(0)[4]==null?"0":proList.get(0)[4].toString());
			yjssdszc = swrkyfjf*0.125;
		}
		
		//研发经费统计,研发费用归集
		StringBuilder dispSql = new StringBuilder();
		dispSql.append(" select ");
		dispSql.append(" nvl(sum(t.tjhj),0),nvl(sum(t.gjhj),0) ");
		dispSql.append(" from RPMS_PROJECT_DISPATCH t ");
		dispSql.append(" left join rpms_project p on t.project_id=p.id ");
		dispSql.append(" where t.dispatch_month<='").append(month).append("' ");
		dispSql.append(" and p.plat_center='").append(centerPlatId).append("' ");
		List<Object[]> dispData = this.executeQuerySql(dispSql.toString(), null);
		if(dispData.size()>0){
			yfjftj = Double.valueOf(dispData.get(0)[0]==null?"0":dispData.get(0)[0].toString());
			yffygj = Double.valueOf(dispData.get(0)[1]==null?"0":dispData.get(0)[1].toString());
		}
		StringBuilder json = new StringBuilder();
		json.append("{success:true");
		json.append(",yfxmgs:\""+yfxmgs+"\",yfxmys:\""+yfxmys+"\",yfjftj:\""+yfjftj+"\",yffygj:\""+yffygj+"\"");
		json.append(",snrkyfjf:\""+snrkyfjf+"\",swrkyfjf:\""+swrkyfjf+"\",yjssdszc:\""+yjssdszc+"\"");
		json.append("}");
		
		return json.toString();
	}
}
