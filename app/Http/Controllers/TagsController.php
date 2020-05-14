<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
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

    public function blogposts($id) {
        $tag = Tag::findOrFail($id);
        $blogposts = $tag->blogposts()->whereNotNull("published_at")->orderBy("published_at", "DESC")->Paginate(20);
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

        $isUpdate = $request->isMethod("put");

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
            return new TagResource($tag);
        }
    }
}
