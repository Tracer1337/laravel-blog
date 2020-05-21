<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Blogpost as BlogpostResource;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Asset;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api");
    }

    public function index($id, Request $request) {
        if(!$request->user()->can("view users")) {
            return response(null, 403);
        }

        $user = User::findOrFail($id);
        $user->role = $user->roles()->first()->name;
        
        // Get Recommendations
        $recommendations = $user->recommendations()->get();
        $recommendations->makeHidden(["content"]);
        $user->recommendations = BlogpostResource::collection($recommendations);

        $user->available_statistics = config("app.available_user_statistics");

        // Set statistics
        $user->subscriber_count = $user->followers()->count();
        $user->subscription_count = $user->follows()->count();
        $user->blogpost_count = $user->blogposts()->count();
        $user->comment_count = $user->comments()->count();
        
        // Calculate total likes
        $likes_received = 0;
        $blogposts = $user->blogposts()->get();
        foreach($blogposts as $blogpost) {
            $likes_received += $blogpost->likes()->count();
        }

        $user->likes_received = $likes_received;

        return new UserResource($user);
    }

    public function all(Request $request) {
        if(!$request->user()->can("get all users")) {
            return response(null, 403);
        }

        $users = User::all();

        foreach($users as $user) {
            $user->role = $user->roles()->first();
        }

        return UserResource::collection($users);
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

        if(!$user_request->can("update any user")) {
            return response(null, 403);
        }

        $user = User::findOrFail($request->id);

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
            // Delete all likes from user
            DB::table("likes")->where("user_id", $id)->delete();

            // Delete all recommendations from user
            DB::table("recommendations")->where("user_id", $id)->delete();

            // Delete all blogposts from user
            DB::table("blogposts")->where("user_id", $id)->delete();

            // Delete all assets from user
            $assets = Asset::where("user_id", $id)->get();
            foreach($assets as $asset) {
                delete_asset($asset->filename);
            }
            
            // Delete all subscription-entries with user
            DB::table("followers")->where("user_from_id", $id)->orWhere("user_to_id", $id)->delete();

            // Delete all comments from user
            DB::table("comments")->where("user_id", $id)->delete();
            
            return new UserResource($user);
        }
    }

    public function assign_role(Request $request) {
        if(!$request->user()->can("update any user")) {
            return response(null, 403);
        }

        // Prevent changing own role
        if($request->user()->id == $request->user_id) {
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
    
    public function links(Request $request) {
        return config("app.available_link_keys");
    }
}
