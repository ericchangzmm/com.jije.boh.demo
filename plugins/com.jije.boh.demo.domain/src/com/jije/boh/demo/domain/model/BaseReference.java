package com.jije.boh.demo.domain.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * base reference entity
 * @author Nancy.Zhou
 */

@Entity
@Table(name = "boh_bascreference")
public class BaseReference extends BascBase{

	/**
	 * 
	 */
	private static final long serialVersionUID = 547335278285123376L;
	
	private String xbasetable;
	
	private String xrelatedtable;
	
	private String xrelatedcolumn;

	public String getXbasetable() {
		return xbasetable;
	}

	public void setXbasetable(String xbasetable) {
		this.xbasetable = xbasetable;
	}

	public String getXrelatedtable() {
		return xrelatedtable;
	}

	public void setXrelatedtable(String xrelatedtable) {
		this.xrelatedtable = xrelatedtable;
	}

	public String getXrelatedcolumn() {
		return xrelatedcolumn;
	}

	public void setXrelatedcolumn(String xrelatedcolumn) {
		this.xrelatedcolumn = xrelatedcolumn;
	}

}
