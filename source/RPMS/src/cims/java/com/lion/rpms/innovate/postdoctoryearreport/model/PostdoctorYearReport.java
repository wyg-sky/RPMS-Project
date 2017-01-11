package com.lion.rpms.innovate.postdoctoryearreport.model;

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

/**
 * @description ：年报评估管理Model
 * @date ： 2015-05-11 17:22:42
 * @author ：周强
 */
@Entity
@Table(name = "RPMS_POSTDOCTOR_YEAR_REPORT")
@ModelProp(symbol = "年报评估管理")
public class PostdoctorYearReport extends AuditableSimpleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private ResearchPlat platCenter;	//分中心
	private ResearchPlat platInstitution;	//分中心机构
    private String fileName;  //文件名称
    private String summary;  //简介
    private String year;  //年度
    private String type;  //类型
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
    @Column(name = "FILE_NAME")
	@FieldProp(symbol = "文件名称", desc = "")
    public String getFileName(){  
        return fileName;  
    }
    
    public void setFileName(String fileName){  
        this.fileName = fileName;  
    }
    @Column(name = "SUMMARY")
	@FieldProp(symbol = "简介", desc = "")
    public String getSummary(){  
        return summary;  
    }
    
    public void setSummary(String summary){  
        this.summary = summary;  
    }
    @Column(name = "YEAR")
	@FieldProp(symbol = "年度", desc = "")
    public String getYear(){  
        return year;  
    }
    
    public void setYear(String year){  
        this.year = year;  
    }
    @Column(name = "TYPE")
	@FieldProp(symbol = "类型", desc = "")
    public String getType(){  
        return type;  
    }
    
    public void setType(String type){  
        this.type = type;  
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
