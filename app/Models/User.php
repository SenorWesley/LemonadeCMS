<?php

namespace App\Models;
use Auth;
use App\Models\Avatar;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    public static function countAvatars() {
        $user = \Auth::User()->id;

        $avatars = Avatar::where("user", "=", $user)->count();
        return $avatars;
    }

    public static function getAvatars() {
        $user = \Auth::User()->id;
        $avatars = Avatar::where(["user" => $user])->get();

        $info = [];
        foreach ($avatars as $avatar) {
            $info[] = ["name" => $avatar->username, "motto" => $avatar->motto, "look" => $avatar->look, "lastLogin" => $avatar->last_login, "sso" => $avatar->sso_ticket];
        }
        return $info;
    }
}
