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

// Blogposts

Route::get("/blogposts", "BlogpostController@index");

Route::get("/blogpost/{id}", "BlogpostController@show");

Route::post("/blogpost", "BlogpostController@store");

Route::put("/blogpost", "BlogpostController@store");

Route::delete("/blogpost/{id}", "BlogpostController@destroy");

// Topics

Route::get("/topics", "TopicsController@index");

// Tags

Route::get("/tags", "TagsController@index");

// Comments

Route::post("/comment", "CommentsController@store");

Route::put("/comment", "CommentsController@store");

Route::delete("/comment/{id}", "CommentsController@destroy");

// Authentication

Route::group(["prefix" => "auth", "middleware" => ["api"]], function () {
    Route::post("login", "AuthController@login");

    Route::post("logout", "AuthController@logout");

    Route::post("register", "AuthController@register");

    Route::get("profile", "AuthController@profile");
});