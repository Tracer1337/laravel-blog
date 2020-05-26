<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Blogpost as BlogpostResource;
use App\Feature;

class FeaturedController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index"]]);
    }

    /**
     * Get the featured blogpost if there is any
     */
    public function index(Request $request) {
        $feature_data = Feature::all()->first();
        
        if(!$feature_data) {
            return response(null, 404);
        }

        $blogpost = $feature_data->blogpost;
        $blogpost->makeHidden("content");

        return [
            "blogpost" => new BlogpostResource($blogpost),
            "content" => $feature_data->content
        ];
    }

    /**
     * Set featured blogpost
     */
    public function create_featured(Request $request) {
        $user = $request->user();

        if(!$user->can("create features")) {
            return response(null, 403);
        }

        $validated_data = $request->validate([
            "blogpost_id" => "required|uuid",
            "content" => "required"
        ]);

        // Check if there already is a featured post
        $current_feature = Feature::all()->first();

        if($current_feature) {
            // Delete current feature
            $current_feature->delete();
        }

        // Create new feature
        $new_feature = new Feature();
        $new_feature->blogpost_id = $validated_data["blogpost_id"];
        $new_feature->content = $validated_data["content"];

        if($new_feature->save()) {
            return response(null, 200);
        }

        return response(null, 500);
    }

    /**
     * Remove featured post
     */
    public function remove_featured(Request $request) {
        $user = $request->user();

        if(!$user->can("delete features")) {
            return response(null, 403);
        }
        
        // Delete feature
        if(Feature::all()->first()->delete()) {
            return response(null, 200);
        }

        return response(null, 500);
    }
}
