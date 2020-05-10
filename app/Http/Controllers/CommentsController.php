<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Http\Resources\Comment as CommentResource;

class CommentsController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        if(!$request->user()->can("create comments")) {
            return response(null, 403);
        }

        $validated_data = $request->validate([
            "content" => "required",
            "blogpost_id" => "required|uuid",
            "id" => "nullable|Integer"
        ]);

        $isUpdate = $request->isMethod("put");
        $comment = $isUpdate ? Comment::findOrFail($request->id) : new Comment;
        $user = $request->user();

        if($isUpdate && $comment->user->id != $user->id) {
            return response(null, 403);
        }

        $comment->id = isset($validated_data["id"]) ? $validated_data["id"] : null;
        $comment->user_id = $user->id;
        $comment->blogpost_id = $validated_data["blogpost_id"];
        $comment->content = $validated_data["content"];

        if($comment->save()) {
            return new CommentResource($comment);
        }
    }

    public function destroy($id, Request $request) {
        $comment = Comment::findOrFail($id);
        $user = $request->user();

        if($comment->user->id != $user->id && !$user->can("delete any comment")) {
            return response(null, 403);
        }

        if($comment->delete()) {
            return new CommentResource($comment);
        }
    }
}
