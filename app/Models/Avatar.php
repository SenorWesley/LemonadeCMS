<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;


class Avatar extends Model
{
    protected $collection = "avatars";
    protected $primaryKey = "user";
    protected $fillable = [
        "user", "username"
    ];
    protected $user;





}
