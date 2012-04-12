package com.jije.boh.demo.jpa.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import com.jije.boh.demo.domain.model.BascJob;

/**
 * Job CRUD repository
 * 
 * @author Paul.Yu
 */

@Transactional
public interface BascJobRepository extends
		PagingAndSortingRepository<BascJob, String>,
		JpaSpecificationExecutor<BascJob> {
	
	@Transactional(readOnly = true)
	public List<BascJob> findByXstatus(int xstatus);

	@Transactional(readOnly = true)
	public BascJob findByXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascJob> findByXplugininfo(String xplugininfo);

	@Transactional(readOnly = true)
	public List<BascJob> findByXstoreid(String xstoreid);

	@Transactional(readOnly = true)
	public List<BascJob> findByXcreateby(String xcreateby);

	@Transactional(readOnly = true)
	public List<BascJob> findByXinsertby(String xinsertby);

	@Transactional(readOnly = true)
	public List<BascJob> findByXcreatetime(Date xcreatetime);

	@Transactional(readOnly = true)
	public List<BascJob> findByXinserttime(Date xinserttime);

	@Transactional(readOnly = true)
	public List<BascJob> findByXlastupdatetime(Date xlastupdatetime);

	@Transactional(readOnly = true)
	public List<BascJob> findByXlastupdateby(String xlastupdateby);
}
