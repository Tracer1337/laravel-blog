<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Blogpost;
use App\Http\Resources\Blogpost as BlogpostResource;
use Carbon\Carbon;

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
            "id" => "nullable|Integer",
            "title" => "required|max:255",
            "teaser" => "required|max:512",
            "topic_id" => "required|Integer",
            "content" => "required",
            "tag_ids" => "required|Array"
        ]);

        $isUpdate = $request->isMethod("put");
        $blogpost = $isUpdate ? Blogpost::findOrFail($request->id) : new Blogpost;
        $user = $request->user();

        if(!$user->can("create blogposts")) {
            return response(null, 403);
        }

        if($isUpdate && $blogpost->user()->get()[0]->id != $user->id) {
            return response(null, 403);
        }

        $skip_keys = ["tag_ids"];

        foreach($validated_data as $key => $value) {
            if(!in_array($key, $skip_keys)) {
                $blogpost->{$key} = $value;
            }
        }

        $blogpost->user_id = $user->id;
        $blogpost->cover_url = "abc";

        if($request->publish) {
            $blogpost->published_at = Carbon::now();
        }

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
        $related_topics = $blogpost->topic->relations()->get();
        
        foreach($related_topics as $topic) {
            $blogposts = $topic->blogposts()->limit(5)->get();
            $blogposts->makeHidden(["content"]);

            foreach($blogposts as $related_post) {
                $resource = new BlogpostResource($related_post);
                array_push($relations, $resource);
            }
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
            return new BlogpostResource($blogpost);
        }
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

        if($user->can("recommend blogposts")) {
            return reponse(null, 403);
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
