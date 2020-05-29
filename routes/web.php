<?php

use Illuminate\Support\Facades\Route;
use App\Helpers\Metadata;


// Create react routes

$exclude_react_paths = ["api", "storage", "js", "sitemap"];

$converter = function($string) {
    return "(?!" . $string . ")";
};

$exclude_react_paths = array_map($converter, $exclude_react_paths);

$regex = "^(" . implode("", $exclude_react_paths) . ".)+?.*$";

Route::get('{path?}', function () {
    // Generate metadata for SEO
    $meta = Metadata::generate();

    return view('react', [
        "meta" => $meta
    ]);
})->where("path", $regex);

Route::get("/storage/view/{path}", "StorageController@index")->where("path", ".+");

Route::get("/storage/download/{path}", "StorageController@download")->where("path", ".+");

Route::get("/sitemap", "SitemapController@index");