package com.jije.boh.demo.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.jruby.embed.osgi.utils.OSGiFileLocator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.jije.boh.demo.domain.servlet.ServletConfig;
import com.jije.boh.demo.service.inter.IOperateService;
import com.jije.boh.demo.service.inter.IOperateServiceCore;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/*
 * @author Murphy
 */

@Component("operateServiceCore")
public class OperateServiceCore implements IOperateServiceCore {
	@Autowired
	private FreeMarkerConfigurer freeMarkerConfigurer;

	public String getHtml(final HttpServletRequest request) {

		String symbolicName = request
				.getParameter(ServletConfig.REQUEST_PARAMETER_MODULE_NAME);
		String folderPath = request
				.getParameter(ServletConfig.REQUEST_PARAMETER_FOLDER_PATH_NAME);
		String templateName = request
				.getParameter(ServletConfig.REQUEST_PARAMETER_TEMPLATE_NAME);
		String needdata = request
				.getParameter(ServletConfig.REQUEST_PARAMETER_NEED_DATA);
		if (!StringUtils.isEmpty(symbolicName)) {
			symbolicName = ServletConfig.BUNDLE_SYMBOLIC_PREFIX + symbolicName;
		} else {
			symbolicName = "com.jije.boh.core.web";
		}

		if (StringUtils.isEmpty(folderPath)) {
			folderPath = "resources/templates";
		}

		if (StringUtils.isEmpty(templateName)) {
			templateName = "index.ftl";
		}
		
		Object data=new Object();
		if(!StringUtils.isEmpty(needdata)){
			data = getHtmlData(request);
		}		
		String str = getHtml(symbolicName, folderPath, templateName, data);
		return str;
	}

	/*
	 * eq. File file = OSGiFileLocator.getFileInBundle( "com.jije.boh.core.web",
	 * "WEB-INF/ftl"); configuration.setDirectoryForTemplateLoading(file);
	 * Template template = configuration.getTemplate("hello.ftl");
	 */
	public String getHtml(String symbolicName, String folderPath,
			String templateName, Object data) {
		try {
			Configuration configuration = getConfiguration();
			File file = OSGiFileLocator.getFileInBundle(symbolicName,
					folderPath);
			configuration.setDirectoryForTemplateLoading(file);
			Template template = configuration.getTemplate(templateName);
			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			Writer out = new OutputStreamWriter(byteArrayOutputStream);
			template.process(data, out);
			out.flush();
			String result = new String(byteArrayOutputStream.toByteArray(),
					"UTF-8");
			out.close();
			return result;
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		return null;
	}

	private Configuration getConfiguration() {
		Configuration configuration = freeMarkerConfigurer.getConfiguration();
		return configuration;
	}
	/*
	 * eq. puName = com.jije.boh.core.service filter:
	 * {com.jije.boh.core.service.
	 * inter.IOperateService}={org.springframework.osgi
	 * .bean.name=operateService, Bundle-SymbolicName=com.jije.boh.core.service,
	 * Bundle-Version=1.0.0.qualifier, service.id=76}
	 */
	public Object getHtmlData(final HttpServletRequest request){
		String symbolicName = request
				.getParameter(ServletConfig.REQUEST_PARAMETER_MODULE_NAME);
		if (StringUtils.isEmpty(symbolicName)) {
			symbolicName = "com.jije.boh.core.service";
		} else {
			symbolicName=StringUtils.substringBeforeLast(symbolicName,".")+".service";
			symbolicName = ServletConfig.BUNDLE_SYMBOLIC_PREFIX + symbolicName;
		}
		IOperateService operateService = (IOperateService) getServiceReference(
				Activator.getContext(), symbolicName);
		return operateService.getData(request);
	}
	/*
	 * eq. puName = com.jije.boh.core.service filter:
	 * {com.jije.boh.core.service.
	 * inter.IOperateService}={org.springframework.osgi
	 * .bean.name=operateService, Bundle-SymbolicName=com.jije.boh.core.service,
	 * Bundle-Version=1.0.0.qualifier, service.id=76}
	 */
	public Object getData(final HttpServletRequest request) {
		// Todo
		String symbolicName = request
				.getParameter(ServletConfig.REQUEST_PARAMETER_MODULE_NAME);
		if (StringUtils.isEmpty(symbolicName)) {
			symbolicName = "com.jije.boh.demo.service";
		} else {
			symbolicName = ServletConfig.BUNDLE_SYMBOLIC_PREFIX + symbolicName;
		}
		IOperateService operateService = (IOperateService) getServiceReference(
				Activator.getContext(), symbolicName);
		return operateService.getData(request);
	}

	private Object getServiceReference(BundleContext context,
			String symbolicName) {
		String filter = "(Bundle-SymbolicName=" + symbolicName + ")";
		ServiceReference[] refs = null;
		try {
			refs = context.getServiceReferences(
					IOperateService.class.getName(), filter);
		} catch (InvalidSyntaxException e) {
			e.printStackTrace();
		}
		return context.getService(refs[0]);
	}
}
