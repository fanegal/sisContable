<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    protected $table = 'core.users'; // tabla en BD
    public $timestamps = false; // si no tienes `created_at` y `updated_at`

    // si la PK no se llama 'id':
    // protected $primaryKey = 'tu_pk';

    //protected $fillable = ['name', 'email'];
}
