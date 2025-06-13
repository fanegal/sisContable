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

// Rutas

$app->post('/auth/token', [AuthController::class, 'getToken']);
$app->post('/auth/updateToken', [AuthController::class, 'updateToken']);

$app->group('/user', function($group) {
    $group->get('', [UserController::class, 'getAll']);
    $group->post('/paginated', [UserController::class, 'getPaginated']);
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
