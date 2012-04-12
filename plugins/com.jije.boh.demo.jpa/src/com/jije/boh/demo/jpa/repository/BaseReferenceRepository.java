package com.jije.boh.demo.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.jije.boh.demo.domain.model.BaseReference;

@Transactional
public interface BaseReferenceRepository extends
		CrudRepository<BaseReference, String> {

}
