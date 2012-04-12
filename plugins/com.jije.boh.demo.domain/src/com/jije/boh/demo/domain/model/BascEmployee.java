package com.jije.boh.demo.domain.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Employee entity
 * @author Paul.Yu
 */

@Entity
@Table(name = "boh_bascemployee")
public class BascEmployee extends BascBase{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -700353311759578753L;

	private String xfirstname;
	
	private String xlastname;
	
	private String xserialnumber;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date xbirthday=new Date();
	
	private String xgender;
	
	private int xage;
	
	private String xssn;
	
	private String xbascdictionarygroupid;
	
	@ManyToOne
	private BascJob bascjob;

	public String getXfirstname() {
		return xfirstname;
	}

	public void setXfirstname(String xfirstname) {
		this.xfirstname = xfirstname;
	}

	public String getXlastname() {
		return xlastname;
	}

	public void setXlastname(String xlastname) {
		this.xlastname = xlastname;
	}

	public String getXserialnumber() {
		return xserialnumber;
	}

	public void setXserialnumber(String xserialnumber) {
		this.xserialnumber = xserialnumber;
	}

	public Date getXbirthday() {
		return xbirthday;
	}

	public void setXbirthday(Date xbirthday) {
		this.xbirthday = xbirthday;
	}

	public String getXgender() {
		return xgender;
	}

	public void setXgender(String xgender) {
		this.xgender = xgender;
	}

	public int getXage() {
		return xage;
	}

	public void setXage(int xage) {
		this.xage = xage;
	}

	public String getXssn() {
		return xssn;
	}

	public void setXssn(String xssn) {
		this.xssn = xssn;
	}
	
	public BascJob getBascjob() {
		return bascjob;
	}

	public void setBascjob(BascJob bascjob) {
		this.bascjob = bascjob;
	}

	public String getXbascdictionarygroupid() {
		return xbascdictionarygroupid;
	}

	public void setXbascdictionarygroupid(String xbascdictionarygroupid) {
		this.xbascdictionarygroupid = xbascdictionarygroupid;
	}

}
