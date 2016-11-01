<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests;
use App\Models\User;
use Auth;
use Config;

/**
 * Class AuthenticationController
 * @package App\Http\Controllers\Authentication.
 * @autor Finicky
 *
 *-------------------------------------------------------
 *  This class is handling user actions, for example: Login and registration.
 */

class AuthenticationController extends Controller
{
    /**
     * @var $user
     */
    protected $user;

    /**
     * @param $user
     * Create a new class instance.
     */
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * @param LoginRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * Logs in a user if validation passes, else it sends them back.
     */
    public function login(LoginRequest $request) {
        $credentials = [
            "email" => $request->input('email'),
            "password" => $request->input('password')
        ];

        if (Auth::attempt($credentials)) {
            if (!Config::get("config", "avatars"))
                return redirect("/me");
            else {
                if (isset($_COOKIE["avatar"]))
                    echo "avatar";


                return redirect("/chooseAvatar");
            }
        }


        return back()->withInput()->withErrors([
            "login" => "De ingevulde gegevens komen niet over een met het systeem!"
        ]);
    }

}
