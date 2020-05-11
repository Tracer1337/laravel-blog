<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Blogpost;
use App\Http\Resources\Blogpost as BlogpostResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Webpatser\Uuid\Uuid;
use Symfony\Component\HttpFoundation\File\File;
use App\Asset;
use Illuminate\Database\Eloquent\Builder;

function same_files($file_a, $file_b) {
    return filesize($file_a) == filesize($file_b) && md5_file($file_a) == md5_file($file_b);
}

function get_new_images($images, $existing_images) {
    if(count($existing_images) == 0) {
        return $images;
    }

    $new_images = [];

    $existing_image_paths = [];

    // Filter paths of existing images
    foreach($existing_images as $object) {
        $path = Storage::path($object->path);
        array_push($existing_image_paths, $path);
    }

    // Compare images to existing images
    foreach($images as $image) {
        $image_path = $image->getPathName();
        $is_new = true;
        
        foreach($existing_image_paths as $compare_path) {

            if(same_files($image_path, $compare_path)) {
                $is_new = false;
                break;
            }

        }

        if($is_new) {
            array_push($new_images, $image);
        }
    }

    return $new_images;
}

function delete_asset($filename) {
    $path = "public/blogpost-assets/" . $filename;

    if(!Storage::exists($path)) {
        return 404;
    }

    Storage::delete($path);

    Asset::where("filename", $filename)->delete();

    return 200;
}

function create_asset($data) {
    $filename = Uuid::generate()->string;
    $path = $data["file"]->storeAs("public/blogpost-assets", $filename);
    $url = Storage::url($path);

    // Create new asset
    $new_image = new Asset;
    $new_image->filename = $filename;
    $new_image->blogpost_id = $data["blogpost_id"];
    $new_image->path = $path;
    $new_image->url = $url;
    $new_image->type = $data["type"];

    return $new_image;
}

class BlogpostController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index", "show"]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $blogposts = Blogpost::whereNotNull("published_at")->orderBy("published_at", "desc")->limit(20)->get();
        $blogposts->makeHidden(["content"]);

        return BlogpostResource::collection($blogposts);
    }

    public function all(Request $request) {
        if(!$request->user()->can("get all blogposts")) {
            return response(null, 403);
        }

        $blogposts = Blogpost::all();
        $blogposts->makeHidden("content");

        return BlogpostResource::collection($blogposts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validated_data = $request->validate([
            "id" => "nullable|uuid",
            "title" => "required|max:255",
            "teaser" => "required|max:512",
            "topic_id" => "required|Integer",
            "content" => "required",
            "tag_ids" => "required|Array",
            "cover" => "nullable|image",
            "images" => "nullable|Array"
        ]);

        $isUpdate = $request->input("method_put");
        $blogpost = $isUpdate ? Blogpost::findOrFail($request->id) : new Blogpost;
        $user = $request->user();

        // Check permission
        if(!$user->can("create blogposts")) {
            return response(null, 403);
        }

        if($isUpdate && $blogpost->user()->get()[0]->id != $user->id) {
            return response(null, 403);
        }

        // Assign transmitted data
        $skip_keys = ["tag_ids", "cover", "images"];

        foreach($validated_data as $key => $value) {
            if(!in_array($key, $skip_keys)) {
                $blogpost->{$key} = $value;
            }
        }

        $blogpost->user_id = $user->id;

        // Publish post if flag is set
        if($request->publish) {
            $blogpost->published_at = Carbon::now();
        }

        if($user->can("store files")) {
            // Store cover image
            if(isset($validated_data["cover"])) {
                // Check if cover is new
                $store_images = get_new_images([$validated_data["cover"]], $blogpost->assets);

                // Store cover
                if(isset($store_images[0])) {
                    $new_cover = create_asset([
                        "file" => $store_images[0],
                        "blogpost_id" => $blogpost->id,
                        "type" => "cover"
                    ]);

                    $new_cover->save();
                }
            }

            // Store images array
            if(isset($validated_data["images"])) {
                $new_images = $blogpost->assets;

                // Filter new images
                $store_images = get_new_images($validated_data["images"], $blogpost->assets);

                // Store images from array
                foreach($store_images as $image) {
                    $new_image = create_asset([
                        "file" => $image,
                        "blogpost_id" => $blogpost->id,
                        "type" => "image"
                    ]);

                    $new_image->save();
                }
            }
        }

        // Store post in database
        if($blogpost->save()) {
            $blogpost->tags()->sync($validated_data["tag_ids"]);
            return new BlogpostResource($blogpost);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request) {
        $blogpost = Blogpost::findOrFail($id);

        $relations = [];
        
        // Get posts with one of requested posts tags
        $tags = $blogpost->tags()->select("tags.id")->get();
        $related_posts = Blogpost::whereNotNull("published_at")
                            ->where("id", "!=", $blogpost->id)
                            ->whereHas("tags", function(Builder $query) use ($tags) {
                                $query->whereIn("tags.id", $tags);
                            })
                            ->orderBy("published_at", "DESC")
                            ->limit(5)
                            ->get();

        $related_posts->makeHidden(["content"]);

        foreach($related_posts as $related_post) {
            $resource = new BlogpostResource($related_post);
            array_push($relations, $resource);
        }

        $blogpost->relations = $relations;
        $blogpost->recommendations;

        foreach($blogpost->comments as $comment) {
            $comment->user;
        }

        if(!$blogpost->published_at && (!$request->user() || $blogpost->user->id != $request->user()->id)) {
            return response(null, 401);
        }

        return new BlogpostResource($blogpost);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request) {
        $blogpost = BlogPost::findOrFail($id);
        $user = $request->user();

        if($blogpost->user_id != $user->id && !$user->can("delete any blogpost")) {
            return response(null, 403);
        }

        if($blogpost->delete()) {
            // Delete all assets associated with this post
            $assets = Asset::where("blogpost_id", $blogpost->id)->get();

            foreach($assets as $asset) {
                delete_asset($asset->filename);
            }
            
            return new BlogpostResource($blogpost);
        }
    }

    public function delete_asset($filename, Request $request) {
        $user = $request->user();

        if(!$user->can("delete files")) {
            return response(null, 403);
        }

        $response_code = delete_asset($filename);

        return response(null, $response_code);
    }

    public function like(Request $request) {
        $blogpost = BlogPost::findOrFail($request->id);
        $user = $request->user();

        if($blogpost->user->id == $user->id || !$user->can("like blogposts")) {
            return response(null, 403);
        }

        $blogpost->likes()->attach($user);

        return response(null, 200);
    }

    public function recommend($id, Request $request) {
        $user = $request->user();

        if(!$user->can("recommend blogposts")) {
            return response(null, 403);
        }

        $blogpost = Blogpost::findOrFail($id);
        $isDelete = $request->isMethod("delete");

        if($isDelete) {
            $blogpost->recommendations()->detach($user);
        } else {
            $blogpost->recommendations()->sync($user);
        }

        return response(null, 200);
    } 
}
