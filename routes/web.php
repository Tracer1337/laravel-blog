<?php

use Illuminate\Support\Facades\Route;


// Create react routes

$exclude_react_paths = ["api", "storage", "js"];

$converter = function($string) {
    return "(?!" . $string . ")";
};

$exclude_react_paths = array_map($converter, $exclude_react_paths);

$regex = "^(" . implode("", $exclude_react_paths) . ".)+?.*$";

Route::get('{path?}', function () {
    return view('react');
})->where("path", $regex);

Route::get("/storage/view/{path}", "StorageController@index")->where("path", ".+");

Route::get("/storage/download/{path}", "StorageController@download")->where("path", ".+");