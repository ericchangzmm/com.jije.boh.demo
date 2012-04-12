package com.jije.boh.demo.domain.model;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

/**
 * Sample JPA model class
 * 
 * @author Murphy
 */
@Entity
public class Account implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3340698550986830624L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	String id;

	double balance;

	@OneToOne(mappedBy = "account")
	Customer customer;

	@OneToMany(mappedBy = "account")
	@OrderBy("txTime")
	List<Transaction> txns;

	@Temporal(TemporalType.DATE)
	public Date dateCreated;

	/* Constructors */
	public Account() {
		dateCreated = new Date(System.currentTimeMillis());
	}

	public Account(Customer customer) {
		this();
		this.balance = 0;
		this.customer = customer;
		customer.setAccount(this);
		this.txns = new ArrayList<Transaction>();
	}

	/* Getters and setters */

	public double getBalance() {
		return balance;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<Transaction> getTxns() {
		return txns;
	}

	public void setTxns(List<Transaction> txns) {
		this.txns = txns;
	}

	public String toString() {
		return "Account(" + id + ", "
				+ ((customer != null) ? customer.getLastName() : "null")
				+ ", Balance: $" + balance + ")";
	}
}
