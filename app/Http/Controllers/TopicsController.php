<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;
use App\Http\Resources\Topic as TopicResource;

class TopicsController extends Controller
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
        $topics = Topic::all();

        return TopicResource::collection($topics);
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

        if(!$isUpdate && !$request->user()->can("create topics")) {
            return response(null, 403);
        } else if ($isUpdate && !$request->user()->can("update topics")) {
            return reponse(null, 403);
        }

        $topic = $isUpdate ? Topic::findOrFail($request->id) : new Topic;
        $topic->id = $request->id;
        $topic->name = $request->name;

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
