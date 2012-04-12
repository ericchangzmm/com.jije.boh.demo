package com.jije.boh.demo.domain.servlet;

public class ServletConfig {
	/**
	 * FreeMarker View Resolver use it.
	 */
	public static final String SYSTEM_ENCODING = "UTF-8";
	
	/**
	 * This static variable is for request mapping.
	 * So the request URL can be short.
	 * eg:
	 *     If a bundle(symbolic name: com.jije.boh.module.test) want to receive a request,  
	 *     so the request URL can be: /app/service/
	 *     and POST data: "module=module.test&controller={Controller_Name}&function={Funcation_Name}"
	 * see ActionServletHandler, DefaultServletMapping.
	 */
	public static final String BUNDLE_SYMBOLIC_PREFIX = "com.jije.boh.";
	
	/**
	 * 
	 */
	public static final String PRE_URL_OF_RESOURCE_IN_BUNDLE = "moduleresources";
	
	public static final String REQUEST_PARAMETER_MODULE_NAME = "module";
	
	public static final String REQUEST_PARAMETER_CONTROLLER_NAME = "controller";
	
	public static final String REQUEST_PARAMETER_FUNCTION_NAME = "function";
	
	public static final String REQUEST_PARAMETER_FOLDER_PATH_NAME = "folderpath";

	public static final String REQUEST_PARAMETER_TEMPLATE_NAME = "template";
	
	public static final String MODULE_CORE = BUNDLE_SYMBOLIC_PREFIX + "core";
	
	public static final String REQUEST_PARAMETER_NEED_DATA = "needdata";
	
//	public static final String MODULE_INVENTORY = BUNDLE_SYMBOLIC_PREFIX + "module.inventory";
}
