package com.jije.boh.demo.domain.servlet;

/**
 * @author Chris.Wu
 *
 */
public class ConstID {
	public final static int CORE_CORE 		= 10;
	
	public final static int MODULE_INVENTORY 		= 51;
	public final static int MODULE_FINANCE			= 52;
	public final static int MODULE_STORE			= 53;
	public final static int MODULE_PRODUCT			= 54;
	public final static int MODULE_HR				= 55;
	public final static int MODULE_EMPLOYEE			= 56;
	public final static int MODULE_FORECAST			= 57;
	public final static int MODULE_DASHBOARD		= 58;
	public final static int MODULE_ITPLATFORM		= 59;
	
	//库存
	public final static int INVENTORY_COUNT			= 511;
	public final static int INVENTORY_OVERSHORT		= 512;
	public final static int INVENTORY_TRANSFORM		= 513;
	
	public final static int INVENTORY_COUNT_FREQ					= 51101;
	public final static int INVENTORY_COUNT_COUNT					= 51102;
	public final static int INVENTORY_OVERSHORT_ANALYSE				= 51201;
	public final static int INVENTORY_TRANSFORM_APPLY				= 51301;
	public final static int INVENTORY_TRANSFORM_SHEET				= 51302;
	
	//财务
	public final static int FINANCE_CASH			= 521;
	
	public final static int FINANCE_CASH_CASHIER					= 52101;
	public final static int FINANCE_CASH_DAILYSUMMARY				= 52102;
	public final static int FINANCE_CASH_CHANGEFUND					= 52103;
	public final static int FINANCE_CASH_MONTHLY_CHANGEFUND			= 52104;
	
	//餐厅信息
	public final static int STORE_DAILY				= 531;
	
	public final static int STORE_DAILY_WEATHER						= 53101;
	public final static int STORE_DAILY_STOREACTIVITY				= 53102;
	public final static int STORE_DAILY_CRISIS						= 53103;
	
	//生产
	public final static int PRODUCT_MPC				= 541;
	
	public final static int PRODUCT_MPC_PRODUCTSETTING				= 54101;
	public final static int PRODUCT_MPC_MPCINIT						= 54102;
	
	//人力资源
	public final static int HR_SCHEDULE	= 551;
	
	public final static int HR_SCHEDULE_SCHEDULESETTING				= 55101;
	public final static int HR										= 55102;
	public final static int HR_SCHEDULE_SCHEDULE					= 55103;
	
	//自助平台
	public final static int EMPLOYEE_MESSAGE		= 561;
	public final static int EMPLOYEE_QUERY			= 562;
	public final static int EMPLOYEE_ONLINE			= 563;
	
	public final static int EMPLOYEE_MESSAGE_SCHEDULEMESSAGE		= 56101;
	public final static int EMPLOYEE_QUERY_SCHEDULEQUERY			= 56201;
	public final static int EMPLOYEE_ONLINE_LEAVE					= 56301;
	
	//预估
	public final static int FORECAST_FORECAST		= 571;
	
	public final static int FORECAST_FORECAST_SALE					= 57101;
	public final static int FORECAST_FORECAST_TTC					= 57102;
}
