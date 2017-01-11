package com.lion.rpms.patent.patentapplication.manager.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.struts2.ServletActionContext;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.DateUtil;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.patent.patentapplication.manager.PatentApplicationManager;
import com.lion.rpms.patent.patentapplication.model.PatentApplication;
import com.lion.rpms.patent.patentapplication.model.PatentApplicationLine;
import com.lion.rpms.research.researchpatent.model.ResearchPatent;
import com.lion.rpms.research.researchpatent.model.ResearchPatentLine;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.document.model.Document;
import com.lion.system.user.model.UserView;

/**
 * @description ：专利申请管理业务实现类
 * @date ： 2015-03-10 13:19:19
 * @author ：周强
 */
public class PatentApplicationManagerImpl extends BusinessManagerImpl<PatentApplication, String> implements
		PatentApplicationManager {
	public PatentApplicationManagerImpl(GenericDao<PatentApplication, String> dao) {
		super(dao);
		this.setDataPower("500");
	}

	@Override
	public void accept(Object obj) {
		PatentApplication object = (PatentApplication) obj;
		PatentApplication pa = this.get(object.getId());
		pa.setAcceptDate(object.getAcceptDate());
		pa.setStatus("0005");//已受理
		pa.setPatentNum(object.getPatentNum());
		pa.setPublicExpense(object.getPublicExpense());
		pa.setApplicationFee(object.getApplicationFee());
	}

	@Override
	public void accredit(Object obj) throws Exception {
		PatentApplication patentApplication = (PatentApplication) obj;

		ResearchPatent patent =this.queryPatentByNum(patentApplication.getPatentNum());

		patent.setPlatCenter(patentApplication.getPlatCenter());//分中心
		patent.setPlatInstitution(patentApplication.getPlatInstitution());//分中心机构
		patent.setSpecialty(patentApplication.getSpecialty());//专业
		patent.setBusiness(patentApplication.getBusiness());//业务
		patent.setProjectId(patentApplication.getProjectId());//项目
		patent.setPatentName(patentApplication.getPatentName());// 专利名称
		patent.setNum(patentApplication.getNum());//自编码
		patent.setPatentNum(patentApplication.getPatentNum());//专利编号
		patent.setType(patentApplication.getType());
		patent.setAcceptDate(patentApplication.getAcceptDate());// 受理日期
		patent.setApplyDate(patentApplication.getApplyDate());//申请日期
		
		if(new Date().getTime() > DateUtil.StringToDate(patentApplication.getProtectDate()).getTime()){
			patent.setValid("0002");//保护到期
		} else {
			patent.setValid("0001");//保护中，
		}
		
		//patent.setPatenteeAddress(patentApplication.getPatenteeAddress());// 专利权人地址
		//patent.setTechnosphere(patentApplication.getTechnosphere());// 技术领域
		patent.setAbstracts(patentApplication.getAbstracts());// 摘要
		patent.setPatentee(patentApplication.getPatentee());// 专利权人
		patent.setProtectDate(patentApplication.getProtectDate());// 保护到期
		patent.setPrivilegeDate(patentApplication.getPrivilegeDate());// 授权日期
		patent.setPatentNum(patentApplication.getPatentNum());// 专利编号
		patent.setInvnetor(patentApplication.getInvnetor());//专利发明人
		patent.setPatentAnent(patentApplication.getPatentAnent());//专利代理
		
		patent.getResearchPatentLine().clear();
		for (PatentApplicationLine line : patentApplication.getPatentApplicationLines()) {
			ResearchPatentLine rLine = new ResearchPatentLine();
			rLine.setTalentId(line.getTalentId());
			patent.getResearchPatentLine().add(rLine);
		}
		patent.setOrganization(patentApplication.getOrganization());
		
//		patent.setDocuments(this.cloneDocuments(patentApplication.getDocuments()));
		
		//创建人，创建时间，修改人，修改时间
		UserView user = (UserView)ServletActionContext.getRequest().getSession().getAttribute(Constants.USER_VIEW);
		patent.setCreateUser(user.getUserName());
		patent.setModifyUser(user.getUserName());
		Date date = new Date();
		patent.setCreateTime(date);
		patent.setModifyTime(date);
		
		patent.setCost(patentApplication.getCost());//费用明细
		patent.setTotal(patentApplication.getTotal());//合计
		patent.setPublicExpense(patentApplication.getPublicExpense());//官费
		patent.setApplicationFee(patentApplication.getApplicationFee());//申请费
		patent.setRegFee(patentApplication.getRegFee());//登记费
		patent.setAnnualFee(patentApplication.getAnnualFee());//年费
		patent.setAnnualFeeSum(patentApplication.getAnnualFeeSum());//年费合计
		patent.setTaxes(patentApplication.getTaxes());//税费
		patent.setSpreadType("0001");//默认一般推广
		
		this.getCurrentSession().save(patent);
		String patentId = patent.getId();
		this.saveDocuments(patentApplication.getDocuments(),patentId);
		this.save(patentApplication);
	}
	
	private void saveDocuments(List<Document> list, String mainId){
		for(Document doucument:list){
			try {
				Document doc = (Document)BeanUtils.cloneBean(doucument);
				doc.setId(null);
				doc.setDocFk(mainId);
				this.getCurrentSession().save(doc);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	@SuppressWarnings("unused")
	private List<Document> cloneDocuments(List<Document> list){
		List<Document> docList = new ArrayList<Document>();
		for(Document doucument:list){
			try {
				Document doc = (Document)BeanUtils.cloneBean(doucument);
				doc.setId(null);
				docList.add(doc);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return docList;
	}

	/**
	 * 通过专利编号查询专利
	 * 
	 * @description :
	 * @date : 2015年3月20日上午11:23:50
	 * @author : 周强
	 * @param num
	 * @return : void
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private ResearchPatent queryPatentByNum(String num) throws Exception {
		String hql = "from ResearchPatent where patentNum = ?";
		List<ResearchPatent> list = (List<ResearchPatent>) this.executeQuery(hql, new Object[] { num });
		if (list == null || list.size() == 0) {
			return new ResearchPatent();
		} else {
			return list.get(0);
		}
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sb = super.genListConditionHql(request);
		Set<String> roleCodes = PlatCenterUtil.getCurrentRoleCodes();
		if(PlatCenterUtil.hasRoleCode(roleCodes, "ROLE_ADMIN")){
			return sb;
		} else if(PlatCenterUtil.hasRoleCode(roleCodes, "11","14","15","12","13")){  //分中心研究室  分中心办公室,分中心专家委员会，分中心技术委员会，研究所
			return sb;
		} else if(PlatCenterUtil.hasRoleCode(roleCodes, "PATENT_APPLICATION_APPROVAL")){  //专利申请审批权限帐号
			sb.append(" and obj.status in('0002','0003','0005','0007')");//已上报,审批通过,已受理,已批准
		}else if(PlatCenterUtil.hasRoleCode(roleCodes, "1","2")){  //技术、专家委员会，中心办公室
			sb.append(" and obj.status in('0003','0005','0007')");//审批通过,已受理,已批准
		}
		return sb;
	}
}
