<?php

namespace App\Daos;

use App\Models\ModulosContables;
use App\Dto\PaginationParams;
use App\Exceptions\BadRequestException;
use App\Exceptions\NotFoundException;

class ModulosContablesDao
{
    public function findAll()
    {
        return ModulosContables::query()->get();
    }

    public function findById(int $id, array $fields = ['*'])
    {
        $modulo = ModulosContables::query()
            ->select($fields)
            ->where('id', $id)
            ->first();

        if (!$modulo) {
            throw new NotFoundException("Módulo contable no encontrado");
        }

        return $modulo;
    }

    public function create(array $data)
    {
        if (!isset($data['file_name'])) {
            throw new BadRequestException("El campo 'file_name' es obligatorio");
        }

        if (isset($data['json_data']) && is_array($data['json_data'])) {
            $data['json_data'] = json_encode($data['json_data'], JSON_UNESCAPED_UNICODE);
        }

        return ModulosContables::create($data);
    }

    public function update(array $data)
    {
        if (empty($data['id'])) {
            throw new BadRequestException("El campo 'id' es obligatorio para actualizar");
        }

        $modulo = ModulosContables::find($data['id']);
        if (!$modulo) {
            throw new NotFoundException("Módulo contable no encontrado");
        }

        if (isset($data['json_data']) && is_array($data['json_data'])) {
            $data['json_data'] = json_encode($data['json_data'], JSON_UNESCAPED_UNICODE);
        }

        $modulo->fill($data);
        $modulo->save();

        return $modulo;
    }

    public function deleteByIds(array $ids): int
    {
        return ModulosContables::whereIn('id', $ids)->delete();
    }

    public function paginate(PaginationParams $params)
    {
        $query = ModulosContables::query();

        if ($params->fields !== null) {
            $query->select($params->fields);
        }

        foreach ($params->filters as $field => $value) {
            if (is_array($value)) {
                if (isset($value['from'])) {
                    $query->where($field, '>=', $value['from']);
                }
                if (isset($value['to'])) {
                    $query->where($field, '<=', $value['to']);
                }
            } else {
                if (is_string($value)) {
                    if ($params->filterLogic === 'or') {
                        $query->orWhere($field, 'ILIKE', "%$value%");
                    } else {
                        $query->where($field, 'ILIKE', "%$value%");
                    }
                } else {
                    if ($params->filterLogic === 'or') {
                        $query->orWhere($field, '=', $value);
                    } else {
                        $query->where($field, '=', $value);
                    }
                }
            }
        }

        foreach ($params->fixedFilters as $field => $value) {
            $query->where($field, '=', $value);
        }

        $query->orderBy($params->orderBy, $params->orderDir);

        $total = $query->count();
        $items = $query->offset($params->offset())
            ->limit($params->limit)
            ->get();

        return [
            'items' => $items,
            'pagination' => [
                'page' => $params->page,
                'limit' => $params->limit,
                'total' => $total,
                'pages' => (int) ceil($total / $params->limit),
            ],
        ];
    }
}
