(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_3.json",
        data: "基本参数=x",
        dataType: 'json',
        success: function(json)
        {
            $(".p-weather .p-city").html(json.city);
            $(".p-weather .p-date").html(json.dateTime);
            $(".p-weather .p-week").html(json.weekDate);
            $(".p-weather .p-holiday").html(json.holiday);
            $(".p-weather .p-left").html("<img src='" + json.weatherIcon + "' alt=''>");
            $(".p-weather .p-right").html("<label>" + json.temperature + "</label>");
            $(".p-weather .p-weather-bottom").html("<label>白天:" + json.climateDay + " | 夜间:" + json.climateNighttime + "</label><label>风向：" + json.wind + "</label>");
            
            updateWeather();
            for (var i = 0; i < json.list.length; i++) 
            {
                $(".p-weather-news").append("<a href='javascript:void(0)' id='" + json.list[i].id + "'>" + json.list[i].text + "</a>");
            }
            $(".p-weather-news a").bind("click", function()
            {
                public_load_ajax(".b-mian-content", "html_xx.json", "基本参数=x");
            });
            $(".p-weather-more").bind("click", function()
            {
                if ($(".p-weather-news").css("overflow") == "hidden") 
                {
                    $(".p-weather-news").css(
                    {
                        overflow: "visible",
                        height: "auto"
                    });
                    $(this).addClass("p--weather-moer-up");
                }
                else 
                {
                    $(".p-weather-news").css(
                    {
                        overflow: "hidden",
                        height: 44
                    });
                    $(this).removeClass("p--weather-moer-up");
                }
            });
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
    function updateWeather()
    {
        var date = new Date();
        $(".p-weather .p-dateTime").html(date.getHours() + ":" + date.getMinutes());
        setTimeout(updateWeather, 1000);
    }
})(window);


