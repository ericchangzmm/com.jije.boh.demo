/**
 * colorbox
 * @author henry
 * @version 2.0
 * @modify 2011/12/21
 */
(function()
{
    var colorbox = {};
    colorbox.floor = null; //弹出层组成背景
    colorbox.floorBg = 0; //弹出层背景透明度
    colorbox.content = null; //弹出层组成内容容器    
    colorbox.contentHeight = 0;
    colorbox.contentWidth = 0;
    colorbox.heightTimer = null;
    colorbox.widthTimer = null;
    colorbox.border = null; //弹出层组成边框
    colorbox.title = null; //弹出层组成底层边框
    colorbox.close = null; //弹出层组成底层关闭
    colorbox.text = ""; //弹出层组成底层标题文本
    colorbox.coord = null; //定位数据   
    colorbox.html = null; //显示内容
    colorbox.scrollTop = 0;//窗口滚动距离
    colorbox.scrollTimer = null; 
    colorbox.isScroll = false;//是否支持滚动
    colorbox.move = 2; //动画方式 (0:无动画,1:渐变，2:上下，3:左右,4:全方位)
    colorbox.exec = function(param)
    {
        html = window.$(param.content);
        if (html.length != 0) 
        {
            html = html[0];
			colorbox.floor = document.getElementById("colorBox_floor");
            colorbox.content = document.getElementById("colorBox_content");
            colorbox.border = document.getElementById("colorBox_border");
            if (!colorbox.floor) 
			{
				colorbox.floor = document.createElement("div");
				colorbox.floor.className = "b-colorBox-floor";
				colorbox.floor.id = "colorBox_floor";
				
				colorbox.border = document.createElement("div");
				colorbox.border.className = "b-colorBox-border";
				colorbox.border.id = "colorBox_border";
				
				colorbox.content = document.createElement("div");
				colorbox.content.id = "colorBox_content";
				colorbox.content.className = "b-colorBox-content";
				
				colorbox.title = document.createElement("div");
				colorbox.title.id = "colorBox_title";
				colorbox.title.className = "b-colorBox-title";
				
				colorbox.title.innerHTML = "<span id='colorBox_text' class='b-colorBox-text'></span>" +
				"<span onclick='_$.colorbox.close(2)' id='colorBox_close' class='b-colorBox-close' onmouseover='javascript:this.style.color=\"#333\"'  onmouseout='javascript:this.style.color=\"#999\"'>关闭</span>";
				
				//core
				colorbox.floor.style.position = "fixed";
				colorbox.floor.style.width = "100%";
				colorbox.floor.style.height = "100%";
				colorbox.floor.style.opacity = "0";
				colorbox.content.style.opacity = "1";
				colorbox.border.style.opacity = "0.2";
				colorbox.title.style.opacity = "1";
				//core
				
				document.body.appendChild(colorbox.floor);
				document.body.appendChild(colorbox.border);
				document.body.appendChild(colorbox.title);
				document.body.appendChild(colorbox.content);
			}
			for (var i = 0; i < colorbox.content.children.length; i++) 
            {
            	colorbox.content.children[i].style.display = "none";
            }
            //加载方式
            html.style.display = "block";
            colorbox.content.style.display = "block";
            colorbox.coord = window._$.coord($(html)[0]);
            html.style.display = "none";
            colorbox.content.style.display = "none";
            colorbox.html = html;
            if (!isNaN(parseInt(param.move))) 
                colorbox.move = parseInt(param.move);
            
            colorbox.text = param.title ? param.title : "";
            colorbox.isScroll = param.isScroll ? true : false;
            //执行动画加载,换算坐标角度
            colorbox.load(colorbox.move);
        }
    }
    colorbox.close = function(move)
    {
        document.getElementById("colorBox_text").style.display = "none";
        document.getElementById("colorBox_close").style.display = "none";
		
        if (!move && move != 0) 
            move = colorbox.move;
        if (move == 0 || move == 1) 
        {
            colorbox.floor.style.display = "none";
            colorbox.content.style.display = "none";
            colorbox.border.style.display = "none";
            colorbox.title.style.display = "none";
        }
        else if (move == 2) 
        {
			colorbox.contentHeight = colorbox.coord.height;       
			colorbox.heightTimer = setInterval("_$.colorbox.closeHeight()", 15);            
			colorbox.content.style.display = "none";
        }
        else if (move == 3) 
        {
            colorbox.contentWidth = colorbox.coord.width;
            colorbox.widthTimer = setInterval("window._$.colorbox.closeWidth()", 15);
            colorbox.content.style.display = "none";
        }
        else 
        {
            colorbox.contentHeight = colorbox.coord.height;
            colorbox.heightTimer = setInterval("window._$.colorbox.closeHeight()", 15);
            colorbox.contentWidth = colorbox.coord.width;
            colorbox.widthTimer = setInterval("window._$.colorbox.closeWidth()", 15);
            colorbox.content.style.display = "none";
        }
    }
    colorbox.closeWidth = function()
    {
        var rt = false;
        var width = colorbox.coord.width / 10;
        if (colorbox.contentWidth > width) 
        {
            colorbox.contentWidth -= width;
            rt = false;
        }
        else 
        {
            width = colorbox.contentWidth / 2;
            if (width > 1) 
            {
                colorbox.contentWidth -= width;
                rt = false;
            }
            else 
            {
                colorbox.contentWidth = 0;
                rt = true;
            }
        }
        var left = ((document.documentElement.clientWidth - colorbox.contentWidth) / 2);
        colorbox.title.style.width = colorbox.contentWidth + "px";
        colorbox.title.style.left = left - 10 + "px";
        colorbox.border.style.width = colorbox.contentWidth + 20 + "px";
        colorbox.border.style.left = left - 20 + "px";
        if (rt) 
        {
            window.clearInterval(colorbox.widthTimer);
            colorbox.floor.style.display = "none";
            colorbox.border.style.display = "none";
            colorbox.title.style.display = "none";
        }
    }
    colorbox.closeHeight = function()
    {
		var rt = false;
        var height = colorbox.coord.height / 10;
		
        if (colorbox.contentHeight > height) 
        {
            colorbox.contentHeight -= height;
            rt = false;
        }
        else 
        {
            height = colorbox.contentHeight / 2;			
            
            if (height > 1) 
            {
                colorbox.contentHeight -= height;
                rt = false;
            }
            else 
            {
                colorbox.contentHeight = 0;
                rt = true;
            }
        }
        var top = 0;
        if (document.documentElement && document.documentElement.scrollTop) 
            top = document.documentElement.scrollTop;
        else 
            top = document.body.scrollTop;
        var top = ((document.documentElement.clientHeight - colorbox.contentHeight) / 2 + top);
        colorbox.title.style.height = colorbox.contentHeight + "px";
        colorbox.title.style.top = top - 30 + "px";
        colorbox.border.style.height = colorbox.contentHeight + 20 + "px";
        colorbox.border.style.top = top - 40 + "px";
        if (rt) 
        {
			window.clearInterval(colorbox.heightTimer);
            colorbox.floor.style.display = "none";
            colorbox.border.style.display = "none";
            colorbox.title.style.display = "none";
        }
    }
    colorbox.load = function(move)
    {
               
		colorbox.floor.style.opacity = colorbox.floorBg = 0;
        document.getElementById("colorBox_text").innerHTML = colorbox.text;
        colorbox.coord = window._$.coord($(html)[0]);
		
        if (!isNaN(move)) 
        {
            colorbox.move = parseInt(move);
        }
        document.getElementById("colorBox_text").style.display = "none";
        document.getElementById("colorBox_close").style.display = "none";
        
        switch (colorbox.move)
        {
            case 0:
                colorbox.showEnd(); //最终显示结果
                break;
            case 1:
                colorbox.showEnd("none");
                colorbox.showFloor();
                break;
            case 2:
                colorbox.showEnd("none", 0);
                colorbox.contentHeight = 0;
                colorbox.showFloor(true);
                colorbox.heightTimer = setInterval("_$.colorbox.showHeight()", 15);
                break;
            case 3:
                colorbox.showEnd("none", null, 0);
                colorbox.contentWidth = 0;
                colorbox.showFloor(true);
                colorbox.widthTimer = setInterval("_$.colorbox.showWidth()", 15);
                break;
            case 4:
                colorbox.showEnd("none", 0, 0);
                colorbox.contentHeight = 0;
                colorbox.contentWidth = 0;
                colorbox.showFloor(true);
                colorbox.heightTimer = setInterval("_$.colorbox.showHeight()", 15);
                colorbox.widthTimer = setInterval("_$.colorbox.showWidth()", 15);
                break;
        }
        document.getElementById("colorBox_text").style.display = "block";
        document.getElementById("colorBox_close").style.display = "block";
    }
    colorbox.showHeight = function()
	{
		var rt = false;
		
		if (colorbox.contentHeight < colorbox.coord.height) 
		{
			var height = colorbox.coord.height / 10;
			colorbox.contentHeight += height;
			rt = false;
		}
		else 
		{
			colorbox.contentHeight = colorbox.coord.height;
			rt = true;
		}
		var top = 0;
		if (document.documentElement && document.documentElement.scrollTop) 
		{
			top = document.documentElement.scrollTop;
		}
		else 
		{
			top = document.body.scrollTop;
		}
		var top = ((document.documentElement.clientHeight - colorbox.contentHeight) / 2 + top);
		
		colorbox.content.style.top = top + "px";
		colorbox.content.style.height = colorbox.contentHeight + "px";
		colorbox.title.style.height = colorbox.contentHeight + 40 + "px";
		colorbox.title.style.top = top - 30 + "px";
		colorbox.border.style.height = colorbox.contentHeight + 60 + "px";
		colorbox.border.style.top = top - 40 + "px";
		
		if (rt) 
		{
			window.clearInterval(colorbox.heightTimer);
			colorbox.content.style.display = "block";
		}
	}
    colorbox.showWidth = function()
    {
        var rt = false;
        if (colorbox.contentWidth < colorbox.coord.width) 
        {
            var width = colorbox.coord.width / 10;
            colorbox.contentWidth += width;
            rt = false;
        }
        else 
        {
            colorbox.contentWidth = colorbox.coord.width;
            rt = true;
        }
        var left = ((document.documentElement.clientWidth - colorbox.contentWidth) / 2);
        colorbox.content.style.left = left + "px";
        colorbox.content.style.width = colorbox.contentWidth + "px";
        colorbox.title.style.width = colorbox.contentWidth + 20 + "px";
        colorbox.title.style.left = left - 10 + "px";
        colorbox.border.style.width = colorbox.contentWidth + 40 + "px";
        colorbox.border.style.left = left - 20 + "px";
        if (rt) 
        {
            window.clearInterval(colorbox.widthTimer);
            colorbox.content.style.display = "block";
        }
    }
    colorbox.showFloor = function(isMove)
    {
		
        window._$.moveCore.startMove(document.getElementById("colorBox_floor"), 
        {
            opacity: 30
        });
        window._$.moveCore.startMove(document.getElementById("colorBox_border"), 
        {
            opacity: 30
        });
        if (!isMove) 
        {
            $("#colorBox_content").show(500);
        }
        
        colorbox.floor.style.display = "block";
        colorbox.border.style.display = "block";
        colorbox.title.style.display = "block";
    }
    colorbox.showEnd = function(showDate, height, width)
	{
		var top = 0;
		if (document.documentElement && document.documentElement.scrollTop) 
			top = document.documentElement.scrollTop;
		else 
			top = document.body.scrollTop;
		if (!showDate) 
			showDate = "block";
		if (!height && height != 0) 
			height = colorbox.coord.height;
		if (!width && width != 0) 
			width = colorbox.coord.width;
		
		colorbox.floor.style.display = showDate;
		
		var top = ((document.documentElement.clientHeight - height) / 2 + top);
		var left = ((document.documentElement.clientWidth - width) / 2);
		
		colorbox.content.style.width = width + "px";
		colorbox.content.style.height = height + "px";
		colorbox.content.style.display = showDate;
		colorbox.title.style.width = width + 20 + "px";
		colorbox.title.style.height = height + 40 + "px";
		colorbox.title.style.display = showDate;		
		colorbox.content.style.top = top + "px";
		colorbox.content.style.left = left + "px";
		colorbox.border.style.top = top - 40 + "px";
		colorbox.border.style.left = left - 20 + "px";
		colorbox.border.style.width = width + 40 + "px";
		colorbox.border.style.height = height + 60 + "px";
		colorbox.border.style.display = showDate;
		colorbox.title.style.top = top - 30 + "px";
		colorbox.title.style.left = left - 10 + "px";
		colorbox.content.style.opacity = "1";
		colorbox.floor.style.opacity = "0.3";
		
		if (height == 0 || width == 0) 
		{
			colorbox.title.style.width = "0px";
			colorbox.title.style.height = "0px";
			colorbox.border.style.width = "0px";
			colorbox.border.style.height = "0px";
		}
		colorbox.content.appendChild(colorbox.html);
		colorbox.html.style.display = "block";
	}
    
    window.$(window).bind("scroll", function()
    {
        if (colorbox.floor && colorbox.isScroll) 
        {
            if (document.documentElement && document.documentElement.scrollTop) 
                colorbox.scrollTop = document.documentElement.scrollTop;
            else 
                colorbox.scrollTop = document.body.scrollTop;
            if (colorbox.scrollTimer) 
                clearTimeout(colorbox.scrollTimer);
            scrollTimer = setTimeout("_$.colorbox.updateScroll()", 500);
        }
    });
    
    colorbox.updateScroll = function()
    {
//        if (colorbox.floor.style.display == null) 
//            clearTimeout(colorbox.scrollTimer);
//        var top = 0;
//        if (document.documentElement && document.documentElement.scrollTop) 
//            top = document.documentElement.scrollTop;
//        else 
//            top = document.body.scrollTop;
//        
//        var top = ((document.documentElement.clientHeight - colorbox.coord.height) / 2 + top);
//        var top1 = parseInt(colorbox.content.style.top);
//        if (top1 < top || top1 > top) 
//        {
//            top1 = top1 < top ? top1++ : top1--;
//            colorbox.content.style.top = top + "px";
//            colorbox.title.style.top = top - 30 + "px";
//            colorbox.border.style.top = top - 40 + "px";
//            scrollTimer = setTimeout("_$.colorbox.updateScroll()", 1);
//        }
//        else 
//            clearTimeout(colorbox.scrollTimer);
    }
    if (!this._$) 
    {
        var _$ = {};
        this._$ = _$;
    }
    this._$.colorbox = colorbox;
})();

