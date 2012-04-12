package com.jije.boh.demo.jpa.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;
import com.jije.boh.demo.domain.model.BascUser;

/**
 * Use CRUD repository
 * 
 * @author Paul.Yu
 */

@Transactional
public interface BascUserRepository extends
		PagingAndSortingRepository<BascUser, String>,
		JpaSpecificationExecutor<BascUser> {

	@Transactional(readOnly = true)
	public List<BascUser> findByXemployeeid(String xemployeeId);

	@Transactional(readOnly = true)
	public BascUser findByXloginname(String loginName);
	
	@Transactional(readOnly = true)
	public List<BascUser> findByXstatus(int xstatus);

	@Transactional(readOnly = true)
	public BascUser findByXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascUser> findByXplugininfo(String xplugininfo);

	@Transactional(readOnly = true)
	public List<BascUser> findByXstoreid(String xstoreid);

	@Transactional(readOnly = true)
	public List<BascUser> findByXcreateby(String xcreateby);

	@Transactional(readOnly = true)
	public List<BascUser> findByXinsertby(String xinsertby);

	@Transactional(readOnly = true)
	public List<BascUser> findByXcreatetime(Date xcreatetime);

	@Transactional(readOnly = true)
	public List<BascUser> findByXinserttime(Date xinserttime);

	@Transactional(readOnly = true)
	public List<BascUser> findByXlastupdatetime(Date xlastupdatetime);

	@Transactional(readOnly = true)
	public List<BascUser> findByXlastupdateby(String xlastupdateby);
}
