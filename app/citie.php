<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;
class citie extends Model
{
    use HasRoles;

    protected $guard_name = 'web';


    protected $table = 'cities';
    protected $fillable = [
        'city', 'img', 'population', 'region',
    ];
}
