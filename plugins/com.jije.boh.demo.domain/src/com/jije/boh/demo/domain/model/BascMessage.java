package com.jije.boh.demo.domain.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Message entity
 * 
 * @author Paul.Yu
 */

@Entity
@Table(name = "boh_bascmessage")
public class BascMessage extends BascBase {

	private static final long serialVersionUID = 669261577622242920L;

	// 目前为了演示
	/**
	 * 消息读取状态
	 */
	public static final String STATUS_READED = "readed";
	public static final String STATUS_NOT_READ = "notRead";

	/**
	 * 消息类型
	 */
	public static final String TYPE_FLITTING = "flitting";
	public static final String TYPE_FLITTING_VERIFY = "flitting_verify";
	public static final String TYPE_INFOS = "infos";

	private String xserialnumber;

	private String xtitle;

	private String xcontext;

	private String xsendemployeeid;

	@Temporal(TemporalType.TIMESTAMP)
	private Date xsendtime = new Date();

	private String xtostoreid;

	private String xbascdictionarystatusid;

	private String xbascdictionarytypeid;

	private String xrefid;

	public String getXserialnumber() {
		return xserialnumber;
	}

	public void setXserialnumber(String xserialnumber) {
		this.xserialnumber = xserialnumber;
	}

	public String getXtitle() {
		return xtitle;
	}

	public void setXtitle(String xtitle) {
		this.xtitle = xtitle;
	}

	public String getXcontext() {
		return xcontext;
	}

	public void setXcontext(String xcontext) {
		this.xcontext = xcontext;
	}

	public String getXsendemployeeid() {
		return xsendemployeeid;
	}

	public void setXsendemployeeid(String xsendemployeeid) {
		this.xsendemployeeid = xsendemployeeid;
	}

	public Date getXsendtime() {
		return xsendtime;
	}

	public void setXsendtime(Date xsendtime) {
		this.xsendtime = xsendtime;
	}

	public String getXtostoreid() {
		return xtostoreid;
	}

	public void setXtostoreid(String xtostoreid) {
		this.xtostoreid = xtostoreid;
	}

	public String getXbascdictionarystatusid() {
		return xbascdictionarystatusid;
	}

	public void setXbascdictionarystatusid(String xbascdictionarystatusid) {
		this.xbascdictionarystatusid = xbascdictionarystatusid;
	}

	public String getXbascdictionarytypeid() {
		return xbascdictionarytypeid;
	}

	public void setXbascdictionarytypeid(String xbascdictionarytypeid) {
		this.xbascdictionarytypeid = xbascdictionarytypeid;
	}

	public String getXrefid() {
		return xrefid;
	}

	public void setXrefid(String xrefid) {
		this.xrefid = xrefid;
	}
}
