/**
 * markPage 日历控件
 * @author henry
 * @version 1.0
 * @modify 2012-3-1
 */
(function()
{
    var maxdate = {};
    maxdate.time = "";
    maxdate.addNum = 0;
    maxdate.isOverTime = true;
    maxdate.clickTime = null;
    /**
     * 控件执行入口
     * @param {Object} param 参数对象
     */
    maxdate.exec = function(param)
    {
        var time = window._$.getTime({month:maxdate.addNum})
		
		$.ajax(
        {
            type: "GET",
            url: "/moduleresources/module.inventory.web/resources/scripts/json/stock/data_check.json",
            data: "dateTime:"+time,
            dataType: 'json',
            success: function(json)
            {
//			//乱码处理,后台请将dataType设为空
//			json = decodeURIComponent(json);
//			json = eval("(" + value + ")");
				maxdate.addMonth(json.list);
            },
            error: function(e)
            {
                alert("Err!");
            }
        });
    }
    /**
     * 添加日历
     */
    maxdate.addMonth = function(list)
    {
        var table = $(".b-max-table-content")[0];
        while (table.rows.length > 1) 
        {
            table.deleteRow(1);
        }
        if (!maxdate.time || (maxdate.time.length != 9 && maxdate.time.length != 10)) 
        {
            maxdate.time = window._$.getTime();
        }
        var guoTime = maxdate.time.split("-")[0] + "-" + maxdate.time.split("-")[1] + "-01";
        var timetxt = window._$.getTime(
        {
            time: guoTime,
            month: maxdate.addNum
        });
        var top = timetxt.split("-");
        $(".b-max-year").html(top[0] + "年");
        $(".b-max-month").html(top[1] + "月");
        
        var execTime = top[0] + "-" + top[1] + "-1";
        maxdate.addNum++;
        var nowDate = new Date(Date.parse(execTime.replace(/-/g, '/')));
        // 获取是星期几
        var nowday = nowDate.getDay();
        // 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        nowDate.setMonth(nowDate.getMonth() + 1);
        // 将日期设置为0
        nowDate.setDate(0);
        // 返回当月的天数			   
        var allDayNum = nowDate.getDate(0);
        var newTr;
        var newTdNum = allDayNum;
        if (nowday != 7) 
        {
            newTdNum = newTdNum + nowday;
        }
		$(".b-max-next,.b-max-last").unbind();
        $(".b-max-next").click(function()
        {
            window._$.maxdate.exec();
        });
        $(".b-max-last").click(function()
        {
            window._$.maxdate.addNum -= 2;
            window._$.maxdate.exec();
        });
        for (var i = 1; i <= 42; i++) 
        {
            if (i == 1 || i == 8 || i == 15 || i == 22 || i == 29 || i == 36) 
            {
                //添加一行
                newTr = table.insertRow(table.rows.length);
            }
            if (nowday != 7 && i <= nowday) 
            {
                //添加本月1号前的空白列
                var newTd0 = newTr.insertCell((i % 7) - 1);
                //设置列内容和属性
                newTd0.innerHTML = "&nbsp;";
                continue;
            }
            else if (i > newTdNum) 
            {
                //添加本月最后一天的空白列
                var newTd0 = newTr.insertCell((i % 7) - 1);
                //设置列内容和属性
                newTd0.innerHTML = "&nbsp;";
                continue;
            }
            else 
            {
                var nday = new Date();
                nday.setDate(i - nowday);
				nday.setMonth(top[1]);
                //添加列
                var newTd0 = newTr.insertCell((i % 7) - 1);
                //设置列内容和属性
                var dayindex = (i - nowday);
                //节日计算
                var festival = "";
                var timetext = top[1] + "-" + dayindex;
                var hntext = maxdate.RunGLNL(nday);
                switch (timetext)
                {
                    case "01-1":
                        festival = "元旦";
                        break;
                    case "02-14":
                        festival = "情人节";
                        break;
                    case "03-8":
                        festival = "妇女节";
                        break;
                    case "03-15":
                        festival = "消费者权益日";
                        break;
                    case "04-5":
                        festival = "清明节";
                        break;
                    case "05-1":
                        festival = "劳动节";
                        break;
                    case "05-4":
                        festival = "青年节";
                        break;
                    case "06-1":
                        festival = "儿童节";
                        break;
                    case "09-10":
                        festival = "教师节";
                        break;
                    case "10-1":
                        festival = "国庆节";
                        break;
                    case "12-24":
                        festival = "平安夜";
                        break;
                    case "12-25":
                        festival = "圣诞节";
                        break;
                }
                
                switch (hntext)
                {
                    case "正月初一":
                        festival = "春节";
                        break;
                    case "正月十五":
                        festival = "元宵节";
                        break;
                    case "五月初五":
                        festival = "端午节";
                        break;
                    case "八月十五":
                        festival = "中秋节";
                        break;
                    case "九月初九":
                        festival = "重阳节";
                        break;
                    case "腊月三十":
                        festival = "除夕";
                        break;
                }
                
                var dl = document.createElement("dl");
                var dt = document.createElement("dt");
                dt.innerHTML = dayindex + "<label>" + festival + "</label>";
                dl.setAttribute("m", top[0] + "-" + top[1]);
                dl.appendChild(dt);
                var dd = document.createElement("dd");
                if (list[(i - nowday) - 1] && list[(i - nowday) - 1].length > 0) 
                {
                    for (var p = 0; p < list[(i - nowday) - 1].length; p++) 
                    {
                        switch (list[(i - nowday) - 1][p].type)
                        {
                            case "day":
                                if (list[(i - nowday) - 1][p].state == -1) 
                                {
                                    dd.innerHTML += "<span node='日盘' class='b-day-account1' onclick='publicAccount(1,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                if (list[(i - nowday) - 1][p].state == 0) 
                                {
                                    dd.innerHTML += "<span node='日盘' class='b-day-account2' onclick='publicAccount(1,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                if (list[(i - nowday) - 1][p].state == 1) 
                                {
                                    dd.innerHTML += "<span node='日盘' class='b-day-account' onclick='publicAccount(1,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                break;
                            case "week":
                                if (list[(i - nowday) - 1][p].state == -1) 
                                {
                                    dd.innerHTML += "<span node='周盘' class='b-week-account1' onclick='publicAccount(2,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                if (list[(i - nowday) - 1][p].state == 0) 
                                {
                                    dd.innerHTML += "<span node='周盘' class='b-week-account2' onclick='publicAccount(2,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                if (list[(i - nowday) - 1][p].state == 1) 
                                {
                                    dd.innerHTML += "<span node='周盘' class='b-week-account' onclick='publicAccount(2,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                break;
                            case "month":
                                if (list[(i - nowday) - 1][p].state == -1) 
                                {
                                    dd.innerHTML += "<span node='月盘' class='b-month-account1' onclick='publicAccount(3,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                if (list[(i - nowday) - 1][p].state == 0) 
                                {
                                    dd.innerHTML += "<span node='月盘' class='b-month-account2' onclick='publicAccount(3,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                if (list[(i - nowday) - 1][p].state == 1) 
                                {
                                    dd.innerHTML += "<span node='月盘' class='b-month-account' onclick='publicAccount(3,\""+top[0]+"-"+top[1]+"-"+(i - nowday)+"\")'></span>";
                                }
                                break;
                        }
                    }
                }
                
                dl.appendChild(dd);
                
                //获取今天日期给予特殊样式
                var addrt = false, addOverTime = false;
                var ol_Year = nowDate.getFullYear();
                var ol_Month = nowDate.getMonth();
                var ol_Day = nowDate.getDate();
                
                var nowTime = new Date();
                var now_Year = nowTime.getFullYear();
                var now_Month = nowTime.getMonth();
                var now_Day = nowTime.getDate();
                
                
                //绑定今天样式
                if (now_Year == ol_Year && now_Month == ol_Month && now_Day == (i - nowday)) 
                {
                    dl.className = "b-now-day";
                }
                
                
                newTd0.appendChild(dl);
            }
        }
    }
    
    maxdate.RunGLNL = function(now)
    {
        return maxdate.CnMonthofDate(now) + maxdate.CnDayofDate(now);
    }
    
    maxdate.DaysNumberofDate = function(DateGL)
    {
        return parseInt((Date.parse(DateGL) - Date.parse(DateGL.getFullYear() + "/1/1")) / 86400000) + 1;
    }
    
    maxdate.CnDateofDate = function(DateGL)
    {
        var CnData = new Array(0x16, 0x2a, 0xda, 0x00, 0x83, 0x49, 0xb6, 0x05, 0x0e, 0x64, 0xbb, 0x00, 0x19, 0xb2, 0x5b, 0x00, 0x87, 0x6a, 0x57, 0x04, 0x12, 0x75, 0x2b, 0x00, 0x1d, 0xb6, 0x95, 0x00, 0x8a, 0xad, 0x55, 0x02, 0x15, 0x55, 0xaa, 0x00, 0x82, 0x55, 0x6c, 0x07, 0x0d, 0xc9, 0x76, 0x00, 0x17, 0x64, 0xb7, 0x00, 0x86, 0xe4, 0xae, 0x05, 0x11, 0xea, 0x56, 0x00, 0x1b, 0x6d, 0x2a, 0x00, 0x88, 0x5a, 0xaa, 0x04, 0x14, 0xad, 0x55, 0x00, 0x81, 0xaa, 0xd5, 0x09, 0x0b, 0x52, 0xea, 0x00, 0x16, 0xa9, 0x6d, 0x00, 0x84, 0xa9, 0x5d, 0x06, 0x0f, 0xd4, 0xae, 0x00, 0x1a, 0xea, 0x4d, 0x00, 0x87, 0xba, 0x55, 0x04);
        var CnMonth = new Array();
        var CnMonthDays = new Array();
        var CnBeginDay;
        var LeapMonth;
        var Bytes = new Array();
        var I;
        var CnMonthData;
        var DaysCount;
        var CnDaysCount;
        var ResultMonth;
        var ResultDay;
        var yyyy = DateGL.getFullYear();
        var mm = DateGL.getMonth() + 1;
        var dd = DateGL.getDate();
        if (yyyy < 100) 
            yyyy += 1900;
        if ((yyyy < 1997) || (yyyy > 2020)) 
        {
            return 0;
        }
        Bytes[0] = CnData[(yyyy - 1997) * 4];
        Bytes[1] = CnData[(yyyy - 1997) * 4 + 1];
        Bytes[2] = CnData[(yyyy - 1997) * 4 + 2];
        Bytes[3] = CnData[(yyyy - 1997) * 4 + 3];
        if ((Bytes[0] & 0x80) != 0) 
        {
            CnMonth[0] = 12;
        }
        else 
        {
            CnMonth[0] = 11;
        }
        CnBeginDay = (Bytes[0] & 0x7f);
        CnMonthData = Bytes[1];
        CnMonthData = CnMonthData << 8;
        CnMonthData = CnMonthData | Bytes[2];
        LeapMonth = Bytes[3];
        for (I = 15; I >= 0; I--) 
        {
            CnMonthDays[15 - I] = 29;
            if (((1 << I) & CnMonthData) != 0) 
            {
                CnMonthDays[15 - I]++;
            }
            if (CnMonth[15 - I] == LeapMonth) 
            {
                CnMonth[15 - I + 1] = -LeapMonth;
            }
            else 
            {
                if (CnMonth[15 - I] < 0) 
                {
                    CnMonth[15 - I + 1] = -CnMonth[15 - I] + 1;
                }
                else 
                {
                    CnMonth[15 - I + 1] = CnMonth[15 - I] + 1;
                }
                if (CnMonth[15 - I + 1] > 12) 
                {
                    CnMonth[15 - I + 1] = 1;
                }
            }
        }
        DaysCount = maxdate.DaysNumberofDate(DateGL) - 1;
        if (DaysCount <= (CnMonthDays[0] - CnBeginDay)) 
        {
            if ((yyyy > 1901) && (maxdate.CnDateofDate(new Date((yyyy - 1) + "/12/31")) < 0)) 
            {
                ResultMonth = -CnMonth[0];
            }
            else 
            {
                ResultMonth = CnMonth[0];
            }
            ResultDay = CnBeginDay + DaysCount;
        }
        else 
        {
            CnDaysCount = CnMonthDays[0] - CnBeginDay;
            I = 1;
            while ((CnDaysCount < DaysCount) && (CnDaysCount + CnMonthDays[I] < DaysCount)) 
            {
                CnDaysCount += CnMonthDays[I];
                I++;
            }
            ResultMonth = CnMonth[I];
            ResultDay = DaysCount - CnDaysCount;
        }
        if (ResultMonth > 0) 
        {
            return ResultMonth * 100 + ResultDay;
        }
        else 
        {
            return ResultMonth * 100 - ResultDay;
        }
    }
    
    maxdate.CnMonthofDate = function(DateGL)
    {
        var CnMonthStr = new Array("零", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊");
        var Month;
        Month = parseInt(maxdate.CnDateofDate(DateGL) / 100);
        if (Month < 0) 
        {
            return "闰" + CnMonthStr[-Month] + "月";
        }
        else 
        {
            return CnMonthStr[Month] + "月";
        }
    }
    
    maxdate.CnDayofDate = function(DateGL)
    {
        var CnDayStr = new Array("零", "初一", "初二s", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十");
        var Day;
        Day = (Math.abs(maxdate.CnDateofDate(DateGL))) % 100;
        return CnDayStr[Day];
    }
    
    
    if (!this._$) 
    {
        var _$ = {};
        this._$ = _$;
    }
    this._$.maxdate = maxdate;
})();

var _stockAccount = null;
function publicAccount(type, date)
{
	//type 为类型 1（日盘） 2（周盘） 3（月盘）
	//date 时间 格式（2012-12-12）
	switch(type){
		case 1:
			public_load_ajax(".b-mian-content","/app/index","module=module.inventory.web&template=html_dailycheck.ftl&needdata=a&type=" + type + "&date=" + date + "&actionid=20305");//日盘表 查看与编辑
			break;
		case 2:		
			public_load_ajax(".b-mian-content", "/app/index", "module=module.inventory.web&template=html_weekcheck.ftl&needdata=a&type=" + type + "&date=" + date + "&actionid=20305");//周盘表 查看与编缉
			break;
		case 3:		
			public_load_ajax(".b-mian-content", "/app/index", "module=module.inventory.web&template=html_monthcheck.ftl&needdata=a&type=" + type + "&date=" + date + "&actionid=20305");//月盘表 查看与编缉
			break;
		default:
			break;
	}
	_stockAccount  = date;
}
