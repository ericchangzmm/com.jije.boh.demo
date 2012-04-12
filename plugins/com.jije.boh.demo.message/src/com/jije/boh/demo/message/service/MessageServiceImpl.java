package com.jije.boh.demo.message.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jije.boh.demo.domain.dto.MenuDto;
import com.jije.boh.demo.domain.model.FrmcMenuCfg;
import com.jije.boh.demo.jpa.repository.FrmcMenuCfgRepository;
import com.jije.boh.demo.service.inter.IOperateMessageService;

@Component("messageServiceImpl")
public class MessageServiceImpl implements IOperateMessageService{
	@Autowired
	private FrmcMenuCfgRepository menuDao;

	public void serviceRegistered(MenuDto menuDto) {
		String bundleSymbolicName = menuDto.getSymbolicName();
		List<FrmcMenuCfg> menuList = menuDao
				.findByXfldidLike(bundleSymbolicName);
		if (menuList.size() > 0) {
			menuDao.delete(menuList);
		}
		// 将bunlde相关信息插入到数据库;
		FrmcMenuCfg frmcMenuCfg = new FrmcMenuCfg();
		frmcMenuCfg.setXfldicon(menuDto.getIcon());
		frmcMenuCfg.setXfldname(menuDto.getName());
		frmcMenuCfg.setXfldid(bundleSymbolicName);
		frmcMenuCfg.setXfldlink(menuDto.getLink());
		System.out.println("************begin sava data****************");
		menuDao.save(frmcMenuCfg);
		System.out.println("************sava  data over****************");
	}

	public void serviceUnregistered(MenuDto menuDto) {
		String bundleSymbolicName = menuDto.getSymbolicName();
		List<FrmcMenuCfg> menuList = menuDao
				.findByXfldidLike(bundleSymbolicName);
		menuDao.delete(menuList);
	}
}
