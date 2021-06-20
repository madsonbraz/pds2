<?php

class Courses_model extends CI_Model{
    
    public function __construct(){
        parent:: __construct();
        $this->load->database();
    }
    
    public function get_data($id, $select = NULL){
        if(!empty($select)){
            $this->db->select($select);
        }
        $this->db->from("courses");
        $this->db->from("course_id", $id);
        return $this->db->get();
    }

    public function insert($data){
        $this->db->insert("courses",$data);
    }

    public function update($id, $data){
        $this->db->where("course_id", $id);
        $this->db->from("courses", $data);
    }

    public function delete($id){
        $this->db->where("course_id", $id);
        $this->db->delete("courses");
    }

    public function is_duplicated($field, $vakue, $id = NULL){
        if (!empty($id)){
             $this->db->where("course_id <>", $id);
        }
        $this->db->from("courses");
        $this->db->where($field, $value);
        return $this->db->get()->num_rows()>0;
    }
}
