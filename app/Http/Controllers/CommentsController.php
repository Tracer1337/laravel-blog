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
        $isUpdate = $request->isMethod("put");
        $comment = $isUpdate ? Comment::findOrFail($request->id) : new Comment;
        $user = $request->user();

        if($isUpdate && $comment->user->id != $user->id) {
            return response(null, 401);
        }

        $comment->id = $request->input("id");
        $comment->user_id = $user->id;
        $comment->blogpost_id = $request->input("blogpost_id");
        $comment->content = $request->content;

        if($comment->save()) {
            return new CommentResource($comment);
        }
    }

    public function destroy($id, Request $request) {
        $comment = Comment::findOrFail($id);
        $user = $request->user();

        if($comment->user->id != $user->id) {
            return response(null, 401);
        }

        if($comment->delete()) {
            return new CommentResource($comment);
        }
    }
}
