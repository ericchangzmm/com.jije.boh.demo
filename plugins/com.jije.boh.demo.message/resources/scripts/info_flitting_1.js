var ftlpath = "/app/index";
var ajaxpath = "/app/ajax";
(function(window)
{
	mark = "";
	if(window.messageMark)
	{
		mark = window.messageMark;
		window.messageMark = null;
	}
    $.ajax(
    {
        type: "POST",
//        url: "/moduleresources/core.message/resources/scripts/json/data_flitting.json",
//        data: "parameter=x",
        url: ajaxpath,
        data: "module=core.message&actionid=getMsgDetail&id=" + mark,
        dataType: '',
        success: function(json)
        {		
			//乱码处理,后台请将dataType设为空
			json = decodeURIComponent(json);
			json = eval("(" + json + ")");
			
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
						this.style.background = "#fbe2e2";
						this.style.color = "red";
					}
					else 
					{
						this.style.border = "";
					}
				});
								
				
				$("#p-flitting-sub-ok").click(function()
				{
					$("#p-news-actionForm").attr("action", "/app/index?module=core.message&template=html_flitting_yes.ftl");				
				});
				$("#p-flitting-sub-no").click(function()
				{
					$("#p-news-actionForm").attr("action", "/app/index?module=core.message&template=html_flitting_no.ftl");					
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
           $(".b-reckon-mas").html("数据格式异常！<a href='javascript:void(0)' onclick='closeMasages()' >忽略</a>").slideDown(150);
		   masagesTimer = setTimeout("closeMasages()",10000);
        }
    });
})(window);
//同意
function clickDefinite()
{
    var rt = true;
	var input = $(".p-news-table input");
    for (var i = 0; i < input.length; i++) 
    {
        if (input[i].value.length == 0 || isNaN(input[i].value)) 
        {
            input[i].focus();
            rt = false;
			break;
        }
    }   
	return rt;
}


$(document).ready(function()
{
    $("#p-news-actionForm").attr("action", "/app/index?module=core.message&template=html_flitting_no.ftl");
    //绑定表单提交事件
    $('#p-news-actionForm').submit(function(e)
    {		
		if (this.action.indexOf("html_flitting_yes") != -1) 
		{
			if (clickDefinite()) 
			{
				//alert("提交-yes");
				$(this).ajaxSubmit(function()
				{
					//测试
					public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_flitting_verify.ftl");//申请方
				});
				
			}
		}
		else
		{
			//alert("提交-no");
			$(this).ajaxSubmit(function()
			{
				//假设跳会列表
				$("#b-info-all").removeClass("none");
				$("#b-info-only").addClass("none");	
			});
		}
		return false;
    });
});
