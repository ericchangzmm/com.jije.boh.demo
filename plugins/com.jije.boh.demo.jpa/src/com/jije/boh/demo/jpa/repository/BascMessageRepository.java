package com.jije.boh.demo.jpa.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;
import com.jije.boh.demo.domain.model.BascMessage;

/**
 * Message CRUD repository
 * 
 * @author Paul.Yu
 */

@Transactional
public interface BascMessageRepository extends
		PagingAndSortingRepository<BascMessage, String>,
		JpaSpecificationExecutor<BascMessage> {

	@Transactional(readOnly = true)
	public List<BascMessage> findByXstatus(int xstatus);

	@Transactional(readOnly = true)
	public BascMessage findByXrefnumber(String xrefnumber);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXplugininfo(String xplugininfo);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXstoreid(String xstoreid);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXcreateby(String xcreateby);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXinsertby(String xinsertby);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXcreatetime(Date xcreatetime);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXinserttime(Date xinserttime);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXlastupdatetime(Date xlastupdatetime);

	@Transactional(readOnly = true)
	public List<BascMessage> findByXlastupdateby(String xlastupdateby);
	
	@Transactional(readOnly = true)
	@Query("select msg from BascMessage msg where msg.xtostoreid = ?1 and msg.xbascdictionarystatusid = ?2 order by msg.xsendtime desc")
	public List<BascMessage> findByStoreAndStatus(String storeid, String status);
	
	@Transactional(readOnly = true)
	@Query("select count(msg.xid) from BascMessage msg where msg.xtostoreid = ?1 and msg.xbascdictionarystatusid = ?2 ")
	public Long countByStoreAndStatus(String storeid, String status);
	
	@Transactional(readOnly = true)
	@Query("select msg from BascMessage msg where msg.xtostoreid = ?1 order by msg.xsendtime desc")
	public List<BascMessage> findByStore(String storeid);
}
