package com.jije.boh.demo.web;

import java.io.File;
import java.io.IOException;
import org.springframework.util.FileCopyUtils;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.apache.commons.lang.StringUtils;
import org.jruby.embed.osgi.utils.OSGiFileLocator;

import com.jije.boh.demo.domain.servlet.ServletConfig;

public class ResourcesServlet extends HttpServlet {

	/**
	 * e.g.
	 * http://localhost:8080/moduleresources/core.web/resources/images/b-help
	 * .png
	 */
	private static final long serialVersionUID = -6083748410705646721L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
		String url = req.getRequestURI();
		url = StringUtils.substringAfter(url,
				ServletConfig.PRE_URL_OF_RESOURCE_IN_BUNDLE);
		String[] paths = url.split("/");
		String symbolicName = ServletConfig.BUNDLE_SYMBOLIC_PREFIX + paths[1];
		String filepath = StringUtils.substringAfter(url, paths[1]);
		try {
			File file = OSGiFileLocator.getFileInBundle(symbolicName, filepath);
			Resource resource = new FileSystemResource(file);
			FileCopyUtils.copy(resource.getInputStream(),
					resp.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}
}
