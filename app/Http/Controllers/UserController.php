<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index"]]);
    }

    public function index($id, Request $request) {
        $user = User::findOrFail($id);
        $user->recommendations->makeHidden(["content"]);
        $user->followersCount = $user->followers()->count();

        return new UserResource($user);
    }

    public function follow(Request $request) {
        $user = $request->user();
        $followUser = User::findOrFail($request->id);

        if($user->id != $followUser->id) {
            $user->follows()->attach($followUser);
            return response(null, 200);
        }

        return response(null, 400);
    }

    public function unfollow(Request $request) {
        $user = $request->user();
        $unfollowUser = User::findOrFail($request->id);

        if($user->follows()->detach($unfollowUser)) {
            return response(null, 200);
        }

        return response(null, 400);
    }

    public function follows($id, Request $request) {
        $user = $request->user();
        $followsUser = User::findOrFail($id);
        $isFollowing = !!DB::table("followers")->select("user_from_id", "user_to_id")->where("user_to_id", $id)->count();

        return response()->json($isFollowing);
    }
}
