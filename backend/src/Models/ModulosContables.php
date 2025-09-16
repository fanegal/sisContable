<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModulosContables extends Model {
    protected $table = 'sisContable.modulos_contables';
    public $timestamps = false; 

    protected $fillable = [
        'created',
        'file_name',
        'ente',
        'year',
        'type',
        'status',
        'json_data',
    ];
}
