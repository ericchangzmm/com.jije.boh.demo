package com.jije.boh.demo.domain.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author devin.liu
 * @since 2012 02 28
 * @version 1.0 description: FrmcMenuCfg Bean name rule:fld+filed
 **/

@Entity
@Table(name = "boh_frmcmenucfg")
public class FrmcMenuCfg implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1382269854390755317L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	String xid;

	String xfldid;
	String xfldname;
	Double xorder;
	String xfldicon;
	String xfldparantid;
	String xfldlink;
	
	public String getXid() {
		return xid;
	}
	public void setXid(String xid) {
		this.xid = xid;
	}
	public String getXfldid() {
		return xfldid;
	}
	public void setXfldid(String xfldid) {
		this.xfldid = xfldid;
	}
	public String getXfldname() {
		return xfldname;
	}
	public void setXfldname(String xfldname) {
		this.xfldname = xfldname;
	}

	public Double getXorder() {
		return xorder;
	}
	public void setXorder(Double xorder) {
		this.xorder = xorder;
	}
	public String getXfldicon() {
		return xfldicon;
	}
	public void setXfldicon(String xfldicon) {
		this.xfldicon = xfldicon;
	}
	public String getXfldparantid() {
		return xfldparantid;
	}
	public void setXfldparantid(String xfldparantid) {
		this.xfldparantid = xfldparantid;
	}
	public String getXfldlink() {
		return xfldlink;
	}
	public void setXfldlink(String xfldlink) {
		this.xfldlink = xfldlink;
	}

}
