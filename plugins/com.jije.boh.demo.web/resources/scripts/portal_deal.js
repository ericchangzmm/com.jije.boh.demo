(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_10.json",
        data: "基本参数=x",
        dataType: 'json',
        success: function(json)
        {
            chart = new Highcharts.Chart(
            {
                chart: 
                {
                    renderTo: 'p-deal-main',
                    defaultSeriesType: 'line'
                },
                title: 
                {
                    text: ' '
                },
                xAxis: 
                {
                    categories: json.categories
                },
                yAxis: 
                {
                    title: 
                    {
                        text: ' '
                    }
                },
                tooltip: 
                {
                    enabled: false,
                    formatter: function()
                    {
                        return '<b>' + this.series.name + '</b><br/>' +
                        this.x +
                        ': ' +
                        this.y +
                        '°C';
                    }
                },
                plotOptions: 
                {
                    line: 
                    {
                        dataLabels: 
                        {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [
                {
                    name: '预估交易次数',
                    data: json.prediction
                }, 
                {
                    name: '实际交易次数',
                    data: json.reality
                }]
            });
            //$(".highcharts-legend").attr("transform", "translate(35, 370)");
            $(".highcharts-legend rect").attr("stroke", "");
            $(".highcharts-legend path").each(function()
            {
                if ($(this).attr("stroke-width") != 0) 
                {
                    $(this).attr("d", "M -18 0 L -5 0").attr("stroke-width", "12");
                }
            });
            $(".p-main-btn").removeClass("none");            
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
    
})(window);
function lookinfo_deal()
{
    $(".p-portal-detailed").height("300").html("<div class='b-public-load'></div>");
    _$.colorbox.exec(
    {
        content: ".p-portal-detailed",
        title: "交易次数详情<label>日期：" + _$.getTime() + "</label>",
        move: 0
    });
    //发送数据请求
    $.ajax(
    {
        type: "GET",
        url: "data_11.json",
        data: "",
        dataType: 'json',
        success: function(json)
        {
            var table = document.createElement("table");
            table.className = "p-portal-detailed-table";
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);
            $(".p-portal-detailed").html("").append(table);
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var th = document.createElement("th");
            th.innerHTML = "时间";
            var th1 = document.createElement("th");
            th1.innerHTML = "预估";
            var th2 = document.createElement("th");
            th2.innerHTML = "实际";
            var th3 = document.createElement("th");
            th3.innerHTML = "差异百分比";
            tr.appendChild(th);
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            for (var i = 0; i < json.list.length; i++) 
			{
				var tr1 = document.createElement("tr");
				tbody.appendChild(tr1);
				var td = document.createElement("td");
				td.innerHTML = json.list[i].time;
				var td1 = document.createElement("td");
				if (json.list[i].isAmend) 
				{
					td1.innerHTML = "<label class='b-public-lower'>&nbsp;</label><label><input type='text' value='"+json.list[i].prediction+"'></label><label class='b-public-add'>&nbsp;</label>";
				}
				else 
					td1.innerHTML = json.list[i].prediction;
				var td2 = document.createElement("td");
				td2.innerHTML = json.list[i].reality;
				var td3 = document.createElement("td");
				td3.innerHTML = json.list[i].difference;
				tr1.appendChild(td);
				tr1.appendChild(td1);
				tr1.appendChild(td2);
				tr1.appendChild(td3);
			}
            $(".p-portal-detailed").append("<div class='p-bottom-btn'><span class='b-public-btn'>导出</span><span class='b-public-btn'>确定</span></div>").height("auto");
            
            setTimeout("_$.colorbox.load(1)", 100);
			
			//绑定加载事件
			$(".p-portal-detailed-table .b-public-lower").click(function()
			{
				var input = $("input",this.parentNode);
				var t = parseInt(input.val())-1;
				if(t<0)
					t= 0;
				input.val(t);
			});
			$(".p-portal-detailed-table .b-public-add").click(function()
			{
				var input = $("input",this.parentNode);
				var t = parseInt(input.val()) + 1;
				input.val(t);
			});
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
}
