package com.jije.boh.demo.domain.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Dictionary entity
 * @author Paul.Yu
 */

@Entity
@Table(name = "boh_bascdictionary")
public class BascDictionary extends BascBase{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7094885509211768113L;

	private String xdicid;
	
	private boolean xisused;
	
	private String xname;
	
	private String xvalue;
	
	private double xorder;
	
	private String xparentid;

	public String getXdicid() {
		return xdicid;
	}

	public void setXdicid(String xdicid) {
		this.xdicid = xdicid;
	}

	public boolean isXisused() {
		return xisused;
	}

	public void setXisused(boolean xisused) {
		this.xisused = xisused;
	}

	public String getXname() {
		return xname;
	}

	public void setXname(String xname) {
		this.xname = xname;
	}

	public String getXvalue() {
		return xvalue;
	}

	public void setXvalue(String xvalue) {
		this.xvalue = xvalue;
	}

	public double getXorder() {
		return xorder;
	}

	public void setXorder(double xorder) {
		this.xorder = xorder;
	}

	public String getXparentid() {
		return xparentid;
	}

	public void setXparentid(String xparentid) {
		this.xparentid = xparentid;
	}
	
}
