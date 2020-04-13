<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Blogpost;
use App\Http\Resources\Blogpost as BlogpostResource;

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
        $blogposts = Blogpost::orderBy("id", "desc")->Paginate(5);

        $users = [];
        foreach($blogposts as $blogpost) {
            $blogpost->user;
            $blogpost->topic;
            $blogpost->tags;
        }

        return BlogpostResource::collection($blogposts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $isUpdate = $request->isMethod("put");
        $blogpost = $isUpdate ? Blogpost::findOrFail($request->id) : new Blogpost;
        $user = $request->user();

        if($isUpdate && $blogpost->user()->get()[0]->id != $user->id) {
            return response(null, 401);
        }

        $blogpost->id = $request->input("id");
        $blogpost->user_id = $user->id;
        $blogpost->topic_id = $request->input("topic_id");
        $blogpost->title = $request->input("title");
        $blogpost->teaser = $request->input("teaser");
        $blogpost->content = $request->input("content");
        $blogpost->cover_url = "abc";
        $blogpost->is_pinned = false;

        if($blogpost->save()) {
            $blogpost->tags()->sync($request->input("tag_ids"));
            return new BlogpostResource($blogpost);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $blogpost = Blogpost::findOrFail($id);
        $blogpost->user;
        $blogpost->topic;
        $blogpost->tags;
        $blogpost->comments;

        foreach($blogpost->comments as $comment) {
            $comment->user;
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

        if($blogpost->user_id != $user->id) {
            return response(null, 401);
        }

        if($blogpost->delete()) {
            return new BlogpostResource($blogpost);
        }
    }
}
