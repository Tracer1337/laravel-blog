<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$exclude_react_paths = ["api", "storage", "js"];

$converter = function($string) {
    return "(?!" . $string . ")";
};

$exclude_react_paths = array_map($converter, $exclude_react_paths);

$regex = "^(" . implode("|", $exclude_react_paths) . ".)*$";

Route::get('{path?}', function () {
    return view('react');
})->where("path", $regex);