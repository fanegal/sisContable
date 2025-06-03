<?php
namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class AuthMiddleware {
    public function __invoke(Request $request, Response $response, callable $next): Response {
        $authHeader = $request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $authHeader);

        if (!$token) {
            $response->getBody()->write(ApiResponse::error('Token no proporcionado', 401));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $request = $request->withAttribute('user', $decoded);
        } catch (\Throwable $e) {
            $response->getBody()->write(ApiResponse::error('Token inválido o expirado', 401));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        return $next($request, $response);
    }
}
