package com.jije.boh.demo.domain.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Store entity
 * @author Paul.Yu
 */

@Entity
@Table(name = "boh_bascstore")
public class BascStore extends BascBase{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 289267739767497180L;

	private String xorgid;
	
	private String xname;
	
	private String xserialnumber;
	
	private String xcompany;
	
	private String xcity;
	
	private String xphonenumber;
	
	private String xaddress;
	
	private String xbascdictionarytypeid;
	
	private String xbascdictionarygroupid;
	
	private String xparentid;
	
	private String xstorelevel;

	public String getXorgid() {
		return xorgid;
	}

	public void setXorgid(String xorgid) {
		this.xorgid = xorgid;
	}

	public String getXname() {
		return xname;
	}

	public void setXname(String xname) {
		this.xname = xname;
	}

	public String getXserialnumber() {
		return xserialnumber;
	}

	public void setXserialnumber(String xserialnumber) {
		this.xserialnumber = xserialnumber;
	}

	public String getXcompany() {
		return xcompany;
	}

	public void setXcompany(String xcompany) {
		this.xcompany = xcompany;
	}

	public String getXcity() {
		return xcity;
	}

	public void setXcity(String xcity) {
		this.xcity = xcity;
	}

	public String getXphonenumber() {
		return xphonenumber;
	}

	public void setXphonenumber(String xphonenumber) {
		this.xphonenumber = xphonenumber;
	}

	public String getXaddress() {
		return xaddress;
	}

	public void setXaddress(String xaddress) {
		this.xaddress = xaddress;
	}

	public String getXbascdictionarytypeid() {
		return xbascdictionarytypeid;
	}

	public void setXbascdictionarytypeid(String xbascdictionarytypeid) {
		this.xbascdictionarytypeid = xbascdictionarytypeid;
	}

	public String getXbascdictionarygroupid() {
		return xbascdictionarygroupid;
	}

	public void setXbascdictionarygroupid(String xbascdictionarygroupid) {
		this.xbascdictionarygroupid = xbascdictionarygroupid;
	}

	public String getXparentid() {
		return xparentid;
	}

	public void setXparentid(String xparentid) {
		this.xparentid = xparentid;
	}

	public String getXstorelevel() {
		return xstorelevel;
	}

	public void setXstorelevel(String xstorelevel) {
		this.xstorelevel = xstorelevel;
	}
	
}
