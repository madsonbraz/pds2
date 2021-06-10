<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Restrito extends CI_Controller {

	public function index()
	{
		$data = array(
			"scripts" => array(
				"util.js",
				"login.js"
			)
			);
		$this->template->show('login.php',$data);
	}
	public function ajax_login(){
		
		$json = array();
		$json["status"] = 1;
		$json["error_list"] = array();

		$username = $this->input->post("username");
		$password = $this->input->post("passowrd");
		
		if (empty($username)){
			$json["status"]=0;
			$json["error_list"]["username"] = "Usuário não pode ser vazio!";
		} else {
			$this->load->model("users_model");
			$result = $this->users_model->get_user_data($username);
			if($result){
				$user_id = $result->user_id;
				$password_hash = $result->password_id;
				if(password_verify($password, $password_hash)){
					$this->session->set_userdata("user_id", $user_id);
				}else{
					$json["status"]=0;
				}
			}else{
				$json["status"]=0;
			}
			if($json["status"] == 0){
				$json["error_list"]["#btn_login"] = "Usuário e/ou senha inválidos!";
			}
		}
		echo json_encode($json);
	}
}
