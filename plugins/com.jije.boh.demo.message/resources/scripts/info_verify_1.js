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
//        url: "/moduleresources/core.message/resources/scripts/json/data_flitting_verify.json",
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
            $(".p-news-infotitle .p-left").html($(".p-news-infotitle .p-left").html() + json.out);
            $(".p-news-infotitle .p-right").html($(".p-news-infotitle .p-right").html() + json.enter);
            $(".p-news-content").attr("id", json.id);
			if(json.state == 1)
				$(".p-news-btns").html("");
				
            for (var i = 0; i < json.list.length; i++) 
            {
                $(".p-news-table").append("<tr><td>" + json.list[i].name + "</td><td>" + json.list[i].unit + "</td><td>"+json.list[i].reality+"</td></tr>");
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
//确定
function clickVerify()
{
	$(".b-reckon-mas").html("确认收货成功！<a href='javascript:void(0)' onclick='closeMasages()' >忽略</a>").slideDown(150);
	 masagesTimer = setTimeout("closeMasages()",10000);
	$.ajax(
	{
		type: "POST",
		url: "/moduleresources/core.message/resources/scripts/json/update_flitting_verify.json",
		data: "",
		dataType: 'json'
	});
	$(".p-news-btns").html("");
}
