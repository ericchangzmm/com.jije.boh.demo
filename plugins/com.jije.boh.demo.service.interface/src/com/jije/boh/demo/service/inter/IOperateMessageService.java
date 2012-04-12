package com.jije.boh.demo.service.inter;

import com.jije.boh.demo.domain.dto.MenuDto;

public interface IOperateMessageService {
	public void serviceRegistered(MenuDto menuDto);

	public void serviceUnregistered(MenuDto menuDto);
}
