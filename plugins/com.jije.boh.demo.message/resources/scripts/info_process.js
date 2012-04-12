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
//        url: "/moduleresources/core.message/resources/scripts/json/data_infos.json",
//        data: "",
//        dataType: 'json',
        url: ajaxpath,
        data: "module=core.message&actionid=getMsgDetail&id=" + mark,
        dataType: '',
        success: function(json)
        {
			//乱码处理,后台请将dataType设为空
			json = decodeURIComponent(json);
			json = eval("(" + json + ")");  
			
			$(".p-news-infotitle dt").html("<img src='" + json.icon + "' alt=''/>");
            $(".p-news-infotitle .p-new-datetime").html(json.time);
            $(".p-news-infotitle .p-new-mas").html(json.mas);
            if (json.postLink) 
            {
                $("#b-look-infos .p-news-btns").removeClass("none");
                $("#b-look-infos a").click(function()
                {
                    alert("处理请求详情");
					public_load_ajax(".b-mian-content",json.postLink,"parameter=x");
                    $(".b-info-content").hide();
                });
            }
        },
        error: function(e)
        {
           $(".b-reckon-mas").html("数据格式异常！<a href='javascript:void(0)' onclick='closeMasages()' >忽略</a>").slideDown(150);
		   masagesTimer = setTimeout("closeMasages()",10000);
        }
    });   
})(window);
