/**
 * markPage 日历控件
 * @author henry
 * @version 1.0
 * @modify 2012-3-1
 */

(function()
{
	var date = {};
	date.addCss = true;
	date.time = "";
	date.clickTime = null;
	date.addNum = 0;
	date.txtTime = null;
	date.isOverTime = false;
	date.starTime = true;
	date.endTime = true;
	date.funObj = 0;
	date.showWeek = null;
	date.weekText = false;
	date.txtArray = ["#PARENTDATETIME"];
	/**
	 * 获取日期
	 * @param {Object} time
	 * @param {Object} thanTime
	 * @param {Object} year
	 * @param {Object} moth
	 * @param {Object} date
	 * @param {Object} hours
	 * @param {Object} minute
	 * @param {Object} second
	 * @param {Object} timeMode
	 */
	date.getTime = function(param)
	{	
		var myDate = new Date();		
		if (param) 
		{//带参日期修改	
			//是否时间对比
			if (param.thanTime) 
			{
				var time = Date.parse(param.time.replace(/-/g, '/'));
				var thanTime = Date.parse(param.thanTime.replace(/-/g, '/'));
				
				if (time < thanTime) 
				{ return -1; }
				else if (time == thanTime) 
				{ return 0; }
				else 
				{ return 1; }				
			}			
			if (param.time) 
			{
				myDate = new Date(Date.parse(param.time.replace(/-/g, '/')));
			}
			//年份
			if (param.year) 
			{
				myDate.setFullYear(param.year + myDate.getFullYear());
			}
			//月份
			if (param.month) 
			{
				myDate.setMonth(param.month + myDate.getMonth());
			}
			//日期改变
			if (param.date) 
			{
				myDate.setDate(param.date + myDate.getDate());
			}
			//小时改变
			if (param.hours) 
			{
				myDate.setHours(param.hours + myDate.getHours());
			}
			//分钟改变
			if (param.minute) 
			{
				myDate.setMinutes(param.minute + myDate.getMinutes());
			}
			//秒数改变
			if (param.second) 
			{
				myDate.setSeconds(param.second + myDate.getSeconds());
			}			
		}
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		var dateNow = myDate.getDate();
		var hours = myDate.getHours();
		var minute = myDate.getMinutes();
		var second = myDate.getSeconds();
		var unDate = year + "-" + month + "-" + dateNow;
		
		if (param) 
		{
			if (param.timeMode) 
			{
				unDate = "";
				if (param.timeMode.indexOf("YYYY") != -1) 
				{
					unDate = year + "";
				}
				if (param.timeMode.indexOf("MM") != -1) 
				{
					if (unDate == "") 
					{
						unDate = month + "";
					}
					else 
					{
						unDate += "-" + month;
					}
				}
				if (param.timeMode.indexOf("DD") != -1) 
				{
					if (unDate == "") 
					{
						unDate = dateNow + "";
					}
					else 
					{
						unDate += "-" + dateNow;
					}
				}
				if (param.timeMode.indexOf("hh") != -1) 
				{
					if (unDate == "") 
					{
						unDate = hours + "";
					}
					else 
					{
						unDate += " " + hours;
					}
				}
				if (param.timeMode.indexOf("mm") != -1) 
				{
					if (unDate == "") 
					{
						unDate = minute + "";
					}
					else 
					{
						unDate += ":" + minute;
					}
				}
				if (param.timeMode.indexOf("ss") != -1) 
				{
					if (unDate == "") 
					{
						unDate = second + "";
					}
					else 
					{
						unDate += ":" + second;
					}
				}
				if (unDate == "") 
				{
					unDate = year + "-" + month + "-" + dateNow;
				}
			}
		}
		var splitime = unDate.split("-");
		if (splitime.length == 3) 
		{
			var tonewDate = splitime[0];
			if (parseInt(splitime[1], 10) < 10) 
			{
				tonewDate += "-0" + splitime[1];
			}
			else 
			{
				tonewDate += "-" + splitime[1];
			}
			if (parseInt(splitime[2], 10) < 10) 
			{
				tonewDate += "-0" + splitime[2];
			}
			else 
			{
				tonewDate += "-" + splitime[2];
			}
			unDate = tonewDate;
		}
		return unDate;
	}
	/**
	 * 控制文本使用权限
	 * @param {Object} e 控制对象
	 */
	date.banOperate = function(e)
	{
		e.style.imeMode="disabled";
		e.onkeydown = function(e)
		{
            var keycode;
            if (window.ActiveXObject) 
            {
                event.returnValue = false;
            }
            else 
            {
                e.preventDefault();
            }
		}
		e.style.imeMode="disabled";
		e.oncontextmenu = function(){return false;}
		e.onselectstart = function(){return false;}
		e.setAttribute("isBind",true);
	}
	/**
	 * 控件执行入口
	 * @param {Object} param 参数对象
	 */
	date.exec = function(param)
	{		
		var txt = $(param.txtTime);
		if(txt.length == 0)
		{
			return;
		}
		else
		{
			txt = txt[0];
		}
		var rt = true;
		for(var i=0;i<date.txtArray.length;i++)
		{			
			if(date.txtArray[i] == param.txtTime)
			{
				rt = false;
			}				
		}
		if(rt)
		{
			date.txtArray.push(param.txtTime);
		}
		if (!txt.getAttribute("isBind")) 
		{
			date.banOperate(txt);//控制文本使用权限	
			$(txt).addClass("b-public-date-text");
		}
		var dateParent = $("#PARENTDATETIME");
		if (dateParent.length == 0) 
		{
			//创建
			var timeContent = document.createElement("div");
			timeContent.id = "PARENTDATETIME";
			timeContent.onselectstart = function()
			{
				return false;
			}
			document.body.appendChild(timeContent);
			var iframe = document.createElement("iframe");
			iframe.className = "if";
			timeContent.appendChild(iframe);
			var dateList = document.createElement("div");
			dateList.className = "date";
			timeContent.appendChild(dateList);
			var div_top = document.createElement("div");
			dateList.appendChild(div_top);
			div_top.className = "top";
			var goo = window._$.isCore("chrome") ? "Chrome_nextMonth" : "nextMonth";
			div_top.innerHTML = "<span class='lastMonthBg' id='date_lastSpan'>" +
			"<span class='lastMonth' ></span></span>" +
			"<h4 class='lastText' id='tbl_lastMonth_input'>xxxx年xx月</h4>" +
			"<span class='nextMonthBg' id='date_nextSpan'><span class='" +
			goo +
			"' ></span></span>" +
			"<h4 class='nextText' id='tbl_nextMonth_input'>xxxx年xx月</h4>";
			var math1 = document.createElement("div");
			math1.className = "contentTime1";
			math1.innerHTML = "<table cellspacing='0' cellpadding='0' id='tbl_lastMonth' border='0'><tbody><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></tbody></table><i class='monthBg' >1</i>";
			dateList.appendChild(math1);
			var math2 = document.createElement("div");
			math2.className = "contentTime2";
			math2.innerHTML = "<table cellspacing='0' cellpadding='0' id='tbl_nextMonth' border='0'><tbody><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></tbody></table><i class='monthBg'>12</i>";
			dateList.appendChild(math2);
			
			$("#date_lastSpan").click(function()
			{
				date.addNum -= 4;				
				date.addMonth("#tbl_lastMonth");
				date.addMonth("#tbl_nextMonth");
			});
			$("#date_nextSpan").click(function()
			{
				date.addMonth("#tbl_lastMonth");
				date.addMonth("#tbl_nextMonth");
			});
            $(document).bind("click", function(e)
            {
                var b = window._$.getTarget(window._$.getEvent(e));
                if (b.getAttribute("m") || $(b).hasClass("b-public-date-text")) 
                {
                    return;
                }
                window._$.toClick(e, date.txtArray);
            });
		}
		var coord = window._$.coord(txt);
		dateParent = $("#PARENTDATETIME").css({display:"block",top:(coord.top + coord.height + 2),left:coord.left});
		
        
		//设置默认初始时间
		if(txt.value.length != 10 && txt.value.length != 9)
		{
			date.time = date.getTime();
		}
		else
		{
			date.time = txt.value;
		}
		//设置月份
		if(param.getMonth || date.txtTime == txt)
		{
			date.time = date.clickTime;				
		}
		date.addNum = 0;
		
		date.txtTime = txt;//控件
		date.funObj = param.funObj;//函数
		if(param.isOverTime || param.isOverTime == true)
			date.isOverTime = param.isOverTime ? false : true;//是否显示过期时间
		date.starTime = param.starTime ? param.starTime : null;//开始时间
		date.endTime = param.endTime ? param.endTime : null;//结束时间
		date.showWeek = param.showWeek ? param.showWeek : null; //只显示的星期
		date.weekText = param.weekText ? param.weekText : false; // 是否显示选择日期为星期几
		date.addMonth("#tbl_lastMonth");		
		date.addMonth("#tbl_nextMonth");
	}
	/**
	 * 添加日历
	 */
	date.addMonth = function(id)
	{
		var table = $(id)[0];
		var input = $(id+"_input");
		var monthBg = $("i",table.parentNode);
		
		while (table.rows.length > 1) 
        {
            table.deleteRow(1);
        }
		if(!date.time || (date.time.length != 9 && date.time.length != 10))
		{
			date.time = date.getTime();
		}
		var guoTime = date.time.split("-")[0]+"-"+date.time.split("-")[1]+"-01";	
			
		var timetxt = date.getTime({time:guoTime, month:date.addNum});
		var top = timetxt.split("-");
		if(monthBg.length > 0)
		{
			//月份背景
			monthBg[0].innerHTML = parseInt(top[1],10);
		}
		input.html(top[0]+"年"+top[1]+"月");
		var execTime = top[0] +"-"+ top[1]+"-1";
		date.addNum++;
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
		if(nowday != 7)
		{
			 newTdNum = newTdNum + nowday;
		}
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
				newTd0.innerHTML = "  ";
				newTd0.className = "td02";
				var span = document.createElement("span");
				span.innerHTML = " ";
				span.className = "spanOut";
				newTd0.appendChild(span);
				continue;
			}
			else if (i > newTdNum) 
			{
				//添加本月最后一天的空白列
				var newTd0 = newTr.insertCell((i % 7) - 1);
				//设置列内容和属性
				newTd0.innerHTML = "  ";
				newTd0.className = "td02";
				var span = document.createElement("span");
				span.innerHTML = " ";
				span.className = "spanOut";
				newTd0.appendChild(span);
				continue;
			}
			else 
			{
				//添加列
				var newTd0 = newTr.insertCell((i % 7) - 1);
				//设置列内容和属性
				newTd0.className = "td01";
				var span = document.createElement("span");
				span.innerHTML = i - nowday;
				span.setAttribute("m",top[0]+"-"+top[1]);
				span.className = "spanOut";
				
				span.onmouseover = function()
				{
					this.className = "spanHover";
				};
				span.onmouseout = function()
				{
					this.className = "spanOut";
				};
				
				//获取今天日期给予特殊样式
				var addrt = false, addOverTime = false;
				var ol_Year = nowDate.getFullYear();
				var ol_Month = nowDate.getMonth();
				var ol_Day = nowDate.getDate();
				
				var nowTime = new Date();
				var now_Year = nowTime.getFullYear();
				var now_Month = nowTime.getMonth();
				var now_Day = nowTime.getDate();
				
				//判断是否是今天
				if (now_Year > ol_Year) 
				{
					addrt = true;
				}
				else if (now_Year == ol_Year) 
				{
					if (now_Month > ol_Month) 
					{
						addrt = true;
					}
					else if (now_Month == ol_Month) 
					{
						if (now_Day > (i - nowday)) 
						{
							addrt = true;
						}
					}
				}
				//结束日期
				if (date.endTime) 
				{
					var endDate = date.endTime.split('-');
					if (endDate.length > 0) 
					{
						if (parseInt(endDate[0]) < nowDate.getFullYear()) 
						{
							addrt = true;
						}
						else if (parseInt(endDate[0]) == nowDate.getFullYear()) 
						{
							if (parseInt(endDate[1], 10) < (nowDate.getMonth() + 1)) 
							{
								addrt = true;
							}
							else if (parseInt(endDate[1], 10) == (nowDate.getMonth() + 1)) 
							{
								if (parseInt(endDate[2], 10) < (i - nowday)) 
								{
									addrt = true;
								}
							}
						}
					}
				}
				//开始日期
				if (date.starTime) 
				{
					var startDate = date.starTime.split('-');
					if (startDate.length > 0) 
					{
						if (parseInt(startDate[0]) > nowDate.getFullYear()) 
						{
							addrt = true;
						}
						else if (parseInt(startDate[0]) == nowDate.getFullYear()) 
						{
							if (parseInt(startDate[1], 10) > (nowDate.getMonth() + 1)) 
							{
								addrt = true;
							}
							else 
							{
								if (parseInt(startDate[1], 10) == (nowDate.getMonth() + 1)) 
								{
									if (parseInt(startDate[2], 10) >= (i - nowday)) 
									{
										addrt = true;
									}
								}
							}
						}
					}
				}
				
				//绑定今天样式
				if (addrt && date.isOverTime) 
				{
					span.className = "spanOver";
					span.onmouseover = function()
					{
						this.className = "spanOver";
					};
					span.onmouseout = function()
					{
						this.className = "spanOver";
					};
				}
				else 
				{
					var ISSHOWWEEK = false;
					if(date.showWeek)
					{
						var weekDate = top[0]+"-"+top[1]+"-"+(i - nowday);
						weekDate =  new Date(Date.parse(weekDate.replace(/-/g, '/')));
						weekDate = weekDate.getDay();
						if(weekDate == 0)
							weekDate = 7;
						if(date.showWeek != weekDate)
							ISSHOWWEEK = true;
					}
					if (ISSHOWWEEK) 
					{
						span.className = "spanOver";
						span.onmouseover = function()
						{
							this.className = "spanOver";
						};
						span.onmouseout = function()
						{
							this.className = "spanOver";
						};
					}
					else 
					{
						span.onclick = function()
						{
							var m = this.getAttribute("m");
							date.clickTime = m + "-" + this.innerHTML;
							if (this.innerHTML.length == 1) 
							{
								date.clickTime = m + "-0" + this.innerHTML;
							}
							//设置选择的日期
							if (date.txtTime) 
							{
								if (date.weekText) 
								{
									date.txtTime.value = window._$.getTime(
									{
										time:date.clickTime,
										weekday:true
									});
								}
								else 
									date.txtTime.value = date.clickTime;
							}
							document.getElementById("PARENTDATETIME").style.display = "none";
							//判断是否有事件绑定
							if (date.funObj) 
							{
								date.funObj(date.clickTime);
							}
						};
					}
				}
				//绑定今天样式
				if (now_Year == ol_Year && now_Month == ol_Month && now_Day == (i - nowday)) 
				{
					span.className = "spanDay";
					span.onmouseout = function()
					{
						this.className = "spanDay";
					};
				}
				//绑定选择过的日期
				if (date.clickTime != null) 
				{
					var cliyear = date.clickTime.split("-")[0];
					var cliMonth = date.clickTime.split("-")[1];
					var cliDay = date.clickTime.split("-")[2];
					if (ol_Month + 1 == parseInt(cliMonth, 10) && i - nowday == parseInt(cliDay, 10) && ol_Year == parseInt(cliyear)) 
					{
						span.className = "clickDate";
						span.onmouseout = function()
						{
							this.className = "clickDate";
						};
					}
				}
				
				newTd0.appendChild(span);
			}
		}
	}
	
    if (window.DATEADDCSS != false) 
    {
        var css = document.createElement("link");
        css.href = "/moduleresources/core.web/resources/css/public_date.css";
        css.rel = "stylesheet";
        css.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(css);
    }
	
	if (!window._$.date) 
	{	
		if (!this._$) 
		{
			var _$ = {};
			this._$ = _$;
		}
		this._$.date = date;
	}
})();

