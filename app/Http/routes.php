<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', "IndexController@index");
Route::get('/me', "MeController@index");
Route::get('/chooseAvatar', "AvatarController@index");
Route::get('/game', "ClientController@client");
Route::get("/client", function() { return redirect("/game"); });
Route::get("/login", function() { return redirect("/"); });
Route::get("/loguit", function() {
    \Auth::logout();
    return redirect("/");
});

Route::post("/chooseAvatar", "AvatarController@chooseAvatar");
Route::post("/login", "AuthenticationController@login");
