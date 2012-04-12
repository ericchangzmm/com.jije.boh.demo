package com.jije.boh.demo.domain.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Job entity
 * @author Paul.Yu
 */


@Entity
@Table(name = "boh_bascjob")
public class BascJob extends BascBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4480874403107261171L;
	
	private String xname;
	
	private String xserialnumber;
	
	private boolean xishourly;
	
	@OneToMany(mappedBy = "bascjob")
	List<BascEmployee> employees;

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

	public boolean isXishourly() {
		return xishourly;
	}

	public void setXishourly(boolean xishourly) {
		this.xishourly = xishourly;
	}

	public List<BascEmployee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<BascEmployee> employees) {
		this.employees = employees;
	}


}
