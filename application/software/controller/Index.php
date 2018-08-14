<?php

namespace app\software\controller;

use think\Controller;

class Index extends Controller {

	public function index($template = '') {
		if ($template == '') {
			return $this->fetch('index/index');
		} else {
			return $template;
			return $this->fetch($template);
		}
	}

}
