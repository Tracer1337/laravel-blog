<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asset;
use App\Http\Resources\Asset as AssetResource;
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
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index"]]);
    }

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

    /**
     * API Methods
     */

    /**
     * Get all assets
     */
    public function api_assets(Request $request) {
        if(!$request->user()->can("view all files")) {
            return response(null, 403);
        }

        $assets = Asset::Paginate(20);

        return AssetResource::collection($assets);
    }

    /**
     * Delete asset
     */
    public function api_delete_asset($filename, Request $request) {
        if(!$request->user()->can("delete any file")) {
            return response(null, 403);
        }

        $response_code = delete_asset($filename);
        
        return response(null, $response_code);
    }
}
