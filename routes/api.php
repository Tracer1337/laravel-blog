<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Blogposts

Route::get("/blogposts", "BlogpostController@index");

Route::get("/blogposts/all", "BlogpostController@all");

Route::get("/blogpost/{slug}", "BlogpostController@show");

Route::post("/blogpost", "BlogpostController@store");

Route::put("/blogpost", "BlogpostController@store");

Route::delete("/blogpost/{id}", "BlogpostController@destroy");

Route::delete("/blogpost/asset/{filename}", "BlogpostController@delete_asset");

Route::post("/blogpost/like", "BlogpostController@like");

Route::put("/blogpost/recommend/{id}", "BlogpostController@recommend");

Route::delete("/blogpost/recommend/{id}", "BlogpostController@recommend");

// Topics

Route::get("/topics", "TopicsController@index");

Route::get("/topics/{id}", "TopicsController@get_specific");

Route::get("/topics/{id}/blogposts", "TopicsController@blogposts");

Route::post("/topics", "TopicsController@store");

Route::delete("/topics/{id}", "TopicsController@destroy");

// Tags

Route::get("/tags", "TagsController@index");

Route::get("/tags/{id}", "TagsController@get_specific")->where("id", "^[0-9]+$");

Route::get("/tags/blogposts", "TagsController@blogposts");

Route::post("/tags", "TagsController@store");

Route::delete("/tags/{id}", "TagsController@destroy");

// Comments

Route::post("/comment", "CommentsController@store");

Route::put("/comment", "CommentsController@store");

Route::delete("/comment/{id}", "CommentsController@destroy");

// User

Route::get("/user/{username}", "UserController@index");

Route::get("/users/all", "UserController@all");

Route::post("/user/follow", "UserController@follow");

Route::post("/user/unfollow", "UserController@unfollow");

Route::get("/user/follows/{username}", "UserController@follows");

Route::put("/user", "UserController@update");

Route::delete("/user/{id}", "UserController@destroy");

// Roles

Route::post("/roles/user", "UserController@assign_role");

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

// Search

Route::get("search", "SearchController@index");

// Storage

Route::get("storage/assets", "StorageController@api_assets");

Route::delete("storage/asset/{filename}", "StorageController@api_delete_asset");

// Configuration

Route::get("config", "ConfigController@index");

// Featured Blogpost

Route::get("featured", "FeaturedController@index");

Route::post("featured/create", "FeaturedController@create_featured");

Route::post("featured/remove", "FeaturedController@remove_featured");