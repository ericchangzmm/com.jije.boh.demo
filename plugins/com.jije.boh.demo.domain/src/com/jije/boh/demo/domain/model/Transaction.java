package com.jije.boh.demo.domain.model;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Calendar;

/**
 * JPA Sample class
 * 
 * @author Murphy
 */
@Entity
@Table(name = "ACCT_TXN")
@NamedQuery(name = "Transaction.findAllSince", query = "SELECT t FROM Transaction t WHERE t.account = :account AND t.txTime >= :dateArg")
public class Transaction implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1460395723914485001L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	String id;

	@ManyToOne
	Account account;

	@Column(name = "OP")
	TxOperation operation;

	double amount;

	@Temporal(TemporalType.TIME)
	Date txTime;

	/* Constructors */
	public Transaction() {
		super();
	}

	public Transaction(Account account, TxOperation operation, double amount) {
		super();
		this.account = account;
		account.getTxns().add(this);
		this.operation = operation;
		this.amount = amount;
		this.txTime = Calendar.getInstance().getTime();
	}

	/* Getters and setters */

	public Account getAccount() {
		return account;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public TxOperation getOperation() {
		return operation;
	}

	public void setOperation(TxOperation operation) {
		this.operation = operation;
	}

	public Date getTxTime() {
		return txTime;
	}

	public void setTxTime(Date txTime) {
		this.txTime = txTime;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String toString() {
		return "(" + txTime + " - " + "Acct#: " + account.getId() + " "
				+ operation.toString() + ": " + amount + ")";
	}
}
