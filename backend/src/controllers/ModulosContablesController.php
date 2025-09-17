<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\ModulosContablesService;
use App\Dto\ApiResponse;
use App\Dto\PaginationParams;
use App\Utils\CaseConverter;

class ModulosContablesController
{
    protected $service;

    public function __construct()
    {
        $this->service = new ModulosContablesService();
    }

    public function getAll(Request $request, Response $response, array $args): Response
    {
        $items = $this->service->getAll();
        $camelData = CaseConverter::toCamelCaseArray($items->toArray());
        $response->getBody()->write(ApiResponse::success($camelData, 'Módulos contables obtenidos correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function getById(Request $request, Response $response, array $args): Response
    {
        try {
            $item = $this->service->getById((int)$args['id']);
            $camelData = CaseConverter::toCamelCaseArray($item->toArray());
            $response->getBody()->write(ApiResponse::success($camelData, 'Módulo contable encontrado'));
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response->getBody()->write(ApiResponse::error('Módulo contable no encontrado', 404));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
    }

    public function create(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $data = json_decode($content, true) ?? [];

        $snakeData = CaseConverter::toSnakeCaseArray($data);
        $item = $this->service->create($snakeData);

        $camelData = CaseConverter::toCamelCaseArray($item->toArray());
        $response->getBody()->write(ApiResponse::success($camelData, 'Módulo contable creado correctamente', 201));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $data = json_decode($content, true) ?? [];

        $snakeData = CaseConverter::toSnakeCaseArray($data);

        try {
            $item = $this->service->update($snakeData);
            $camelData = CaseConverter::toCamelCaseArray($item->toArray());
            $response->getBody()->write(ApiResponse::success($camelData, 'Módulo contable actualizado correctamente'));
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getPaginated(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $body = json_decode($content, true) ?? [];

        $params = new PaginationParams(is_array($body) ? $body : []);
        $data = $this->service->paginate($params);

        $camelData = CaseConverter::toCamelCaseArray($data);

        $response->getBody()->write(ApiResponse::success($camelData, 'Módulos contables paginados correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function deleteBulk(Request $request, Response $response, array $args): Response
    {
        $content = $request->getBody()->getContents();
        $body = json_decode($content, true) ?? [];

        if (!isset($body['ids']) || !is_array($body['ids'])) {
            throw new \App\Exceptions\BadRequestException('Debe proporcionar un array válido de IDs.');
        }

        $deletedCount = $this->service->deleteByIds($body['ids']);

        $camelData = CaseConverter::toCamelCaseArray(['deleted' => $deletedCount]);
        $response->getBody()->write(ApiResponse::success($camelData, 'Módulos contables eliminados correctamente'));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}
