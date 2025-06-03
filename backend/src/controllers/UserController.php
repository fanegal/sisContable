<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\UserService;
use App\Dto\ApiResponse;

class UserController {
    protected $userService;

    public function __construct() {
        $this->userService = new UserService();
    }

    public function getAll(Request $request, Response $response, array $args): Response {
        $users = $this->userService->getAllUsers();
        $response->getBody()->write(ApiResponse::success($users, 'Usuarios obtenidos correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function getById(Request $request, Response $response, array $args): Response {
        $user = $this->userService->getUserById($args['id']);
        if (!$user) {
            $response->getBody()->write(ApiResponse::error('Usuario no encontrado', 404));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        $response->getBody()->write(ApiResponse::success($user, 'Usuario encontrado'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response, array $args): Response {
        $data = $request->getParsedBody();
        $user = $this->userService->createUser($data);
        $response->getBody()->write(ApiResponse::success($user, 'Usuario creado correctamente', 201));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
