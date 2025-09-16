<?php
namespace App\Services;

use App\Daos\ModulosContablesDao;
use App\Dto\PaginationParams;
use App\Exceptions\BadRequestException;

class ModulosContablesService
{
    protected $dao;

    public function __construct()
    {
        $this->dao = new ModulosContablesDao();
    }

    public function getAll()
    {
        return $this->dao->findAll();
    }

    public function getById(int $id)
    {
        return $this->dao->findById($id, [
            'id',
            'created',
            'file_name',
            'ente',
            'year',
            'type',
            'status',
            'json_data',
        ]);
    }

    public function create(array $data)
    {
        if (empty($data['file_name'])) {
            throw new BadRequestException("El campo 'file_name' es obligatorio");
        }

        if (isset($data['year']) && !is_numeric($data['year'])) {
            throw new BadRequestException("El campo 'year' debe ser numérico");
        }

        $data['created'] = $data['created'] ?? date('Y-m-d H:i:s');

        return $this->dao->create($data);
    }

    public function update(array $data)
    {
        if (isset($data['year']) && !is_numeric($data['year'])) {
            throw new BadRequestException("El campo 'year' debe ser numérico");
        }

        return $this->dao->update($data);
    }

    public function paginate(PaginationParams $params)
    {
        return $this->dao->paginate($params);
    }

    public function deleteByIds(array $ids): int
    {
        return $this->dao->deleteByIds($ids);
    }
}
