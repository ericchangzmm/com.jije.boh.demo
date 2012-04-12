package com.jije.boh.demo.jpa.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;
import com.jije.boh.demo.domain.model.BascEmployee;

/**
 * Employee CRUD repository
 * 
 * @author Paul.Yu
 */

@Transactional
public interface BascEmployeeRepository extends
		PagingAndSortingRepository<BascEmployee, String>,
		JpaSpecificationExecutor<BascEmployee> {

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXbascdictionarygroupid(String id);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByBascjobXnameLike(String name);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByBascjobXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXstatus(int xstatus);

	@Transactional(readOnly = true)
	public BascEmployee findByXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXplugininfo(String xplugininfo);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXstoreid(String xstoreid);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXcreateby(String xcreateby);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXinsertby(String xinsertby);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXcreatetime(Date xcreatetime);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXinserttime(Date xinserttime);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXlastupdatetime(Date xlastupdatetime);

	@Transactional(readOnly = true)
	public List<BascEmployee> findByXlastupdateby(String xlastupdateby);
	
}
