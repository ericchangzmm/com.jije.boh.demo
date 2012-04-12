(function(window)
{
    $.ajax(
    {
        type: "GET",
        url: "data_8.json",
        data: "",
        dataType: 'json',
        success: function(json)
        {
			for (var i = 0; i < json.list.length; i++) 
            {
                var className = "p-post-1";
                
                switch (json.list[i].type)
                {
                    case 1:
                        className = "p-post-1";
                        break;
                    case 2:
                        className = "p-post-2";
                        break;
                    case 3:
                        className = "p-post-3";
                        break;
                }
                if (i == json.list.length - 1) 
                {
                    className += " p-bottom-none";
                }
                $(".p-post").append("<p class='" + className + "' id='" + json.list[i].id + "'>" + (i + 1) + "、" + json.list[i].text + "<label>" + json.list[i].time + "</label></p>");
            }
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
})(window);
