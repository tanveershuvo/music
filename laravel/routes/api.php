<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::resource("/songs", "SongController", ["only" => ["index", "show", "store", "update", "destroy"]]);
Route::get("/search/{query}", "SongController@search");

Route::post("/register", "UserController@register");
Route::post("/me", "UserController@me")->middleware("auth:api");
Route::get("/user/{slug}", "UserController@songs");
Route::post("/user/settings", "UserController@settings")->middleware("auth:api");
Route::post("/user/password", "UserController@password")->middleware("auth:api");

Route::get("/users", "UserController@users");                  