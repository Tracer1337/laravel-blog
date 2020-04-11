<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Blogpost;
use App\Http\Resources\Blogpost as BlogpostResource;

class BlogpostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get blogposts
        $blogposts = Blogpost::orderBy("id", "desc")->Paginate(5);

        // Return collection of blogposts as a resource
        return BlogpostResource::collection($blogposts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $blogpost = $request->isMethod("put") ? Blogpost::findOrFail($request->id) : new Blogpost;

        $blogpost->id = $request->input("id");
        $blogpost->user_id = 0;
        $blogpost->topic_id = 0;
        $blogpost->title = $request->input("title");
        $blogpost->teaser = $request->input("teaser");
        $blogpost->content = $request->input("content");
        $blogpost->cover_url = "abc";
        $blogpost->is_pinned = false;

        if($blogpost->save()) {
            return new BlogpostResource($blogpost);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Get blogpost
        $blogpost = Blogpost::findOrFail($id);

        // Return blogpost as resource
        return new BlogpostResource($blogpost);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blogpost = BlogPost::findOrFail($id);
        if($blogpost->delete()) {
            return new BlogpostResource($blogpost);
        }
    }
}
