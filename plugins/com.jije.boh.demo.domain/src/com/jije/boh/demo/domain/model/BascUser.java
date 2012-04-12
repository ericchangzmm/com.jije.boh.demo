package com.jije.boh.demo.domain.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * User Entity
 * @author Paul.Yu
 */
@Entity
@Table(name = "boh_bascuser")
public class BascUser extends BascBase{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6995118872588144077L;

	private String xemployeeid;
	
	private String xloginname;
	
	private String xpassword;

	public String getXemployeeid() {
		return xemployeeid;
	}

	public void setXemployeeid(String xemployeeid) {
		this.xemployeeid = xemployeeid;
	}

	public String getXloginname() {
		return xloginname;
	}

	public void setXloginname(String xloginname) {
		this.xloginname = xloginname;
	}

	public String getXpassword() {
		return xpassword;
	}

	public void setXpassword(String xpassword) {
		this.xpassword = xpassword;
	}

}
