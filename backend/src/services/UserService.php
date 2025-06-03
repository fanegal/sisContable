<?php
namespace App\Services;

use App\Daos\UserDao;

class UserService {
    protected $userDao;

    public function __construct() {
        $this->userDao = new UserDao();
    }

    public function getAllUsers() {
        return $this->userDao->findAll();
    }

    public function getUserById($id) {
        return $this->userDao->findById($id);
    }

    public function createUser(array $data) {
        return $this->userDao->create($data);
    }
}