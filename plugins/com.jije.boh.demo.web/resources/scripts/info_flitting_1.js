(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_5_1.json",
        data: "基本参数=x",
        dataType: 'json',
        success: function(json)
        {		
			//数据加载          
		    $(".p-news-infotitle dt").html("<img src='" + json.icon + "' alt=''/>");
            $(".p-news-infotitle  .p-new-datetime").html(json.time);          
			$("#b-look-infos").attr("nodeid",json.id);        
            if (json.state == 4) 
			{
				$(".p-news-infotitle .p-left").html($(".p-news-infotitle .p-left").html() + json.restaurant);
				$(".p-news-infotitle .p-right").html($(".p-news-infotitle .p-right").html() + json.applicant);
			}
			else 
			{
				$(".p-news-infotitle .p-right").html($(".p-news-infotitle .p-right").html() + json.applicant);
				$(".p-news-infotitle .p-left").html($(".p-news-infotitle .p-left").html() + json.restaurant);   
			}
			$(".p-news-content").attr("id",json.id);		
			if (json.state == 0) 
			{
				for (var i = 0; i < json.list.length; i++) 
				{
					$(".p-news-table").append("<tr><td>" + json.list[i].name + "</td><td>" + json.list[i].unit + "</td><td>" + json.list[i].number + "</td><td><input parentid='" + json.list[i].id + "' type='text' value='请输入数量'></td></tr>");
				}
				$(".p-news-table input").live("focus", function()
				{
					this.style.color = "#333";
					this.style.border = "1px #00aeef solid";
					this.style.background = "";
					this.select();
				});
				//失去焦点
				$(".p-news-table input").live("blur", function()
				{
					if (this.value.length == 0 || isNaN(this.value)) 
					{
						this.style.border = "1px red solid";
						this.style.background = "#f18491";
						this.style.color = "red";
					}
					else 
					{
						this.style.border = "";
					}
				});
				//绑定表单提交事件				
				$("#p-flitting-sub-ok").click(function()
				{
					$("#p-news-actionForm").unbind("submit");
					$("#p-news-actionForm").submit(function()
					{
						clickDefinite();
						return false;
					});					
				});
				$("#p-flitting-sub-no").click(function()
				{
					$("#p-news-actionForm").unbind("submit");
					$("#p-news-actionForm").submit(function()
					{
						clickReject();
						return false;
					});					
				});
			}
			else 
			{
				for (var i = 0; i < json.list.length; i++) 
				{
					$(".p-news-table").append("<tr><td>" + json.list[i].name + "</td><td>" + json.list[i].unit + "</td><td>" + json.list[i].number + "</td><td>" + json.list[i].reality + "</td></tr>");
				}
				if (json.state == 1) 
					$(".p-news-btns").html("<label class='b-news-reject'>已拒绝</label>");
				else 
					$(".p-news-btns").html("<label class='b-news-reject'>已同意</label>");
			}
            
            //功能绑定
            $(".p-news-table tr:odd").addClass("p-tr-bg");          
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
})(window);
//同意
function clickDefinite()
{
    var input = $(".p-news-table input");
    for (var i = 0; i < input.length; i++) 
    {
        if (input[i].value.length == 0 || isNaN(input[i].value)) 
        {
            input[i].focus();
            return;
        }
    }    
    var arrValue = new Array();
    for (var i = 0; i < input.length; i++) 
    {
        arrValue[arrValue.length] = 
        {
            "id": $(input).attr("parentid"),
            "value": input.value
        };
    }
    alert("确认修改信息状态");
	public_load_ajax("#b-look-infos","html_3_3.json","基本参数=x");
}

//拒绝
function clickReject()
{
    alert("拒绝请求");
	public_load_ajax("#b-look-infos","html_3_2.json","基本参数=x");
	return false;
}