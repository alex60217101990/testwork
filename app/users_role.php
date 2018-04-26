<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class users_role extends Model
{
    //
    protected $table = 'users_roles';
    protected $fillable = [
        'role_name', 'role_code', 'user_id',
    ];
}
