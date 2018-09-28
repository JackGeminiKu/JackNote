// 折叠&展开初始化
$(function () {
	$("div.list").each(function (index) {
		// 添加序号或图标
		var classes = $(this).attr("class").split(" ");
		if ($.inArray("list-number", classes) != -1) {  // 数字
			$(this).children("div.title").each(function (index) {
				$(this).text(++index + ". " + $(this).text());
			})
		} else if ($.inArray("list-square", classes) != -1) {   // 方块
			$(this).children("div.title").each(function (index) {
				$(this).text("￭ " + $(this).text());
			})
		} else if ($.inArray("list-none", classes) != -1) {   // 无
			// 不需要添加数组或方块
		}

		// 初始状态
		$(this).children("div.content").each(function (index) {
			if ($(this).attr("class").indexOf("closed") != -1) {
				$(this).css("display", "none");
			}
		})
	})
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