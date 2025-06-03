<?php
namespace App\Controllers;

use App\Daos\UserDao;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Dto\ApiResponse;

class AuthController {
    public function getToken( Request $request, Response $response, array $args ): Response {
        $body = $request->getBody()->getContents();
        $data = json_decode( $body, true );

        $username = $data[ 'username' ] ?? null;
        $password = $data[ 'password' ] ?? null;

        if ( !$username || !$password ) {
            $response->getBody()->write( ApiResponse::error( 'Username y contraseña requeridos', 400 ) );
            return $response->withStatus( 400 )->withHeader( 'Content-Type', 'application/json' );
        }

        $userDao = new UserDao();
        $user = $userDao->findUser( $username, $password );

        if ( !$user ) {
            $response->getBody()->write( ApiResponse::error( 'Credenciales inválidas', 401 ) );
            return $response->withStatus( 401 )->withHeader( 'Content-Type', 'application/json' );
        }

        $payload = [
            'sub' => $user->id,
            'username' => $user->username,
            'iat' => time(),
            'exp' => time() + ( 60 * 60 ), // 1 hora de expiración
        ];

        $jwt = JWT::encode( $payload, $_ENV[ 'JWT_SECRET' ], 'HS256' );

        $response->getBody()->write( ApiResponse::success( [ 'token' => $jwt ], 'Token generado correctamente' ) );
        return $response->withStatus( 200 )->withHeader( 'Content-Type', 'application/json' );
    }
}
