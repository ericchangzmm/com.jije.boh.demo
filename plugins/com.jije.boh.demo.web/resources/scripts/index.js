var ftlpath = "/app/index";
var ajaxpath = "/app/ajax";
//加载初始数据
function menuLoad()
{	
	$.ajax(
	{
		type: "POST",
		url: ajaxpath,
		data: "module=core.message&actionid=applicationMenu",
		dataType: '',
		success: function(value)
		
		{
			//乱码处理,后台请将dataType设为空
			value = decodeURIComponent(value);
			value = eval("(" + value + ")");
			
			$(".b-top-info .b-user-info").html(value.userName);
			$(".b-top-mas-label").html(value.infoNumber);
			$(".b-top-mas-label").attr("id",value.infoId);
			$(".b-top-info .b-user-info").attr("userId",value.userId);
			
			//加载菜单项
			var li = "";
			for (var i = 0; i < value.menu.length; i++) 
			{
				if(li == "")
					li = "<li><dl link='"+value.menu[i].link+"'><dt><img src='/moduleresources/"+value.menu[i].icon+"' alt=''></dt><dd>"+value.menu[i].name+"</dd></dl></li>";
				else
					li += "<li><dl link='"+value.menu[i].link+"'><dt><img src='/moduleresources/"+value.menu[i].icon+"' alt=''></dt><dd>"+value.menu[i].name+"</dd></dl></li>";
			}
			//绑定菜单项事件(内容假设)
			$(".b-menu-list dl").live("click",function()
			{
				public_load_ajax(".b-mian-content",ftlpath, $(this).attr("link"));
			});
			$(".b-menu-list").html(li);
			
			//加载默认首页内容（写死为仪表盘，注意更改为统一请求地址）
			//pageIndex=查询第几页(没有就为1)			
//			public_load_ajax(".b-mian-content","json/portal/html_meter.json","parameter=x");//仪表盘		
		},
		error: function(date)
		{
			alert("Err!");
		}
	});
}
menuLoad();

//点击出现菜单
$(".b-menu-action").click(function()
{
	if ($(this).hasClass("b-menu-at")) 
	{
		$(".b-menu-content").slideUp(400);
		$(this).removeClass("b-menu-at");
	}
	else 
	{
		$(".b-menu-content").slideDown(400);
		$(this).addClass("b-menu-at");
	}
});
//点击出现信息详情
$(".b-top-mas-label").click(function()
{
	if($(".b-info-content").css("display") == "block")
	{
		$(".b-info-content").css({"display":"none"});
		return;
	}
	$(".b-info-content").show();
	$("#b-info-all").removeClass("none");
	$("#b-info-only").addClass("none");
	$.ajax(
	{
		type: "POST",
		url: ajaxpath,
		data: "module=core.message&actionid=getMsgList",
		dataType: '',
		success: function(json)
		{
			//乱码处理,后台请将dataType设为空
			json = decodeURIComponent(json);
			json = eval("(" + json + ")");

			var ul = document.createElement("ul");
			var rt = false;
			//按时间的先后顺序排列，最多10条
			for (var i = 0; i < json.value.length; i++) 
			{
				var text = json.value[i].text;
				if (text.length > 18) 
					text = text.substring(0, 18) + "...";
				
				var li = document.createElement("li");
				li.id = json.value[i].id;
				if(json.value[i].read) 
				{
					li.className = "b-not-look";					
				}
				else
				{
					rt = true;
				}
				li.title = json.value[i].link;
				li.innerHTML = "<img alt='' src='" + json.value[i].icon + "'>" +
				"<label>" +
				json.value[i].time +
				"</label>" +
				"<label>" +
				text +
				"</label>" +
				"<span></span>";
				ul.appendChild(li);
			}
			if(rt)
			{
				$("#b-all-read").removeClass("at");
			}
			else
			{				
				$("#b-all-read").addClass("at");
			}			
			$("#b-top-info-content").html("").append(ul);
		},
		error: function(date)
		{
			alert("Err!");
		}
	});
});
$(".b-title-right").click(function()
{
	$(".b-info-content").hide();
});
$(document).bind("click",function(e)
{
	var m = _$.getTarget(_$.getEvent(e));
	if(m.className == "b-public-btn")
		return;		
	_$.toClick(e,[".b-info-content",".b-top-mas"]);
});
//忽略全部信息
$("#b-all-read").click(function()
{
	if (!$(this).hasClass("at")) 
	{
		$("#b-info-all li").addClass("b-not-look");
		$(".b-top-mas-label").html("0");
		$(this).addClass("at");
//		alert("忽略全部，需更改数据库所有信息状态");
		$.ajax(
		{
			type: "POST",
			url: ajaxpath,//注意更改为统一请求地址
			data: "module=core.message&actionid=ignoreAll"
//			url: "/moduleresources/core.message/resources/scripts/json/update_neglect.json",
//			data: "parameter=x"
		});		
	}
});
//点击单条信息
$("#b-info-all li").live("click",function()
{
	$("#b-info-all").addClass("none");
	$("#b-info-only").removeClass("none");		
	$("#b-look-infos").attr("nodeid",this.id);
	//注意更改为统一请求地址
//	public_load_ajax("#b-look-infos",ajaxpath,"module=core.message&actionid=getMsgDetail&id=" + this.id); //拨出方 nodeId=信息唯一标识
//	public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_flitting.ftl&nodeId="+this.id); //拨出方 nodeId=信息唯一标识
//  public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_flitting_verify.ftl&nodeId="+this.id);//申请方
//	public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_infos.ftl&nodeId="+this.id);//跳转处理信息 
	window.messageMark = this.id;
	public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_"+this.title+".ftl");
	
	
	var lis = $("#b-info-all li");
	var index = lis.index(this);
//	alert("查看单条信息，需更改数据库此信息状态");
	getLinkState(index,lis.length);
});
//返回列表
$("#b-info-only .b-dl-link1").click(function()
{
	$("#b-info-all").removeClass("none");
	$("#b-info-only").addClass("none");	
});
//上一条
$("#b-info-last").click(function()
{
    if($(this).hasClass("b-nolink"))
		return;
	var nodeid = $("#b-look-infos").attr("nodeid");
    var m = null;
    $("#b-info-all li").each(function(i)
    {
        if (this.id == nodeid) 
        {
            m = i - 1;
        }
    });
    $("#b-info-all li").each(function(i)
    {
        if (m == i) 
        {
			//注意更改为统一请求地址
//        	public_load_ajax("#b-look-infos",ajaxpath,"module=core.message&actionid=getMsgDetail&id=" + this.id); 
//        	public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_flitting.ftl&nodeId="+this.id); 
        	window.messageMark = this.id;
        	public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_"+this.title+".ftl");
            return;
        }
    });   
	getLinkState(m,$("#b-info-all li").length); 
});
//下一条
$("#b-info-next").click(function()
{	
	if($(this).hasClass("b-nolink"))
		return;
	var nodeid = $("#b-look-infos").attr("nodeid");
	var m = null;
	$("#b-info-last").removeClass("b-nolink");
    $("#b-info-all li").each(function(i)
    {       
		if (this.id == nodeid) 
        {           
			m = i+1;
        }
		if (m == i) 
		{
			//注意更改为统一请求地址
//			public_load_ajax("#b-look-infos",ajaxpath,"module=core.message&actionid=getMsgDetail&id=" + this.id); 
//			public_load_ajax("#b-look-infos", "/app/index","module=core.message&template=html_flitting.ftl");
			window.messageMark = this.id;
			public_load_ajax("#b-look-infos","/app/index","module=core.message&template=html_"+this.title+".ftl");
			return;
		}
    });
	getLinkState(m,$("#b-info-all li").length); 
});

//处理上下条信息操作状态
function getLinkState(i, all)
{
	if (i <= 0) 
		$("#b-info-last").addClass("b-nolink");
	else 
		$("#b-info-last").removeClass("b-nolink");
	if (i == all - 1) 
		$("#b-info-next").addClass("b-nolink");
	else 
		$("#b-info-next").removeClass("b-nolink");
	
	
	//更改信息显示状态
	$($("#b-info-all li").get(i)).addClass("b-not-look");	
	
	//处理头部数字
	 var n = $("#b-top-info-content li").length - $("#b-top-info-content li.b-not-look").length;

	 $(".b-top-mas-label").html(n);
}
//公共加载模块方法
function public_load_ajax(content, url, data)
{
    //发送数据信息请求
    $.ajax(
    {
        type: "POST",
        url: url,
        data: data,
        dataType: 'html',
        success: function(json)
        {
            //json = decodeURIComponent(json);
			$(content).html(json);
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
}

//头部 tbl点击事件绑定
$(".b-top-title li").click(function()
{
    if (!$(this).hasClass("at")) 
	{
		$(".b-top-title li").removeClass("at");
		$(this).addClass("at");
		publicPortalid = this.id;
		public_load_ajax(".b-mian-content", "json/html_" + this.id + ".json", "parameter=x");
	}
});
var publicPortalWidth = "33%";
var publicPortalObj = null;
var publicPortalid = 0;//仪表盘，工作区 ID
function publicDraggable()
{
	//添加portal基本拖放功能
	$('.b-portal').draggable(
	{
		proxy: "",
		revert: true,
		handle:".left",
		deltaY:-2,
		onStartDrag: function(e)
		{
			if ($(this).hasClass("b-portal-position")) 
			{
				$(this).draggable("disabled").css({top:0,left:0});
			}
			else 
			{
				this.style.width = publicPortalWidth + "px";
				publicPortalObj = this;
			}
		},
		onDrag:function(e)
		{
			if ($(this).hasClass("b-portal-position")) 
			{
				$(this).draggable("disabled").css({top:0,left:0});
			}
			else 
			{
				this.style.width = publicPortalWidth + "px";
			}
		},
		onStopDrag:function(e)
		{			
			setTimeout("setTimePortal()",1000);
			publicPortalObj = null;
		}
	});
    $('.p-portal-properties').droppable(
    {
        accept: ".b-portal",
        onDrop: function(e, s)
        {
            var border = $(".p-portal-addorder");
			if (border.length != 0) 
			{
				$(s).insertBefore(border);
				border.remove();
				
				//获取数据
				var ids = new Array();
				$('.p-portal-properties').each(function()
				{
					var cls = new Array();
					$(".b-portal",this).each(function()
					{
						cls[cls.length] = $(this).attr("portalid");
					});
					ids[ids.length] = cls;
				});
				//发送更改位置请求
				$.ajax(
				{
					type: "POST",
					url: "json/portal/message.json",
					data: "parameter=x&ids="+ids+"&id="+publicPortalid, //publicPortalid 判断是仪表盘还是工作区
					dataType: 'html',
					success: function(json)
					{
						//alert("设置成功")
					},
					error: function(e)
					{
						//alert("Err!");
					}
				});
			}
        }
    });
	$('.b-portal').mouseover(function()
	{
		if (publicPortalObj != null && publicPortalObj != this) 
		{
			var div = $(".p-portal-addorder");
			if (div.length == 0) 
			{
				div = document.createElement("div");
				div.className = "p-portal-addorder";
			}
			var allportal = $(".b-portal", this.parentNode);
			var index = allportal.index(this);
			$(div).insertBefore(this);				
		}
		return false;
	});
	$(".p-portal-properties").mouseover(function()
	{
		if (publicPortalObj != null) 
		{
			var div = $(".p-portal-addorder");
			if (div.length == 0) 
			{
				div = document.createElement("div");
				div.className = "p-portal-addorder";
			}
			$(this).append(div);
		}
	});
	$(".p-portal-addorder").mouseover(function()
	{
		return false;
	});
}
function setTimePortal()
{
	$(".b-portal").each(function()
	{
		if(this.style.position == "static")
		{
			this.style.width = "100%";
			this.style.position = "";
		}
	});
}
function hoverShowTitle(b)
{
    var hover = $("#b-public-hovertitle");
	if(hover.length == 0)
	{
		$("body").append("<span class='b-public-hovertitle' id='b-public-hovertitle'><label></label><i>&nbsp;</i></span>");
	}	
	hover = $("#b-public-hovertitle");
			
	var title = $(b).attr("node");
    var coord = _$.coord(b);
    $("#b-public-hovertitle label").html(title);
	$("#b-public-hovertitle").css(
    {
        top: coord.top - 42,
        left: coord.left - ($("#b-public-hovertitle").width()/2) + (coord.width / 2)
    }).show();
}