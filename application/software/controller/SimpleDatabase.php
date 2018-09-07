<?php

namespace app\software\controller;

use think\Controller;

class SimpleDatabase extends Controller {

	public function index($template = '') {
		return $this->fetch(str_replace('-', '/', $template));
	}

}
