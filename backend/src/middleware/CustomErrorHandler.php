<?php
namespace App\Middleware;

use Slim\Handlers\ErrorHandler;
use Psr\Http\Message\ResponseInterface as Response;

class CustomErrorHandler extends ErrorHandler {
    protected function respond(): Response {
        $exception = $this->exception;

        $response = $this->responseFactory->createResponse();
        $response->getBody()->write(json_encode([
            'code' => 500,
            'status' => 'error',
            'message' => 'Ocurrió un error inesperado',
            'details' => $exception->getMessage() // quitar para producción
        ]));

        return $response->withHeader('Content-Type', 'application/json')
                        ->withStatus(500);
    }
}
