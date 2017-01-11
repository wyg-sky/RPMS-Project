package com.lion.rpms.common.importtalent.manager.impl;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.JDBCUtil;
import com.lion.core.util.POIUtil;
import com.lion.core.util.StringUtils;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.researchtalent.model.ResearchTalent;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.common.importtalent.manager.TalentImportManager;
import com.lion.rpms.patent.patentapplication.model.PatentApplication;
import com.lion.system.codegenerator.manager.CodeGeneratorManager;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.department.model.Department;
import com.lion.system.organization.model.Organization;
import com.lion.system.role.model.Role;
import com.lion.system.user.model.User;

public class TalentImportManagerImpl extends BusinessManagerImpl<Object, String> implements TalentImportManager {
	JDBCUtil util = null;

	Connection con = null;

	private CodeGeneratorManager codeGeneratorManager;

	private Map<String,Organization> orgMap = new HashMap<String,Organization>();
	
	private Map<String,ResearchPlat> centerMap = new HashMap<String,ResearchPlat>();

	private String currentCode;

	public TalentImportManagerImpl(GenericDao<Object, String> dao) {
		super(dao);
	}

	@Override
	public String importTalent() throws Exception {
		return this.importTal();
	}

	/*
	 * 获取编码
	 */
	private String getCode(String className, String codeProperty, int length, String prefix) throws Exception {
		return this.codeGeneratorManager.genOrderCode(className, codeProperty, length, null, null);
	}
	/**
	 * @description : 转换单元格
	 * @date : 2013-11-13下午01:26:02
	 * @author : 周强
	 * @params : { Cell cell }
	 * @return : Object
	 */
	public Object getCellContent(Cell cell) {
		Object object = cell;
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		if (cell != null) {
			switch (cell.getCellType()) {
				case XSSFCell.CELL_TYPE_BLANK:
					object = "";
					break;
				case XSSFCell.CELL_TYPE_ERROR:
					object = "";
					break;
				case XSSFCell.CELL_TYPE_BOOLEAN:
					object = cell.getBooleanCellValue();
					break;
				case XSSFCell.CELL_TYPE_FORMULA:// 公式
					object = cell.getRichStringCellValue();
					break;
				case XSSFCell.CELL_TYPE_NUMERIC:
					if (DateUtil.isCellDateFormatted(cell)) {
						//object = cell.getDateCellValue();
						Date date = cell.getDateCellValue();
						object = sf.format(date);
					} else {
						object = Double.valueOf(cell.getNumericCellValue()).longValue();
					}
					break;
				case XSSFCell.CELL_TYPE_STRING:
					object = cell.getRichStringCellValue();
					break;
				default:
					object = cell;
			}
		} else {
			object = "";
		}
		return object;
	}


	public CodeGeneratorManager getCodeGeneratorManager() {
		return codeGeneratorManager;
	}

	public void setCodeGeneratorManager(CodeGeneratorManager codeGeneratorManager) {
		this.codeGeneratorManager = codeGeneratorManager;
	}
	
	/**
	 * 生成编码
	 * @description : 
	 * @date : 2015年5月15日上午11:48:08
	 * @author : 周强
	 * @param length
	 * @param prefix
	 * @return
	 * @throws Exception
	 * @return : String
	 */
	public String genOrderCode(int length, String prefix) throws Exception {
		String number = "";
		String maxStr = "";
		String minStr = "";
		String zeroStr = "";
		if (length > 0) {
			for (int i = 0; i < length; ++i) {
				maxStr = maxStr + "9";
				zeroStr = zeroStr + "0";
				if (i < length - 1) {
					minStr = minStr + "0";
				}
			}
			minStr = minStr + "1";
		} else {
			maxStr = "-1";
			minStr = "1";
			zeroStr = "0";
		}
		
		if (currentCode == null) {
			this.currentCode = this.getCode("ResearchTalent", "talentCode", 4, null);
			return currentCode;
		}

		String maxCode = this.currentCode;
		if ((maxCode != null) && (!(StringUtils.isEmpty(maxCode)))) {
			if ((prefix != null) && (maxCode.indexOf(prefix) >= 0)) {
				maxCode = maxCode.substring(prefix.length(), maxCode.length());
			}

			if (Long.parseLong(maxCode) == Long.parseLong(maxStr)) {
				maxCode = zeroStr;
			}

			number = String.valueOf(Long.parseLong(maxCode) + 1L);

			if (length > 0) {
				int num = length - number.length();
				for (int i = 0; i < num; ++i)
					number = "0" + number;
			}
		} else {
			number = minStr;
		}
		number = ((prefix == null) ? "" : prefix) + number;
		setMessage("{success : true, code : \"" + number + "\"}");
		this.currentCode = number;
		return number;
	}
	
	/**
	 * 获取单位
	 * @description : 
	 * @date : 2015年5月15日上午11:48:28
	 * @author : 周强
	 * @param name
	 * @return
	 * @return : Organization
	 */
	private Organization getOrg(String name){
		Organization org = orgMap.get(name);
		if(org != null){
			return org;
		}
		
		String hql = "from Organization where name = ?";
		List<Organization> orgs = null;
		try {
			 orgs = (List<Organization>)this.executeQuery(hql, new Object[]{name});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(orgs != null && orgs.size() > 0){
			orgMap.put(name, orgs.get(0));
			return orgs.get(0);
		}
		System.out.println(name+"不存在");
		throw new RuntimeException(name+"不存在");
	}
	
	
	private User createUser(){
		User user = new User();
		user.setIsEnabled("1");
		user.setIsExpired("0");
		user.setIsLocked("0");
		user.setIsBusy("0");
		user.setPassword("e10adc3949ba59abbe56e057f20f883e");
		user.setPasswordReal("123456");
		Organization organization = new Organization();
		organization.setId("8a819eb330e3c1320130e3cd61350001");
		Department dep = new Department();
		dep.setId("2c9ffa994143626f01414368212c0001");
		user.setDepartment(dep);
		user.setOrganization(organization);
		return user;
	}
	
	@SuppressWarnings("unchecked")
	private String checkLoginName(String loginname){
		String sql = "select loginName from itsm_user where loginName = ?";
		List<String> result = (List<String>)this.executeQuerySql(sql, new Object[]{loginname});
		if(result == null || result.size() == 0){
			return loginname;
		}
		
		return null;
	}
	
	@SuppressWarnings("unchecked")
	private Role getRole(String roleName) throws Exception{
		String hql ="from Role where name = ?";
		List<Role> roles =(List<Role>)this.executeQuery(hql, new Object[]{roleName});
		if(roles==null || roles.size() == 0){
			return null;
		}
		return roles.get(0);
	}
	
	
	/**
	 * 获取中心
	 * @description : 
	 * @date : 2015年5月6日下午3:51:39
	 * @author : 周强
	 * @param name
	 * @return
	 * @throws Exception
	 * @return : ResearchPlat
	 */
	private ResearchPlat getCenter(String name) throws Exception{
		if(name == null || name.equals("")){
			return null;
		}
		
		ResearchPlat center = centerMap.get(name);
		if(center != null){
			return center;
		}
		String hql = "from ResearchPlat where platName = ?";
		List<ResearchPlat> plats = (List<ResearchPlat>)this.executeQuery(hql, new Object[]{name});
		if(plats != null && plats.size() == 1 ){
			centerMap.put(name, plats.get(0));
			return plats.get(0);
		} else {
			throw new RuntimeException("分中心<"+name+">不存在");
		}
	}
	
	private Map<String,ResearchPlat> instMap = new HashMap<String,ResearchPlat>();
	/**
	 * 获取分中心机构
	 * @description : 
	 * @date : 2015年5月6日下午3:51:54
	 * @author : 周强
	 * @param center
	 * @param name
	 * @return
	 * @throws Exception
	 * @return : ResearchPlat
	 */
	private ResearchPlat getInstitution(ResearchPlat center,String name) throws Exception{
		ResearchPlat plat = instMap.get(center.getId()+name);
		if(plat != null){
			return plat;
		}
		String hql = "from ResearchPlat where parent.id = ? and platName = ?";
		List<ResearchPlat> plats = (List<ResearchPlat>)this.executeQuery(hql, new Object[]{center.getId(),name});
		if(plats != null && plats.size() == 1 ){
			instMap.put(center.getId()+name, plats.get(0));
			return plats.get(0);
		} else {
			throw new RuntimeException("<"+center.getPlatName()+"-"+name+">不存在或存在多个匹配值");
		}
	}
	
	
	private Map<String,String> codeMap = new HashMap<String,String>();
	
	/**
	 * 获取键值编码
	 * @description : 
	 * @date : 2015年5月6日下午12:05:53
	 * @author : 周强
	 * @param code 
	 * @param postName
	 * @return
	 * @return : String
	 */
	private String getCode(String code,String codeName){
		if("".equals(codeName) || null ==  codeName){
			return null;
		}
		System.out.println(code+"-"+codeName);
		String value = codeMap.get(code+"-"+codeName);
		if(value != null){
			return value;
		}
		String sql = "SELECT\n" +
				"	LINE.ITEM_VALUE\n" +
				"FROM\n" +
				"	ITSM_CODE_LINE line\n" +
				"LEFT JOIN ITSM_CODE code ON line.CODEID = CODE. ID\n" +
				"WHERE\n" +
				"	CODE.CODE = ?\n" +
				"AND LINE.ITEM_TEXT = ?";
		List<Object> objects = this.executeQuerySql(sql, new Object[]{code,codeName});
		if(objects == null || objects.size() == 0){
			throw new RuntimeException("<"+code+"-"+codeName+">未找到");
		}
		codeMap.put(code+"-"+codeName,objects.get(0).toString());
		return objects.get(0).toString();
	}
	
	
	/**
	 * 专利导入
	 */
	public String importPatentA() throws Exception {
		POIUtil excel = new POIUtil();
		String file = "E:/专利授权.xlsx";
		Workbook  book = excel.readWorkbook(file);
		Sheet sheet = excel.getSheet(book,4);
		int totalRows = sheet.getLastRowNum();
		
		for(int i=1;i<=totalRows;i++){
			System.out.println("行号："+(i+1));
			try {
				Row row = sheet.getRow(i);
				//ResearchPatent patent = new ResearchPatent();
				PatentApplication patent = new PatentApplication();
				patent.setStatus("0005"); //
				
				String patentName = this.getValue(sheet, row, "专利名称");//专利名称	
				patent.setPatentName(patentName);
				
				String patentNum =  this.getValue(sheet, row, "专利号");//专利号
				patent.setPatentNum(patentNum);
				
				String invnetor = this.getValue(sheet, row, "发明人");
				patent.setInvnetor(invnetor);
				
				String acceptDate = this.getValue(sheet, row, "受理日期");//受理日期
				String accreditDate = this.getValue(sheet, row, "授权日期");//授权日期
				patent.setAcceptDate(acceptDate);
				patent.setPrivilegeDate(accreditDate);
				
				String orgName = this.getValue(sheet, row, "单位");//单位
				Organization org = this.getOrg(orgName);
				patent.setOrganization(org);
				
				String center = this.getValue(sheet, row, "分中心");//单位
				patent.setPlatCenter(this.getCenter(center));
				
				String type= this.getValue(sheet, row, "专利类型");//类型
				patent.setType(this.getCode("rpms_patent_type", type));
				
				String cost = this.getValue(sheet, row, "费用明细");
				patent.setCost(cost);
				
				String total = this.getValue(sheet, row, "合计");
				patent.setTotal(total);
				
				String publicExpense= this.getValue(sheet, row, "官费");
				patent.setPublicExpense(publicExpense);
				
				String applicationFee = this.getValue(sheet, row, "申请费");
				patent.setApplicationFee(applicationFee);
				
				String regFee = this.getValue(sheet, row, "登记费");
				patent.setRegFee(regFee);
				
				String annualFee = this.getValue(sheet, row, "年费");
				patent.setAnnualFee(annualFee);
				
				String taxes = this.getValue(sheet, row, "税费");
				patent.setTaxes(taxes);
				
				
				this.save(patent);
				this.getCurrentSession().flush();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new RuntimeException("行号："+(i+1)+","+e.getMessage());
			}
			
		}
		
		return "成功";
	}
	
	private String getValue(Sheet sheet,Row row,String columnName){
		return getCellContent(row.getCell(this.getIndex(sheet,columnName))).toString();
	}
	
	/**
	 * 获取列名索引值
	 * @description : 
	 * @date : 2015年5月15日上午11:50:15
	 * @author : 周强
	 * @param sheet
	 * @param columnName
	 * @return
	 * @return : int
	 */
	private int getIndex(Sheet sheet,String columnName){
		Row row = sheet.getRow(0);
		int index = -1;
		for(int i=0;i<30;i++){
			String col = getCellContent(row.getCell(i)).toString();
			if(columnName.equals(col)){
				index = i;
				break;
			}
		}
		if(index == -1){
			System.out.println(columnName+"不存在");
			return 99;
		}
		
		return index;
		
	}
	
	private Map<String,SpecialtyDictionary> specialMap = new HashMap<String,SpecialtyDictionary>();
	
	/**
	 * 查询专业词典
	 * @description : 
	 * @date : 2015年5月15日上午11:50:41
	 * @author : 周强
	 * @param name
	 * @return
	 * @throws Exception
	 * @return : SpecialtyDictionary
	 */
	private SpecialtyDictionary getSpecial(String name) throws Exception{
		SpecialtyDictionary special = specialMap.get(name);
		if(special != null){
			return special;
		}
		String hql = "from SpecialtyDictionary where specialtyName = ? and parent is null";
		List<SpecialtyDictionary> plats = (List<SpecialtyDictionary>)this.executeQuery(hql, new Object[]{name});
		if(plats != null && plats.size() == 1 ){
			specialMap.put(name, plats.get(0));
			return plats.get(0);
		} else {
			throw new RuntimeException("<"+name+">不存在或存在多个匹配值");
		}
	}
	
	@Override
	public String importPatent() throws Exception {
		
		return importPatentA();
	}
	
	/**
	 * 导入人才
	 * @description : 
	 * @date : 2015年5月15日上午11:51:00
	 * @author : 周强
	 * @return
	 * @throws Exception
	 * @return : String
	 */
	private String importTal() throws Exception{
		POIUtil excel = new POIUtil();
		String file = "D:/迅雷下载/创新人才模板.xls";
		Workbook  book = excel.readWorkbook(file);
		Sheet sheet = excel.getSheet(book, 2);
		int totalRows = sheet.getLastRowNum();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for(int i=1;i<=totalRows;i++){
			System.out.println("行号："+(i+1));
			Row row = sheet.getRow(i);
			//PatentApplication patent = new PatentApplication();
			ResearchTalent talent = new ResearchTalent();
			
			String orgName = this.getValue(sheet, row, "单位");
			Organization org = this.getOrg(orgName);
			talent.setOrganization(org);
			
			String centerName = this.getValue(sheet, row, "分中心");
			ResearchPlat center = this.getCenter(centerName);
			talent.setPlatCenter(center);
			
			String institution = this.getValue(sheet, row, "分中心机构");
			ResearchPlat platInsit = this.getInstitution(center, institution);
			talent.setPlatInstitution(platInsit);
			
			String position = this.getValue(sheet, row, "研究室职务");
			talent.setPosition(this.getCode("rpms_institution_duty", position));
			
			String isSxpert = this.getValue(sheet, row, "是否专家");
			talent.setIsSxpert(this.getCode("rpms_is_sxpert", isSxpert));
			
			String specialty = this.getValue(sheet, row, "从事专业");
			talent.setSpecialty(this.getSpecial(specialty));
			
			String talentName = this.getValue(sheet, row, "姓名");
			talent.setTalentName(talentName);
			
			String sex = this.getValue(sheet, row, "性别");
			talent.setSex(this.getCode("cims_sex", sex));
			
			String birthDate = this.getValue(sheet, row, "出生年月");
			//System.out.println("出生年月"+birthDate);
			talent.setBirthDate(birthDate);
			
			String identyCard = this.getValue(sheet, row, "身份证号");
			talent.setIdentyCard(identyCard);
			
			String education = this.getValue(sheet, row, "学历");
			System.out.println(this.getCode("rpms_education", education));
			talent.setEducation(this.getCode("rpms_education", education));
			
			String graduationSchool = this.getValue(sheet, row, "毕业院校");
			talent.setGraduationSchool(graduationSchool);
			
			String discipline = this.getValue(sheet, row, "学科专业");
			talent.setDiscipline(discipline);
			
			String adminiPosition = this.getValue(sheet, row, "行政职务");
			talent.setAdminiPosition(adminiPosition);
			
			String title = this.getValue(sheet, row, "职称");
			talent.setTitle(this.getCode("rpms_title", title));
			
			String telephone = this.getValue(sheet, row, "联系方式");
			talent.setTelephone(telephone);
			
			String introduction = this.getValue(sheet, row, "人才简介");
			talent.setIntroduction(introduction);
			
			String academician = this.getValue(sheet, row, "院士");
			talent.setAcademician(this.getCode("rpms_academician", academician));
			
			String allowance = this.getValue(sheet, row, "是否享受津贴");
			talent.setAllowance(this.getCode("rpms_is_subsidy", allowance));
			
			String scholar = this.getValue(sheet, row, "学者");
			talent.setScholar(this.getCode("rpms_scholar", scholar));
			
			String talentType = this.getValue(sheet, row, "人才类型");
			String type = this.getCode("rpms_talent_type", talentType);
			if(type == null){
				type="0001";//默认内部
			}
			talent.setTalentType(type);
			
			String grade = this.getValue(sheet, row, "专家等级");
			talent.setGrade(this.getCode("rpms_grade", grade));
			
			String inDate = this.getValue(sheet, row, "进站时间");
			//System.out.println("进站时间"+inDate);
			talent.setBirthDate(inDate);
			
			String outDate = this.getValue(sheet, row, "出站时间");
			//System.out.println("出站时间"+outDate);
			talent.setBirthDate(outDate);
			
			String remark = this.getValue(sheet, row, "备注");
			talent.setRemark(remark);
			
			String talentCode = this.genOrderCode(4, null);
			talent.setTalentCode(talentCode);
			
			talent.setValid("1");
			
			this.getCurrentSession().save(talent);
			
			this.getCurrentSession().flush();
		}
		
		return "成功";
	}

	@Override
	public void importTelent() throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String importSysUser() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	

}
