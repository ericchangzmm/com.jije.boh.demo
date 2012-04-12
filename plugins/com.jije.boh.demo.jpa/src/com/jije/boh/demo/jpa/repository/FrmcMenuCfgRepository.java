package com.jije.boh.demo.jpa.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import com.jije.boh.demo.domain.model.FrmcMenuCfg;

/**
 * @author devin.liu
 * @since 2012 02 29
 * @version 1.0 description: FrmcMenuCfgRepository Repository
 * 
 **/
@Transactional
public interface FrmcMenuCfgRepository extends
		PagingAndSortingRepository<FrmcMenuCfg, String> {

	@Transactional
	public List<FrmcMenuCfg> findByXfldidLike(String xfldid);

}
