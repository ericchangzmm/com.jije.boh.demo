package com.jije.boh.demo.service.inter;

import javax.servlet.http.HttpServletRequest;

public interface IOperateServiceCore {

	public String getHtml(HttpServletRequest request);

	public Object getData(HttpServletRequest request);
}