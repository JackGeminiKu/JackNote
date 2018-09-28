/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {
	$("pre>ol").each(function (index) {
		// 自动去除代码块前面的空格
		while ($(this).children("li:first").text().trim().length === 0) {
			$(this).children("li:first").remove();
		}

		// 自动去除代码块后面的空格
		while ($(this).children("li:last").text().trim().length === 0) {
			$(this).children("li:last").remove();
		}
	})

	// 自动替换转义字符
	function htmlEscape(s) {
		return s
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
	}

	var codeBlocks = document.getElementsByTagName("code");
	for (var i = 0; i < codeBlocks.length; ++i) {
		var codeBlock = codeBlocks[i].innerHTML;
		codeBlocks[i].innerHTML = htmlEscape(codeBlock);
	}
});