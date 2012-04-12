package com.jije.boh.demo.jpa.repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;
import com.jije.boh.demo.domain.model.BascStore;

/**
 * Store CRUD repository
 * 
 * @author Paul.Yu
 */

@Transactional
public interface BascStoreRepository extends
		PagingAndSortingRepository<BascStore, String>,
		JpaSpecificationExecutor<BascStore> {

	@Transactional(readOnly = true)
	public BascStore findByXcompany(String xcompany);

	@Transactional(readOnly = true)
	public List<BascStore> findByXnameLike(String xname);

	@Transactional(readOnly = true)
	public List<BascStore> findByXnameIn(Collection<String> xnames);
	
	@Transactional(readOnly = true)
	public List<BascStore> findByXstatus(int xstatus);

	@Transactional(readOnly = true)
	public BascStore findByXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascStore> findByXplugininfo(String xplugininfo);

	@Transactional(readOnly = true)
	public List<BascStore> findByXstoreid(String xstoreid);

	@Transactional(readOnly = true)
	public List<BascStore> findByXcreateby(String xcreateby);

	@Transactional(readOnly = true)
	public List<BascStore> findByXinsertby(String xinsertby);

	@Transactional(readOnly = true)
	public List<BascStore> findByXcreatetime(Date xcreatetime);

	@Transactional(readOnly = true)
	public List<BascStore> findByXinserttime(Date xinserttime);

	@Transactional(readOnly = true)
	public List<BascStore> findByXlastupdatetime(Date xlastupdatetime);

	@Transactional(readOnly = true)
	public List<BascStore> findByXlastupdateby(String xlastupdateby);
}
