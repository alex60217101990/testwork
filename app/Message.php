<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $guard_name = 'web';
    protected $table = '_message';
    protected $fillable =
        ['id', 'user_id', 'body_massage', 'created_at', 'updated_at'];
}
