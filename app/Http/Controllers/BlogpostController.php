<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Blogpost;
use App\Http\Resources\Blogpost as BlogpostResource;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\File\File;
use App\Asset;
use Illuminate\Database\Eloquent\Builder;

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
        $blogposts = Blogpost::whereNotNull("published_at")->orderBy("published_at", "DESC")->limit(20)->get();
        $blogposts->makeHidden(["content"]);

        return BlogpostResource::collection($blogposts);
    }

    public function all(Request $request) {
        if(!$request->user()->can("get all blogposts")) {
            return response(null, 403);
        }

        $blogposts = Blogpost::orderBy("published_at", "DESC")->Paginate(50);
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
            "tag_ids" => "nullable|Array",
            "cover" => "nullable|image",
            "images" => "nullable|Array",
            "cover->gradient" => "nullable|string"
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
        $skip_keys = ["tag_ids", "cover", "images", "cover-gradient", "cover->gradient"];

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
                if(!$validated_data["cover"]->isValid()) {
                    return response(null, 422);
                }

                // Check if cover is new
                $store_images = get_new_files([$validated_data["cover"]], $blogpost->assets->toArray());

                // Store data
                if(isset($store_images[0])) {
                    // Store cover
                    $new_cover = create_asset([
                        "file" => $store_images[0],
                        "blogpost_id" => $blogpost->id,
                        "type" => "cover",
                        "user_id" => $user->id
                    ]);

                    $new_cover->save();
                }
            }

            // Store cover metadata
            if(isset($validated_data["cover->gradient"])) {
                // Create meta array
                $meta = json_encode([
                    "gradient" => $validated_data["cover->gradient"] ?? ""
                ]);

                // Save metadata to cover
                $cover = $blogpost->assets()->where("type", "cover")->first();
                if($cover) {
                    $cover->meta = $meta;
                    $cover->save();
                }
            }
            

            // Store images array
            if(isset($validated_data["images"])) {
                foreach($validated_data["images"] as $image) {
                    if(!$image->isValid()) {
                        return response(null, 422);
                    }
                }

                // Filter new images
                $store_images = get_new_files($validated_data["images"], $blogpost->assets->toArray());

                // Store images from array
                foreach($store_images as $image) {
                    $new_image = create_asset([
                        "file" => $image,
                        "blogpost_id" => $blogpost->id,
                        "type" => "image"
                    ], $user);

                    $new_image->save();
                }
            }
        }

        // Store post in database
        if($blogpost->save()) {
            // Store tags
            if(isset($validated_data["tag_ids"])) {
                $blogpost->tags()->sync($validated_data["tag_ids"]);
            }

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
