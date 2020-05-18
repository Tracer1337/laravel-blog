<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asset;
use Illuminate\Support\Facades\Storage;

function pathToArray($path) {
    // Split path by "/"
    $array = explode("/", $path);

    // Filter "//" and preserve indices
    $filtered = [];
    foreach(array_filter($array) as $item) {
        array_push($filtered, $item);
    }

    return $filtered;
}

class StorageController extends Controller
{
    /**
     * Get a file from storage
     */
    public function index($path, Request $request) {
        $params = pathToArray($path);

        if(count($params) < 2) {
            return response(null, 400);
        }

        $requested_type = $params[0];
        $requested_name = $params[1];

        if($requested_type == "assets") {
            $asset = Asset::where("filename", $requested_name)->first();
            return Storage::get($asset->path);
        }

        return response(null, 404);
    }
}
