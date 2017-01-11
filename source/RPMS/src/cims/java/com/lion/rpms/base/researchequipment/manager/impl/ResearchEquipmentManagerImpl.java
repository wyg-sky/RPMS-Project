package com.lion.rpms.base.researchequipment.manager.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.researchequipment.manager.ResearchEquipmentManager;
import com.lion.rpms.base.researchequipment.model.ResearchEquipment;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.common.ExcelOperation;
import com.lion.rpms.common.UserToPlat;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description ：创新设备管理业务实现类
 * @date ： 2015-03-09 16:47:04
 * @author ：WangYG
 */
public class ResearchEquipmentManagerImpl extends BusinessManagerImpl<ResearchEquipment, String> implements ResearchEquipmentManager {

	public ResearchEquipmentManagerImpl(GenericDao<ResearchEquipment, String> dao) {
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
			sbHql.append(" and obj.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}
	    
	    UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
	    //添加人员管理平台权限设置
	    UserToPlat  userToPlat = new UserToPlat();
	    String platStr = userToPlat.getPlatsStr(userView.getId(),this);
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
	    //sbHql.append("order by  obj.equiCode asc");
	    return sbHql;
	}
	
	/**
	 * 导入功能
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	public String saveImportEquipment(HttpServletRequest request, File file) throws Exception {
		String importType = request.getParameter("importType");
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd");
        ExcelOperation excelOperation = new ExcelOperation();
        List<String[]> list = excelOperation.getImportData(file, 1);
        if(null==list || list.size()==0){
        	throw new Exception("导入的表格有效数据为空！");
        }else{
        	if (importType.equals("1")) {
				String delsql =  "delete from rpms_research_equipment ";
				this.executeSql(delsql, new Object[0]);
			}
        	ResearchEquipment re;
        	int d=2;
        	for(String[] obj:list){
        		d++;
        		String sql = "";
        		List listArray = new ArrayList();
        		re = new ResearchEquipment();
        		if(null==obj[0]){
        			continue;
        		}
        		
        		String organization = obj[0];//单位
        		if(StringUtils.isNotEmpty(organization)){
        			sql = "select id from itsm_organization t where t.name='"+organization.trim()+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				Organization org = new Organization();
        				org.setId(listArray.get(0).toString());
        				re.setOrganization(org);;
        			}else{
        				throw new Exception(organization+"单位不存在！");
        			}
        		}
        		
        		String platCenter = obj[1];//分中心
        		if(StringUtils.isNotEmpty(platCenter)){
        			sql = "select id from RPMS_RESEARCH_PLAT p where  p.PLAT_NAME ='"+platCenter+"' and p.parent is null";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				ResearchPlat plat = new ResearchPlat();
        				plat.setId(listArray.get(0).toString());
        				re.setPlatCenter(plat);
        			}else{
        				throw new Exception(platCenter+"分中心不存在！");
        			}
        		}
        		
        		String platInstitution = obj[2];//分中心机构
        		if(StringUtils.isNotEmpty(platInstitution)){
        			sql = "select id from RPMS_RESEARCH_PLAT p where  p.PLAT_NAME ='"+platInstitution+"' and p.parent='"+re.getPlatCenter().getId()+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				ResearchPlat plat = new ResearchPlat();
        				plat.setId(listArray.get(0).toString());
        				re.setPlatInstitution(plat);
        			}else{
        				throw new Exception(platInstitution+"分中心机构不存在！");
        			}
        		}
        		
        		String equiCode = obj[3];//设备编号
        		if(StringUtils.isEmpty(equiCode)){
        			throw new Exception("设备编号不能为空！");
        		}else{
        			sql = "select id from rpms_research_equipment p where  p.equi_code ='"+equiCode+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if (null != listArray && listArray.size() > 0) {
        				throw new Exception("设备编号已存在不能重复！");
					} else {
						re.setEquiCode(equiCode);
					}
        		}
        		String equiName = obj[4];//设备名称
        		if(StringUtils.isEmpty(equiName)){
        			throw new Exception("设备名称不能为空！");
        		}else{
        			re.setEquiName(equiName);
        		}
        		
        		String spec = obj[5];//型号
        		if(StringUtils.isNotEmpty(spec)){
        			re.setSpec(spec);
        		}
        		
        		String specialty = obj[6];//专业
        		if(StringUtils.isNotEmpty(specialty)){
        			sql = "select id from RPMS_SPECIALTY_DICTIONARY p where  p.SPECIALTY_NAME ='"+specialty+"' and p.parent is null";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				SpecialtyDictionary sd = new SpecialtyDictionary();
        				sd.setId(listArray.get(0).toString());
        				re.setSpecialty(sd);
        			}else{
        				throw new Exception(specialty+"专业不存在！");
        			}
        		}
        		
        		String business = obj[7];// 业务
        		if(StringUtils.isNotEmpty(business)){
        			sql = "select id from RPMS_SPECIALTY_DICTIONARY p where  p.SPECIALTY_NAME ='"+business+"' and p.parent ='"+re.getSpecialty().getId()+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				SpecialtyDictionary sd = new SpecialtyDictionary();
        				sd.setId(listArray.get(0).toString());
        				re.setBusiness(sd);
        			}else{
        				throw new Exception(business+"业务不存在！");
        			}
        		}
        		
        		String factory = obj[8];//生产厂家
        		if(StringUtils.isNotEmpty(factory)){
        			re.setFactory(factory);
        		}
        		
        		String purchaseTime = obj[9];//购置时间
        		if(StringUtils.isNotEmpty(purchaseTime)){
        			re.setPurchaseTime(purchaseTime);
        		}
        		
        		String manufactureDate = obj[10];//出厂日期
        		if(StringUtils.isNotEmpty(manufactureDate)){
        			re.setManufactureDate(purchaseTime);
        		}
        		
        		String assetFund = obj[11];//设备原值
        		if(StringUtils.isNotEmpty(assetFund)){
        			Double objDou = Double.parseDouble(assetFund.toString()) ;
        			re.setAssetFund(objDou);
        		}
        		
        		String equiStatus = obj[12];// 设备状态
        		if(StringUtils.isNotEmpty(equiStatus)){
        			sql = "select cl.item_value　from itsm_code c ,itsm_code_line cl "
        					+ " where c.id = cl.codeid and c.code = 'rpms_euqi_status' and cl.item_text='"+equiStatus+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				re.setEquiStatus(listArray.get(0).toString());
        			}else{
        				throw new Exception("设备状态"+equiStatus+"不存在！");
        			}
        		}
        		
        		String useStatus = obj[13];//使用状态
        		if(StringUtils.isNotEmpty(useStatus)){
        			sql = "select cl.item_value　from itsm_code c ,itsm_code_line cl "
        					+ " where c.id = cl.codeid and c.code = 'rpms_use_status' and cl.item_text='"+useStatus+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				re.setUseStatus(listArray.get(0).toString());
        			}else{
        				throw new Exception("使用状态"+useStatus+"不存在！");
        			}
        		}
        		re.setValid("1");
        		re.setCreateUser(userView.getUserName());
        		re.setCreateTime(new Date());
        		this.save(re);
        	}
        }
		return null;
	}


}
