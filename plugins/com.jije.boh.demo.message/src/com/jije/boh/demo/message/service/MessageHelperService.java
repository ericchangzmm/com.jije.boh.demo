package com.jije.boh.demo.message.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jije.boh.demo.domain.dto.MenuDto;
import com.jije.boh.demo.domain.dto.SimpleMessage;
import com.jije.boh.demo.domain.model.BascMessage;
import com.jije.boh.demo.domain.model.BascUser;
import com.jije.boh.demo.domain.model.FrmcMenuCfg;
import com.jije.boh.demo.jpa.repository.BascMessageRepository;
import com.jije.boh.demo.jpa.repository.BascUserRepository;
import com.jije.boh.demo.jpa.repository.FrmcMenuCfgRepository;

@Component("messageHelperService")
public class MessageHelperService {

	@Autowired
	public BascMessageRepository msgDao;

	@Autowired
	private FrmcMenuCfgRepository menuDao;

	@Autowired
	private BascUserRepository userDao;

	private List<MenuDto> menus = new ArrayList<MenuDto>();

	public Map<String, Object> getMsgList() {
		Map<String, Object> result = new HashMap<String, Object>();

		List<BascMessage> msgList = msgDao.findByStore("00001");
		List<SimpleMessage> list = new ArrayList<SimpleMessage>();
		SimpleMessage message = null;
		for (BascMessage bascMessage : msgList) {
			message = new SimpleMessage();
			message.setIcon("/moduleresources/demo.web/resources/images/b-list-icon-1.png");
			message.setId(bascMessage.getXid());
			message.setLink(bascMessage.getXbascdictionarytypeid());
			message.setRead(bascMessage.getXbascdictionarystatusid().equals(
					BascMessage.STATUS_NOT_READ) ? false : true);
			message.setText(bascMessage.getXtitle());
			message.setTime(bascMessage.getXsendtime());

			list.add(message);
		}

		result.put("value", list);
		return result;
	}

	public String getMsgDetail(HttpServletRequest request) {
		String id = request.getParameter("id");
		BascMessage bascMessage = msgDao.findOne(id);
		if(bascMessage.getXbascdictionarystatusid().equals(BascMessage.STATUS_NOT_READ)){
			bascMessage.setXbascdictionarystatusid(BascMessage.STATUS_READED);
			msgDao.save(bascMessage);
		}
		return bascMessage.getXcontext();
	}

	public void ignoreAll() {
		List<BascMessage> msgList = msgDao.findByStoreAndStatus("00001", BascMessage.STATUS_NOT_READ);
		for(BascMessage message : msgList)
			message.setXbascdictionarystatusid(BascMessage.STATUS_READED);
		msgDao.save(msgList);
	}

	public Map<String, Object> getApplicationMenu() {
		BascUser currentUser = findCurrentUser();

		Iterable<FrmcMenuCfg> listMenu = new ArrayList<FrmcMenuCfg>();
		if (menus.size() < 1) {
			listMenu = menuDao.findAll();
		}
		// remove the menu which had removed from the system.
		for (FrmcMenuCfg menu : listMenu) {
			MenuDto menuDto = new MenuDto();
			menuDto.setIcon(menu.getXfldicon());
			menuDto.setLink(menu.getXfldlink());
			menuDto.setName(menu.getXfldname());
			menuDto.setSequence(menu.getXorder());
			menuDto.setSymbolicName(menu.getXfldid());
			menus.add(menuDto);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("menu", menus);
		map.put("userName", currentUser.getXloginname());
		map.put("userId", currentUser.getXid());
		map.put("infoId", "3");
		map.put("infoNumber", msgDao.countByStoreAndStatus("00001",
				BascMessage.STATUS_NOT_READ));
		return map;
	}

	private BascUser findCurrentUser() {
		BascUser user = userDao.findByXloginname("current");
		if (user == null)
			user = userDao.findByXloginname("wangmengxiang");
		return user;
	}

}
