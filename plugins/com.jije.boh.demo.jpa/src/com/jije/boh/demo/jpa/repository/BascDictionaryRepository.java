package com.jije.boh.demo.jpa.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;
import com.jije.boh.demo.domain.model.BascDictionary;

/**
 * Dictionary CRUD repository
 * 
 * @author Paul.Yu
 */

@Transactional
public interface BascDictionaryRepository extends
		PagingAndSortingRepository<BascDictionary, String>,
		JpaSpecificationExecutor<BascDictionary> {

	@Transactional
	public BascDictionary findByXdicid(String xdicid);

	@Transactional
	public BascDictionary findByXname(String xname);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXstatus(int xstatus);

	@Transactional(readOnly = true)
	public BascDictionary findByXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXplugininfo(String xplugininfo);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXstoreid(String xstoreid);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXcreateby(String xcreateby);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXinsertby(String xinsertby);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXcreatetime(Date xcreatetime);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXinserttime(Date xinserttime);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXlastupdatetime(Date xlastupdatetime);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXlastupdateby(String xlastupdateby);

	@Transactional(readOnly = true)
	public List<BascDictionary> findByXparentid(String xparentid);
}
