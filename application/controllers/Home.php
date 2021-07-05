<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		$this->load->model("courses_model");
		$courses = $this->courses_model->show_course();
		
		$data = array(
			"scripts" => array(
				"owl.carousel.min.js",
				"theme-scripts.js"
			),
			"courses" => $courses
			);
		$this->template->show("home.php", $data);
	}
}
