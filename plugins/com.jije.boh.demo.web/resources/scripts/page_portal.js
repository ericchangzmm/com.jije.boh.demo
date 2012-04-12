(function(window)
{
    //发送数据信息请求
    $.ajax(
    {
        type: "POST",
        url: "data_2.json",
        data: "基本参数=x",
        dataType: 'json',
        success: function(json)
        {
            //索引处理
            if (json.allPortal > 1) 
            {
                $(".b-portal-option").removeClass("none");
                for (var i = 1; i <= json.allPortal; i++) 
                {
                    var span = document.createElement("span");
                    if (i == json.nowIndex) 
                    {
                        span.className = "at";
                        span.innerHTML = i;
                    }
                    $(".b-portal-option").append(span);
                }
                //动态绑定 portal索引点击事件
                $(".b-portal-option span").click(function()
                {
                    if (!$(this).hasClass("at")) 
                    {
                        $(".b-portal-option span").removeClass("at").html("");
                        var index = $(".b-portal-option span").index(this);
                        $(this).addClass("at").html(index + 1);
                        //点击更新另一页仪表盘
                        public_load_ajax(".b-mian-content", "html_1.json", "基本参数=x&index=" + (index + 1));
                    }
                });
                var table = document.createElement("table");
                table.className = "b-portal-table";
                var tbody = document.createElement("tbody");
                table.appendChild(tbody);
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                $(".b-mian-content").append(table);
                //布局处理
                for (var i = 0; i < json.layout.length; i++) 
                {
                    var td = document.createElement("td");
                    td.width = json.layout[i];
                    td.className = "p-portal-properties";
                    tr.appendChild(td);
                    if (i + 1 != json.layout.length) 
                    {
                        var td1 = document.createElement("td");
                        td1.className = "b-portal-td-content";
                        tr.appendChild(td1);
                    }
                    //加载列表项	
                    for (var h = 0; h < json.list.length; h++) 
                    {
                        if (json.list[h].colsIndex == i) 
						{
							var tdPortal = "<div class='b-portal' portalId='" + json.list[h].id + "'>" +
							"<div class='b-portal-title'>" +
							"<div class='left'>" +
							json.list[h].name +
							"</div>" +
							"<div class='right'>" +
							"<span class='b-move-min'></span>" +
							"<span class='b-move-max'></span>" +
							"</div></div><div class='b-portal-content'  id='b-portal-" +
							json.list[h].id +
							"'><div class='b-public-load'></div></div>";
							td.innerHTML += tdPortal;
							
							if (h == 0) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_2.json", "基本参数=x");
							if (h == 1) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_7.json", "基本参数=x");
							if (h == 2) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_8.json", "基本参数=x");
							if (h == 3) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_9.json", "基本参数=x");
							if (h == 4) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_10.json", "基本参数=x");
							if (h == 5) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_12.json", "基本参数=x");
							if (h == 6) 
								public_load_ajax("#b-portal-" + json.list[h].id, "html_13.json", "基本参数=x");
						}
                    }
                }
                $(".b-portal-title").mouseover(function()
                {
                    publicPortalWidth = $(this).width();
                });
                publicDraggable();	

                
                
                
                
                
                
                
                
                
                
                
            }
            //禁止选中
            document.body.onselectstart = function()
            {
                return false;
            }
            //最小化
            $(".b-move-min").click(function()
            {
                var parent = $(this.parentNode.parentNode.parentNode);
                var portal = $(".b-portal-content", this.parentNode.parentNode.parentNode);
                var max = $(".b-move-max", this.parentNode);
                if (max.hasClass("b-move-at")) 
                {
                    var parent = $(this.parentNode.parentNode.parentNode);
                    var portal = $(".b-portal-content", this.parentNode.parentNode.parentNode);
                    var max = $(".b-move-max", this.parentNode);
                    if (max.hasClass("b-move-at")) 
                    {
                        portalMax(max, parent, portal);
                        portalMin(this, portal, parent);
                    }
                    else 
                    {
                        portalMin(this, portal, parent);
                    }
                }
                else 
                {
                    portalMin(this, portal, parent);
                }
                
                
            });
            //最 大 化 portal
            $(".b-move-max").click(function()
            {
                var parent = $(this.parentNode.parentNode.parentNode);
                var portal = $(".b-portal-content", this.parentNode.parentNode.parentNode);
                var min = $(".b-move-min", this.parentNode);
                if (min.hasClass("b-move-at")) 
                {
                    portalMin(min, portal, parent);
                    portalMax(this, parent, portal);
                }
                else 
                {
                    portalMax(this, parent, portal);
                }
            });
        },
        error: function(e)
        {
            alert("Err!");
        }
    });
})(window);
function portalMin(b, portal, parent)
{
    if ($(b).hasClass("b-move-at")) 
    {
        var height = portal.attr("nodeHeight");
        portal.animate(
        {
            height: height
        }, 100, function()
        {
            portal.css(
            {
                "height": "auto"
            });
        });
        $(b).removeClass("b-move-at");
    }
    else 
    {
        var height = portal.height();
        portal.attr("nodeHeight", height);
        portal.animate(
        {
            height: 0
        }, 100);
        $(b).addClass("b-move-at");
        parent.css(
        {
            height: "auto"
        });
    }
}

function portalMax(b, parent, portal)
{
    if ($(b).hasClass("b-move-at")) 
    {
        $(b).removeClass("b-move-at");
        var coord = parent.data("coord", coord);
        parent.animate(
        {
            height: coord.height,
            width: coord.width,
            top: coord.top,
            left: coord.left
        }, 100, function()
        {
            parent.removeClass("b-portal-position");
            parent.css(
            {
                height: "auto",
                width: "100%"
            });
        });
    }
    else 
    {
        var coord = _$.coord(parent[0]);
        parent.data("coord", coord);
        parent.css(
        {
            top: coord.top,
            left: coord.left,
            height: coord.height,
            width: coord.width
        });
        parent.addClass("b-portal-position");
        $(b).addClass("b-move-at");
        var height = document.body.clientHeight;
        var width = document.body.clientWidth;
        parent.animate(
        {
            height: height - 2,
            top: 0,
            left: 0,
            width: width - 2
        }, 100);
    }
}


