(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_9.json",
        data: "基本参数=x",
        dataType: 'json',
        success: function(json)
        {
            for (var i = 0; i < json.list.length; i += 2) 
            {
                var className = "";
                if ((i + 2) >= json.list.length) 
                {
                    className = " p-border-bottom";
                }
                
                $(".p-channel tbody").append("<tr><td link='"+json.list[i].point+"'  class='" + className + "' id='" + json.list[i].id + "'><span class='p-icon-left'><img alt='' src='" + json.list[i].icon + "'></span><span class='p-icon-right'>" + json.list[i].name + "</span></td><td  link='"+json.list[i+1].point+"' class='p-border-right " + className + "' id='" + json.list[i + 1].id + "'><span class='p-icon-left'><img alt='' src='" + json.list[i + 1].icon + "'></span><span class='p-icon-right'>" + json.list[i + 1].name + "</span></td></tr>")
            }
			
			$(".p-channel td").click(function()
			{
				var link = $(this).attr("link");
				var id = $(this).attr("id");
				public_load_ajax(".b-mian-content",link,"基本参数=x");
			})
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
})(window);
