<?php
namespace app\software\controller;

use think\Controller;

class FrontEnd extends Controller
{
    public function index($template = '')
    {       
        return $this->fetch(str_replace('-', '/', $template));
    }
}
