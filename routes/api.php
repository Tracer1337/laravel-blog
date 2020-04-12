<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// List blogposts
Route::get("/blogposts", "BlogpostController@index");

// Show single blogposts
Route::get("/blogpost/{id}", "BlogpostController@show");

// Create new blogposts
Route::post("/blogpost", "BlogpostController@store");

// Update blogposts
Route::put("/blogpost", "BlogpostController@store");

// Delete blogposts
Route::delete("/blogpost/{id}", "BlogpostController@destroy");

Route::group(["prefix" => "auth", "middleware" => ["api"]], function () {
    Route::post("login", "AuthController@login");
    Route::post("logout", "AuthController@logout");
    Route::post("register", "AuthController@register");
    Route::post("profile", "AuthController@profile");
});
  