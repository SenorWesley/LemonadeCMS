<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use Illuminate\Http\Request;
use Config;
use App\Models\User;
use App\Http\Requests;

class AvatarController extends Controller
{
    public function index() {
        $avatar_setting = Config::get("config.avatars");
        $avatar_count = User::countAvatars();
        if (isset($_COOKIE["avatar"])) {
            return redirect("/me");
        } else {
            if (!$avatar_setting) {
                if ($avatar_count < 1) {
                    return view("chooseHabbo", ["avatars" => User::getAvatars(), "avatarCount" => 0, "maxAvatars" => 1]);
                }
            } else {
                return view("chooseHabbo", ["avatars" => User::getAvatars(), "avatarCount" => $avatar_count, "maxAvatars" => $avatar_setting, "avatarsLeft" => ( (int) $avatar_setting - (int) $avatar_count)]);
            }
        }
        return redirect("/");
    }

    public function chooseAvatar(Request $request) {
        $avatar = Avatar::where("sso_ticket", $request->input("avatar"))->first();


            setcookie("avatar", $avatar);

        return redirect("/me");
    }
}
