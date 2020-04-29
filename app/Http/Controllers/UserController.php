<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api");
    }

    public function index($id, Request $request) {
        if(!$request->user()->can("view users")) {
            return reponse(null, 403);
        }

        $user = User::findOrFail($id);
        $user->recommendations->makeHidden(["content"]);
        $user->followersCount = $user->followers()->count();
        $user->role = $user->roles()->first()->name;

        return new UserResource($user);
    }

    public function follow(Request $request) {
        $user = $request->user();

        if(!$user->can("follow users")) {
            return response(null, 403);
        }

        $followUser = User::findOrFail($request->id);

        if($user->id != $followUser->id) {
            $user->follows()->attach($followUser);
            return response(null, 200);
        }

        return response(null, 400);
    }

    public function unfollow(Request $request) {
        $user = $request->user();

        if(!$user->can("follow users")) {
            return response(null, 403);
        }

        $unfollowUser = User::findOrFail($request->id);

        if($user->follows()->detach($unfollowUser)) {
            return response(null, 200);
        }

        return response(null, 400);
    }

    public function follows($id, Request $request) {
        $user = $request->user();

        if(!$user->can("view users")) {
            return response(null, 403);
        }

        $followsUser = User::findOrFail($id);
        $isFollowing = !!DB::table("followers")
            ->select("user_from_id", "user_to_id")
            ->where([
                ["user_from_id", $user->id],
                ["user_to_id", $id]
            ])
            ->count();

        return response()->json($isFollowing);
    }

    public function update(Request $request) {
        $user_request = $request->user();
        $user = User::findOrFail($request->id);

        if(!$user_request->can("update any user")) {
            return response(null, 403);
        }

        $user->username = $request->username;
        $user->email = $request->email;
        $user->links = $request->links;
        $user->biography = $request->biography;

        return $user->save();
    }

    public function destroy($id, Request $request) {        
        if(!$request->user()->can("delete any user")) {
            return response(null, 403);
        }

        $user = User::findOrFail($id);
        if($user->delete()) {
            return new UserResource($user);
        }
    }

    public function assign_role(Request $request) {
        if(!$request->user()->can("update any user")) {
            return response(null, 403);
        }

        $user = User::findOrFail($request->user_id);
        $role = Role::findOrFail($request->role_id);
        $user->syncRoles($role);
    }

    public function roles(Request $request) {
        if($request->user()->can("view roles")) {
            return Role::all();
        } else {
            return response(null, 403);
        }
    }
}
