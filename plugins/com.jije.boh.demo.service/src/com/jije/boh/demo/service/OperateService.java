package com.jije.boh.demo.service;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.jije.boh.demo.jpa.repository.BascUserRepository;
import com.jije.boh.demo.service.inter.IOperateService;

@Component("operateService")
public class OperateService implements IOperateService {

	@Autowired
	private BascUserRepository userDao;
		
	@Override
	public Object getData(HttpServletRequest request) {

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("date", userDao.count());
		return data;
	}

}
