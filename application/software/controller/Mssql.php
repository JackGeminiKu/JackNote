<?php

namespace app\software\controller;

use think\Controller;

class Mssql extends Controller {

	public function index($template = '') {
		return $this->fetch(str_replace('-', '/', $template));
	}

}
