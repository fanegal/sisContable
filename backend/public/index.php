<?php
use Slim\Factory\AppFactory;
//controllers
use App\Controllers\UserController;
use App\Controllers\AuthController;
use App\Middleware\AuthMiddleware;
use Slim\Middleware\ErrorMiddleware;
use App\Middleware\CustomErrorHandler;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/config/Database.php';

$app = AppFactory::create();

$app->add(function ($request, $handler) {
    if ($request->getMethod() === "OPTIONS") {
        $response = new \Slim\Psr7\Response();
        return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    }

    $response = $handler->handle($request);

    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});


// Rutas
$app->post('/user/login', [AuthController::class, 'login']);
$app->post('/auth/token', [AuthController::class, 'getToken']);
$app->post('/auth/updateToken', [AuthController::class, 'updateToken']);
$app->post('/user/paginated', [UserController::class, 'getPaginated']);

$app->group('/user', function($group) {
    $group->get('', [UserController::class, 'getAll']);
    $group->get('/{id}', [UserController::class, 'getById']);
    $group->post('', [UserController::class, 'create']);
    $group->put('', [UserController::class, 'update']);
    $group->delete('', [UserController::class, 'deleteBulk']);
    $group->post('/bulk-upload', [UserController::class, 'bulkUpload']);
})->add(new AuthMiddleware());

$app->group('/modulos-contables', function($group) {
    $group->get('', [UserController::class, 'getAll']);
    $group->get('/{id}', [UserController::class, 'getById']);
    $group->post('', [UserController::class, 'create']);
    $group->put('', [UserController::class, 'update']);
    $group->delete('', [UserController::class, 'deleteBulk']);
    $group->post('/bulk-upload', [UserController::class, 'bulkUpload']);
})->add(new AuthMiddleware());

// Middleware de errores global
$customErrorHandler = new CustomErrorHandler(
    $app->getCallableResolver(),
    $app->getResponseFactory()
);

$errorMiddleware = new ErrorMiddleware(
    $app->getCallableResolver(),
    $app->getResponseFactory(),
    true,  // Mostrar detalles en desarrollo
    false,
    false
);
$errorMiddleware->setDefaultErrorHandler($customErrorHandler);
$app->add($errorMiddleware);

$app->run();
