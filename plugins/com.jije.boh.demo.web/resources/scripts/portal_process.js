(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_7.json",
        data: "",
        dataType: 'json',
        success: function(json)
        {
            $(".p-news-infotitle dt").html("<img src='" + json.icon + "' alt=''/>");
            $(".p-news-infotitle .p-new-datetime").html(json.time);
            $(".p-news-infotitle .p-new-mas").html(json.mas);
            if (json.postLink) 
            {
                $("#b-look-infos .p-news-btns").removeClass("none");
                $("#b-look-infos a").click(function()
                {
                    alert("处理请求详情");
					public_load_ajax(".b-mian-content",json.postLink,"基本参数=x");
                    $(".b-info-content").hide();
                });
            }
        },
        error: function(e)
        {
            alert("Err!");
        }
    });   
})(window);
