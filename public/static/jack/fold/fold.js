
// 初始化状态: 折叠or展开
$(function() {
	$(".summary").each(function(index) {
		if ($(this).attr("class").indexOf("open") != -1) {
			$(this).next().css("display","block");
		} else if ( $(this).attr("class").indexOf("closed") != -1) {
			$(this).next().css("display","none");
		}
	})
})

// 点击"标题"时, 折叠展开切换
$(function(){
	$(document).click(function (e) {
		var currentElement = $(e.target);
		var classes = currentElement.attr("class").split(" ");
		for(var i in classes) {
			if (classes[i] == "summary"){
				var $nextSiblin = currentElement.next();
				$nextSiblin.css("display", $nextSiblin.css("display") == "none"? "block" : "none");
				return;
			}
		}
	})
})