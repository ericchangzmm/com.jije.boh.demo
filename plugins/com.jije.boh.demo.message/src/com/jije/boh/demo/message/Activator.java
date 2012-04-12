package com.jije.boh.demo.message;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.util.tracker.ServiceTracker;
import org.osgi.service.prefs.PreferencesService;
import org.osgi.service.prefs.Preferences;

public class Activator implements BundleActivator {

	private ServiceTracker tracker;
	private PreferencesService service;
	private static final String BOH = "jijesoft"; //NON-NLS-1
	
	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext context) throws Exception {
		tracker = new ServiceTracker(context, PreferencesService.class.getName(), null);
		tracker.open();
		
		// grab the service
		service = (PreferencesService) tracker.getService();
		Preferences preferences = service.getSystemPreferences();
		
		preferences.put(BOH, "BOH");
		
		System.out.println("Hi, starting... " + preferences.get(BOH, "")); 
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext context) throws Exception {
		// clean up
		tracker.close();
		tracker = null;
		
		service = null;
	}

}
