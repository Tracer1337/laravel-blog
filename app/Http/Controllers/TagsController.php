<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\Http\Resources\Tag as TagResource;

class TagsController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index"]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::all();

        return TagResource::collection($tags);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $isUpdate = $request->isMethod("put");

        if(!$isUpdate && !$request->user()->can("create tags")) {
            return response(null, 403);
        } else if ($isUpdate && !$request->user()->can("update tags")) {
            return reponse(null, 403);
        }

        $tag = $isUpdate ? Tag::findOrFail($request->id) : new Tag;
        $tag->id = $tag->id;
        $tag->name = $request->name;

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
