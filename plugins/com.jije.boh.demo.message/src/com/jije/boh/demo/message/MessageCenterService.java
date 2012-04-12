package com.jije.boh.demo.message;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jije.boh.demo.service.inter.IOperateService;
import com.jije.boh.demo.message.service.MessageHelperService;

@Component("messageService")
public class MessageCenterService implements IOperateService {

	@Autowired
	private MessageHelperService messageHelperService;

	@Override
	public Object getData(HttpServletRequest request) {
		String actionid = request.getParameter("actionid");
		if (StringUtils.equals(actionid, "getMsgList")) {
			return messageHelperService.getMsgList();
		}
		if (StringUtils.equals(actionid, "getMsgDetail")) {
			return messageHelperService.getMsgDetail(request);
		}

		if (StringUtils.equals(actionid, "ignoreAll")) {
			messageHelperService.ignoreAll();
			return "";
		}
		if (StringUtils.equals(actionid, "applicationMenu")) {
			return messageHelperService.getApplicationMenu();
		}
		return null;
	}

}
