<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Blogposts

Route::get("/blogposts", "BlogpostController@index");

Route::get("/blogposts/all", "BlogpostController@all");

Route::get("/blogpost/{id}", "BlogpostController@show");

Route::post("/blogpost", "BlogpostController@store");

Route::put("/blogpost", "BlogpostController@store");

Route::delete("/blogpost/{id}", "BlogpostController@destroy");

Route::delete("/blogpost/asset/{filename}", "BlogpostController@delete_asset");

Route::post("/blogpost/like", "BlogpostController@like");

Route::put("/blogpost/recommend/{id}", "BlogpostController@recommend");

Route::delete("/blogpost/recommend/{id}", "BlogpostController@recommend");

// Topics

Route::get("/topics", "TopicsController@index");

Route::post("/topics", "TopicsController@store");

Route::put("/topics", "TopicsController@store");

Route::delete("/topics/{id}", "TopicsController@destroy");

// Tags

Route::get("/tags", "TagsController@index");

Route::post("/tags", "TagsController@store");

Route::put("/tags", "TagsController@store");

Route::delete("/tags/{id}", "TagsController@destroy");

// Comments

Route::post("/comment", "CommentsController@store");

Route::put("/comment", "CommentsController@store");

Route::delete("/comment/{id}", "CommentsController@destroy");

// User

Route::get("/user/{id}", "UserController@index");

Route::get("/users/all", "UserController@all");

Route::post("/user/follow", "UserController@follow");

Route::post("/user/unfollow", "UserController@unfollow");

Route::get("/user/follows/{id}", "UserController@follows");

Route::put("/user", "UserController@update");

Route::delete("/user/{id}", "UserController@destroy");

// Roles

Route::post("/user/role", "UserController@assign_role");

Route::get("/roles", "UserController@roles");

// Authentication

Route::group(["prefix" => "auth", "middleware" => ["api"]], function () {
    Route::post("login", "AuthController@login");

    Route::post("logout", "AuthController@logout");

    Route::post("register", "AuthController@register");
});

// Profile

Route::get("profile", "AuthController@profile");

Route::post("profile", "AuthController@update");

Route::get("profile/blogposts", "AuthController@blogposts");

Route::get("profile/comments", "AuthController@comments");

Route::get("profile/subscriptions", "AuthController@subscriptions");