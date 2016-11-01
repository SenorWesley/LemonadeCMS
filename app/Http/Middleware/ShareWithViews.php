<?php

namespace App\Http\Middleware;

use Closure;

class ShareWithViews
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $avatar = null;
        if (isset($_COOKIE["avatar"])) {
            $avatar = json_decode($_COOKIE["avatar"], true);
        }
        $config = json_decode(json_encode(include(dirname(dirname(dirname(dirname(__FILE__)))) . "/config/config.php"), true));
        view()->share("config", $config);
        view()->share("avatar", $avatar);
        return $next($request);
    }
}
