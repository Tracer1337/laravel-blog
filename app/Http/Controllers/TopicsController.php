<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;
use App\Http\Resources\Topic as TopicResource;
use App\Http\Resources\Blogpost as BlogpostResource;

class TopicsController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index", "blogposts"]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $topics = Topic::all();

        return TopicResource::collection($topics);
    }

    public function get_specific($id) {
        $topic = Topic::findOrFail($id);

        return new TopicResource($topic);
    }

    public function blogposts($id) {
        $topic = Topic::findOrFail($id);
        $blogposts = $topic->blogposts()->whereNotNull("published_at")->orderBy("published_at", "DESC")->Paginate(20);
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
            "name" => "required|max:255"
        ]);

        $isUpdate = $request->isMethod("put");

        if(!$isUpdate && !$request->user()->can("create topics")) {
            return response(null, 403);
        } else if ($isUpdate && !$request->user()->can("update topics")) {
            return reponse(null, 403);
        }

        $topic = $isUpdate ? Topic::findOrFail($request->id) : new Topic;
        $topic->id = $request->id;
        $topic->name = $validated_data["name"];

        $topic->save();

        return new TopicResource($topic);
    }

    public function destroy($id, Request $request) {
        if(!$request->user()->can("delete topics")) {
            return response(null, 403);
        }

        $topic = Topic::findOrFail($id);

        if($topic->delete()) {
            return new TopicResource($topic);
        }
    }
}
