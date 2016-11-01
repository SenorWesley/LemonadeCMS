<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            if (!\Config::get("config", "avatars")) {
                return redirect("/me");
            } else {
                if (isset($_COOKIE["avatar"])) {
                    echo "avatar";
                }
                return redirect("/chooseAvatar");
            }
        }

        return $next($request);
    }
}
