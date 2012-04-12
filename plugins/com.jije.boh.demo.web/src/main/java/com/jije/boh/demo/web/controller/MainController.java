/**
 * 
 */
package com.jije.boh.demo.web.controller;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jije.boh.demo.service.JsonService;
import com.jije.boh.demo.service.OperateServiceCore;
import com.jije.boh.demo.service.inter.IOperateServiceCore;

/**
 * @author Murphy
 */
@Controller
public class MainController {

	@RequestMapping("/index")
	public ModelAndView handleRequest(final HttpServletRequest request,
			final HttpServletResponse response) throws Exception {
		response.setHeader("Content-Type", "text/html; charset=utf-8");
		String returnCode = null;
		returnCode = ((OperateServiceCore) getService(IOperateServiceCore.class))
				.getHtml(request);
		if (!StringUtils.isEmpty(returnCode)) {
			if (!response.isCommitted()) {
				response.getWriter().write(returnCode);
			}
		}
		return null;
	}

	@RequestMapping("/ajax")
	public @ResponseBody
	String handleAjax(final HttpServletRequest request) throws Exception {
		Object returnCode = ((OperateServiceCore) getService(IOperateServiceCore.class))
				.getData(request);
		String result = null;
		if(returnCode instanceof String)
			result = (String)returnCode;
		else
			result = JsonService.getJsonDetail(returnCode);
		result = URLEncoder.encode(result, "UTF-8");
		return result;
	}

	private Object getService(Class<?> clazz) {
		BundleContext context = FrameworkUtil.getBundle(this.getClass())
				.getBundleContext();
		ServiceReference<?> serviceReference = context
				.getServiceReference(clazz.getName());
		return context.getService(serviceReference);
	}
	
}
