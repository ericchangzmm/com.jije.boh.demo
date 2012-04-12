(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_6_1.json",
        data: "基本参数=x",
        dataType: 'json',
        success: function(json)
        {
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
            alert("Err!");
        }
    });
})(window);
//确定
function clickVerify()
{
	alert("确认收货");
	$.ajax(
	{
		type: "GET",
		url: "update_2.json",
		data: "",
		dataType: 'json'
	});
	$(".p-news-btns").html("");
}
