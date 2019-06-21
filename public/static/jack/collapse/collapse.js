// 折叠&展开初始化
$(function () {
	var divList = $("div.list")[0];
	addListNumber("", divList);
	showOutline(divList);
//	$("div.list").each(function (index) {
//		// 添加序号或图标
//		var classes = $(this).attr("class").split(" ");
//		if ($.inArray("list-number", classes) != -1) {  // 数字
//			$(this).children("div.title").each(function (index) {
//				$(this).text(++index + ". " + $(this).text());
//			})
//		} else if ($.inArray("list-square", classes) != -1) {   // 方块
//			$(this).children("div.title").each(function (index) {
//				$(this).text("￭ " + $(this).text());
//			})
//		} else if ($.inArray("list-none", classes) != -1) {   // 无
//			// 不需要添加数组或方块
//		}
//
//		// 初始状态
//		$(this).children("div.content").each(function (index) {
//			if ($(this).attr("class").indexOf("closed") != -1) {
//				$(this).css("display", "none");
//			}
//		})
//	})
})

// 点击title时, 折叠|展开content
$(function () {
	$(document).click(function (e) {
		var currentElement = $(e.target);
		var classes = currentElement.attr("class").split(" ");
		if ($.inArray("title", classes) != -1) {
			var nextSiblin = currentElement.next();
			classes = nextSiblin.attr("class").split(" ");
			if ($.inArray("content", classes) != -1) {
				nextSiblin.css("display", nextSiblin.css("display") == "none" ? "block" : "none");
				return;
			}
		}
	})
})

function addListNumber(prefix, divList) {
	var titles = $(divList).children("div.title");
	var contents = $(divList).children("div.content");
	for (var i = 0; i < titles.length; ++i) {
		var subPrefix = prefix == "" ? (i + 1) : (prefix + "." + (i + 1));
		var title = titles[i];
		$(title).text(subPrefix + " " + $(title).text());
		$(title).attr("id", "title_" + subPrefix);
		$(title).attr("name", "title_" + subPrefix);

		// 处理子节点
		var content = contents[i];
		var subDivList = $(content).children("div.list")[0];
		if (subDivList) {
			addListNumber(subPrefix, subDivList);
		}
	}
}

function showOutline(divList) {
	var titles = $(divList).find("div.title");
	for (var i = 0; i < titles.length; ++i) {
		var title = $(titles[i]).text();
		var titleElment;
		if ($(titles[i]).text().indexOf(".") == -1) {
			titleElement = $('<div class="text-strong" title="' + title + '">' + title + "</div>");
		} else {
			titleElement = $("<div title='" + title + "'>" + title + "</div>");
		}
		titleElement.appendTo("#outline");

		titleElement.click(function () {
			var id = "title_" + $(this).text().split(" ")[0];
			var pos = getElementPosition(document.getElementById(id));
			if (!moveScrollBar(pos.top, 10))
				return false;
		});
	}
}

/*
 获取元素位置，距浏览器左边界的距离（left）和距浏览器上边界的距离（top）
 */
function getElementPosition(ele) {
	var topPosition = 0;
	var leftPosition = 0;
	while (ele) {
		topPosition += ele.offsetTop;
		leftPosition += ele.offsetLeft;
		ele = ele.offsetParent;
	}
	return {top: topPosition, left: leftPosition};
}

/*
 获取滚动条当前位置
 */
function getScrollBarPosition() {
	var scrollBarPosition = document.body.scrollTop || document.documentElement.scrollTop;
	return  scrollBarPosition;
}

/*
 移动滚动条，finalPos 为目的位置，internal 为移动速度
 */
function moveScrollBar(finalpos, interval) {
	//若不支持此方法，则退出
	if (!window.scrollTo) {
		return false;
	}

	//窗体滚动时，禁用鼠标滚轮
	window.onmousewheel = function () {
		return false;
	};

	//清除计时
	if (document.body.movement) {
		clearTimeout(document.body.movement);
	}

	var currentpos = getScrollBarPosition();//获取滚动条当前位置

	var dist = 0;
	if (currentpos == finalpos) {//到达预定位置，则解禁鼠标滚轮，并退出
		window.onmousewheel = function () {
			return true;
		}
		return true;
	}
	if (currentpos < finalpos) {//未到达，则计算下一步所要移动的距离
		dist = Math.ceil((finalpos - currentpos) / 10);
		currentpos += dist;
	}
	if (currentpos > finalpos) {
		dist = Math.ceil((currentpos - finalpos) / 10);
		currentpos -= dist;
	}

	var scrTop = getScrollBarPosition();//获取滚动条当前位置
	window.scrollTo(0, currentpos);//移动窗口
	if (getScrollBarPosition() == scrTop)//若已到底部，则解禁鼠标滚轮，并退出
	{
		window.onmousewheel = function () {
			return true;
		}
		return true;
	}

	//进行下一步移动
	var repeat = "moveScrollBar(" + finalpos + "," + interval + ")";
	document.body.movement = setTimeout(repeat, interval);
}
