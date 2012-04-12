<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>BOH-首页</title>
		<link rel="stylesheet" type="text/css" href="/moduleresources/core.web/resources/css/base.css" />
		<script type="text/javascript" src="/moduleresources/core.web/resources/scripts/jquery.min.js"></script>
		<script type="text/javascript" src="/moduleresources/core.web/resources/scripts/jquery.form.js"></script>
		<script type="text/javascript" src="/moduleresources/core.web/resources/scripts/jquery.easyui.min.js"></script>
    </head>
    <body>
        <div class="b-top">
        	<a href="/app/index" class="b-logo" ><img alt="BOH" src="/moduleresources/core.web/resources/images/logo.png"></a>
			<ul class="b-top-title">
				<li class="b-li-border"><span class="b-ybp"></span>仪表盘</li>
				<li class="b-li-border"><span class="b-work"></span>工作区</li>
				<li><span class="b-help"></span>员工自助平台</li>
			</ul>
			<ul class="b-top-info">
				<li class="b-menu-action" title="系统菜单">&nbsp;</li>
				<li class="b-user-info" title="用户信息">userName</li>				
				<li class="b-top-mas" title="消息中心">
					<label class="b-top-mas-label">0</label>
					<!--消息内容-->
					<div class="b-info-content">
						<span class="b-look-content"></span>
						<div class="b-info-list">
							<div class="b-info-title">
								<span class="b-title-left">消息中心</span>
								<span class="b-title-right"></span>
							</div>
							<dl class="b-info-dl" id="b-info-all">
								<dt class="b-infos-dt">
									<a href="javascript:void(0)" id="b-all-read" class="b-dl-link2">忽略全部消息</a>
								</dt>
								<!--消息中心列表-->
								<dd id="b-top-info-content"></dd>	
								<!--消息中心列表-->
							</dl>
							<dl class="b-info-dl none" id="b-info-only"> 
								<dt class="b-infos-dt">
									<a href="javascript:void(0)" class="b-dl-link1">返回到列表</a>
									<a href="javascript:void(0)" class="b-dl-link2" id="b-info-next">下一条</a>
									<a href="javascript:void(0)" class="b-dl-link2" id="b-info-last">上一条</a>	
								</dt>
								<!--详细信息-->
								<dd class="b-list-infos" id="b-look-infos"></dd>	
								<!--详细信息-->	
							</dl>
						</div>
					</div>
				</li>
				<li class="b-public-skin" title="更换皮肤">&nbsp;</li>
				<li>
					<span class="b-search-text">
						<input type="text"  value="请输入应用名称"  class="b-search-input">
						<label class="b-search-btn"></label>
					</span>
				</li>
			</ul>
			
        </div>
		<!--菜单列表项-->
		<div class="b-menu-content">
			<ul class="b-menu-list">
				<!--菜单内容-->
			</ul>
		</div>
		<div id="b-main-content" class="b-mian-content">
			<div class="b-public-load"></div>	
		</div>
		<script type="text/javascript" src="/moduleresources/core.web/resources/scripts/index.js" charset="utf-8"></script>
    </body>
</html>
