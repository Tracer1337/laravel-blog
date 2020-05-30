<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $this->middleware("auth:api", ["except" => ["index", "show", "all"]]);
    }

    /**
     * Get the first 20 posts
     */
    public function index() {
        $blogposts = Blogpost::whereNotNull("published_at")->orderBy("published_at", "DESC")->limit(20)->get();
        $blogposts->makeHidden(["content"]);

        return BlogpostResource::collection($blogposts);
    }

    public function all(Request $request) {
        if($request->input("page")) {
            if(!$request->user()->can("get all blogposts")) {
                return response(null, 403);
            }

            // Make pagination and include unpublished posts
            $blogposts = Blogpost::orderBy("published_at", "DESC")->Paginate(50);
        } else {
            // Include all published blogposts
            $blogposts = Blogpost::whereNotNull("published_at")->orderBy("published_at", "DESC")->get();
        }

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
        $max_file_size_kb = config("app.max_file_size_mb") * 1024;

        $validated_data = $request->validate([
            "id" => "nullable|uuid",
            "title" => "required|max:255",
            "slug" => "required|unique:App\Blogpost|max:64",
            "teaser" => "required|max:512",
            "topic_id" => "required|Integer",
            "content" => "required",
            "tag_ids" => "nullable|Array",
            "cover" => "nullable|image|max:" . $max_file_size_kb,
            "assets" => "nullable|Array|max:" . $max_file_size_kb,
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
        $skip_keys = ["tag_ids", "cover", "assets", "cover-gradient", "cover->gradient"];

        foreach($validated_data as $key => $value) {
            if(!in_array($key, $skip_keys)) {
                $blogpost->{$key} = $value;
            }
        }

        $blogpost->user_id = $user->id;

        // Publish post
        if($request->publish) {
            $blogpost->published_at = Carbon::now();
        }

        // Unpublish post
        if($request->unpublish) {
            $blogpost->published_at = null;
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
            
            // Store assets array
            if(isset($validated_data["assets"])) {
                foreach($validated_data["assets"] as $asset) {
                    if(!$asset->isValid()) {
                        return response(null, 422);
                    }
                }

                // Filter new assets
                $store_assets = get_new_files($validated_data["assets"], $blogpost->assets->toArray());

                // Store assets from array
                foreach($store_assets as $asset) {
                    $new_asset = create_asset([
                        "file" => $asset,
                        "blogpost_id" => $blogpost->id,
                        "type" => "asset",
                        "user_id" => $user->id
                    ]);

                    $new_asset->save();
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
     * @param  string slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug, Request $request) {
        if($request->query("id")) {
            // Get blogpost by id
            $id = $request->query("id");
            $blogpost = Blogpost::findOrFail($id);

        } else {
            // Get blogpost by slug
            $blogpost = Blogpost::where("slug", $slug)->firstOrFail();            

        }

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
            $comment->blogpost_slug = $blogpost->slug;
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

            // Delete all likes
            DB::table("likes")->where("blogpost_id", $id)->delete();

            // Delete all recommendations
            DB::table("recommendations")->where("blogpost_id", $id)->delete();

            // Delete all comments
            DB::table("comments")->where("blogpost_id", $id)->delete();
            
            return new BlogpostResource($blogpost);
        }
    }

    public function delete_asset($filename, Request $request) {
        $user = $request->user();
        $asset = Asset::where("filename", $filename)->first();

        if(!$user->can("delete files") || $user->id != $asset->user_id) {
            return response(null, 403);
        }

        $response_code = delete_asset($filename);

        return response(null, $response_code);
    }

    public function like(Request $request) {
        $blogpost_id = $request->id;
        $blogpost = BlogPost::findOrFail($blogpost_id);
        $user = $request->user();

        if($blogpost->user->id == $user->id || !$user->can("like blogposts")) {
            return response(null, 403);
        }

        $blogpost->likes()->attach($user);

        return $this->show($blogpost_id, $request);
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

        return $this->show($id, $request);
    }
}
