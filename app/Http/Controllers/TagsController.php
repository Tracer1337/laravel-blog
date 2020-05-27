<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Tag;
use App\Blogpost;
use App\Http\Resources\Tag as TagResource;
use App\Http\Resources\Blogpost as BlogpostResource;

class TagsController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index", "get_specific", "blogposts"]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $tags = Tag::all();

        return TagResource::collection($tags);
    }

    public function get_specific($id) {
        $tag = Tag::findOrFail($id);

        return new TagResource($tag);
    }

    public function blogposts(Request $request) {
        $ids = $request->query("tag_ids");
        $ids_count = count($ids);

        // Get blogposts containing any of the tags        
        $marks = array_fill(0, $ids_count, "?");
        $blogpost_tags = DB::select("
            SELECT t.id AS tag_id, b.id AS blogpost_id FROM blogposts AS b
            INNER JOIN blogposts_tags AS bt ON bt.blogpost_id = b.id
            INNER JOIN tags AS t ON bt.tag_id = t.id
            WHERE t.id IN (" . implode(", ", $marks ) . ")
        ", $ids);

        // Count occurances of post ids in $blogpost_tags
        $matches_per_blogpost = [];

        foreach($blogpost_tags as $entry) {
            if(!isset($matches_per_blogpost[$entry->blogpost_id])) {
                $matches_per_blogpost[$entry->blogpost_id] = 1;
            } else {
                $matches_per_blogpost[$entry->blogpost_id]++;
            }
        }
        
        // Filter posts having too little matches
        $result_ids = [];
        
        foreach($matches_per_blogpost as $id => $matches) {
            if($matches == $ids_count) {
                array_push($result_ids, $id);
            }
        }

        $blogposts = Blogpost::whereNotNull("published_at")
                                ->whereIn("id", $result_ids)
                                ->orderBy("published_at", "DESC")
                                ->Paginate(20);

        $blogposts->makeHidden("content");

        return BlogpostResource::collection($blogposts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $validated_data = $request->validate([
            "name" => "required"
        ]);

        $isUpdate = $request->input("method_put");

        if(!$isUpdate && !$request->user()->can("create tags")) {
            return response(null, 403);
        } else if ($isUpdate && !$request->user()->can("update tags")) {
            return reponse(null, 403);
        }

        $tag = $isUpdate ? Tag::findOrFail($request->id) : new Tag;
        $tag->id = $tag->id;
        $tag->name = $validated_data["name"];

        $tag->save();

        return new TagResource($tag);
    }

    public function destroy($id, Request $request) {
        if(!$request->user()->can("delete tags")) {
            return response(null, 403);
        }

        $tag = Tag::findOrFail($id);
        
        if($tag->delete()) {
            // Remove tag from blogposts
            DB::table("blogposts_tags")->where("tag_id", $id)->delete();

            return new TagResource($tag);
        }
    }
}
