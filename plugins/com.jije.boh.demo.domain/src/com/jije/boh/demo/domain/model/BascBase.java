package com.jije.boh.demo.domain.model;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

/**
 * Base Entity
 * @author Paul.Yu
 */

@MappedSuperclass
public class BascBase implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4241966808715709483L;
	
	@Id
	@Column(length = 32)
	@GeneratedValue(generator = "system-uuid")
	//@GenericGenerator(name = "system-uuid", strategy = "uuid")
	protected String xid = UUID.randomUUID().toString().replace("-", "");
	
	private int xstatus;
	
	private String xrefnumber;
	
	@Version
	private Long xversion;
	
	private String xplugininfo;
	
	@Column(insertable=true,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date xcreatetime=new Date();
	
	private String xcreateby;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date xinserttime=new Date();
	
	private String xinsertby;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date xlastupdatetime=new Date();
	
	private String xlastupdateby;
	
	private String xstoreid;

	public String getXid() {
		return xid;
	}

	public void setXid(String xid) {
		this.xid = xid;
	}

	public int getXstatus() {
		return xstatus;
	}

	public void setXstatus(int xstatus) {
		this.xstatus = xstatus;
	}

	public String getXrefnumber() {
		return xrefnumber;
	}

	public void setXrefnumber(String xrefnumber) {
		this.xrefnumber = xrefnumber;
	}

	public Long getXversion() {
		return xversion;
	}

	public void setXversion(Long xversion) {
		this.xversion = xversion;
	}

	public String getXplugininfo() {
		return xplugininfo;
	}

	public void setXplugininfo(String xplugininfo) {
		this.xplugininfo = xplugininfo;
	}

	public Date getXcreatetime() {
		return xcreatetime;
	}

	public void setXcreatetime(Date xcreatetime) {
		this.xcreatetime = xcreatetime;
	}

	public String getXcreateby() {
		return xcreateby;
	}

	public void setXcreateby(String xcreateby) {
		this.xcreateby = xcreateby;
	}

	public Date getXinserttime() {
		return xinserttime;
	}

	public void setXinserttime(Date xinserttime) {
		this.xinserttime = xinserttime;
	}

	public String getXinsertby() {
		return xinsertby;
	}

	public void setXinsertby(String xinsertby) {
		this.xinsertby = xinsertby;
	}

	public Date getXlastupdatetime() {
		return xlastupdatetime;
	}

	public void setXlastupdatetime(Date xlastupdatetime) {
		this.xlastupdatetime = xlastupdatetime;
	}

	public String getXlastupdateby() {
		return xlastupdateby;
	}

	public void setXlastupdateby(String xlastupdateby) {
		this.xlastupdateby = xlastupdateby;
	}

	public String getXstoreid() {
		return xstoreid;
	}

	public void setXstoreid(String xstoreid) {
		this.xstoreid = xstoreid;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
