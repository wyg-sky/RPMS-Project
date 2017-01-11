package com.lion.rpms.innovate.innovateinstitution.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.lion.core.util.annotations.FieldProp;
import com.lion.core.util.annotations.ModelProp;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.common.model.AuditableSimpleEntity;
import com.lion.system.document.model.Document;
import com.lion.system.organization.model.Organization;

/**
 * @description ：创新制度管理Model
 * @date ： 2015-03-19 12:33:07
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_INNOVATE_INSTITUTION")
@ModelProp(symbol = "创新制度管理")
public class InnovateInstitution extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
    private String grade;  //级别
    private String type;  //文件类别
    private String fileName;  //文件名称
    private String publishDepartment;  //发布部门
    private String publishDate;  //发布时间
    private String revisePeriod;  //修订周期
    private String reviseDate;  //应修订时间
    private String num;  //编号
    private String valid;  //是否有效
    private Organization organization;  //组织单位
	private List<Document> documents = new ArrayList<Document>(); //文档附件
	
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_CENTER")
	@FieldProp(symbol = "分中心", desc = "")
	public ResearchPlat getPlatCenter() {
		return platCenter;
	}
	public void setPlatCenter(ResearchPlat platCenter) {
		this.platCenter = platCenter;
	}

	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "PLAT_INSTITUTION")
	@FieldProp(symbol = "分中心机构", desc = "")
	public ResearchPlat getPlatInstitution() {
		return platInstitution;
	}
	public void setPlatInstitution(ResearchPlat platInstitution) {
		this.platInstitution = platInstitution;
	}
	
    @Column(name = "GRADE")
	@FieldProp(symbol = "级别", desc = "")
    public String getGrade(){  
        return grade;  
    }
    
    public void setGrade(String grade){  
        this.grade = grade;  
    }
    @Column(name = "TYPE")
	@FieldProp(symbol = "文件类别", desc = "")
    public String getType(){  
        return type;  
    }
    
    public void setType(String type){  
        this.type = type;  
    }
    @Column(name = "FILE_NAME")
	@FieldProp(symbol = "文件名称", desc = "")
    public String getFileName(){  
        return fileName;  
    }
    
    public void setFileName(String fileName){  
        this.fileName = fileName;  
    }
    @Column(name = "PUBLISH_DEPARTMENT")
	@FieldProp(symbol = "发布部门", desc = "")
    public String getPublishDepartment(){  
        return publishDepartment;  
    }
    
    public void setPublishDepartment(String publishDepartment){  
        this.publishDepartment = publishDepartment;  
    }
    @Column(name = "PUBLISH_DATE")
	@FieldProp(symbol = "发布时间", desc = "")
    public String getPublishDate(){  
        return publishDate;  
    }
    
    public void setPublishDate(String publishDate){  
        this.publishDate = publishDate;  
    }
    @Column(name = "REVISE_PERIOD")
	@FieldProp(symbol = "修订周期", desc = "")
    public String getRevisePeriod(){  
        return revisePeriod;  
    }
    
    public void setRevisePeriod(String revisePeriod){  
        this.revisePeriod = revisePeriod;  
    }
    @Column(name = "REVISE_DATE")
	@FieldProp(symbol = "应修订时间", desc = "")
    public String getReviseDate(){  
        return reviseDate;  
    }
    
    public void setReviseDate(String reviseDate){  
        this.reviseDate = reviseDate;  
    }
    @Column(name = "NUM")
	@FieldProp(symbol = "编号", desc = "")
    public String getNum(){  
        return num;  
    }
    
    public void setNum(String num){  
        this.num = num;  
    }
    @Column(name = "VALID")
	@FieldProp(symbol = "是否有效", desc = "")
    public String getValid(){  
        return valid;  
    }
    
    public void setValid(String valid){  
        this.valid = valid;  
    }
	@ManyToOne(cascade = { CascadeType.REFRESH }, fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "ORGANIZATION")
	@FieldProp(symbol = "组织单位", desc = "")
    public Organization getOrganization(){  
        return organization;  
    }
    
    public void setOrganization(Organization organization){  
        this.organization = organization;  
    }
	
    @OneToMany(fetch=FetchType.LAZY, cascade={javax.persistence.CascadeType.ALL})
	@JoinColumn(name="DOC_FK")
	@OrderBy("createTime DESC")
	public List<Document> getDocuments() {
		return documents;
	}
	
	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}
	@Override
	public boolean equals(Object o) {
		return false;
	}

	@Override
	public int hashCode() {
		return 0;
	}
}
