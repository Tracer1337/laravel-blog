<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Blogpost;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use JWTAuth;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Blogpost as BlogpostResource;
use App\Http\Resources\Comment as CommentResource;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["login", "register"]]);
    }

    private function store(Request $request, User $user) {
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;
        $user->biography = $request->biography;
        $user->links = $request->links;

        if($request->file("avatar")) {
            $request->validate([
                "avatar" => [
                    "image",
                    Rule::dimensions()->maxWidth(512)->maxHeight(512)->ratio(1)
                ]
            ]);

            $path = $request->file("avatar")->storeAs("public/avatars", $user->id);
            $user->avatar_url = Storage::url($path);
        }

        if($user->save()) {
            return new UserResource($user);
        }

        return response(0, 400);
    }

    public function register(Request $request) {
        $user = new User;

        $user->password = Hash::make($request->password);
        $user->email = $request->email;

        $user_role = Role::findByName("user");
        $user->assignRole($user_role);

        if($this->store($request, $user)) {
            $token = JWTAuth::attempt([
                "email" => $request->email,
                "password" => $request->password
            ]);

            if(!$token) {
                return response(null, 500);
            }
            
            $user->role = $user->roles()->first()->name;

            return $this->withToken($token, [
                "profile" => new UserResource($user)
            ]);
        }
    }

    public function login(Request $request){
        $credentials = [
            "email" => $request->input("email"),
            "password" => $request->input("password")
        ];

        $token = JWTAuth::attempt($credentials);

        if(!$token) {
            return response(null, 401);
        }

        $profile = $this->profile($request);
        $profile->role = $profile->roles()->first()->name;

        return $this->withToken($token, [
            "profile" => $profile
        ]);
    }

    public function logout(Request $request){
        auth()->logout();
    }

    public function profile(Request $request){
        $user = $request->user();
        $user->role = $user->roles()->first()->name;

        return new UserResource($user);
    }

    public function blogposts(Request $request) {
        $user = $request->user();
        $blogposts = $user->blogposts()->orderBy("created_at", "DESC")->Paginate(20);
        $blogposts->makeHidden("content");

        return BlogpostResource::collection($blogposts);
    }

    public function comments(Request $request) {
        $user = $request->user();
        $comments = $user->comments()->orderBy("created_at", "DESC")->Paginate(20);
        
        return CommentResource::collection($comments);
    }

    public function update(Request $request) {
        $user = $request->user();
        return $this->store($request, $user);
    }

    public function subscriptions(Request $request) {
        $user = $request->user();

        // Get ids of newest subscriptions blogposts
        $blogpost_ids = DB::table("followers")
                    ->where("user_from_id", "=", $user->id)
                    ->join("blogposts", "followers.user_to_id", "=", "blogposts.user_id")
                    ->orderBy("published_at", "desc")
                    ->select(array("blogposts.published_at", "blogposts.id"))
                    ->limit(20)
                    ->get();
    
        // Convert ids to array
        $ids = [];
        foreach($blogpost_ids as $id) {
            array_push($ids, $id->id);
        }

        // Get blogpost resources from ids
        $blogposts = Blogpost::whereIn("id", $ids)->orderBy("published_at", "desc")->get();

        $blogposts->makeHidden(["content"]);

        return BlogpostResource::collection($blogposts);
    }

    private function withToken($token, $data) {
        $response = array_merge([
            "access_token" => $token,
            "token_type" => "bearer"
        ], $data);

        return response()->json($response);
    }
}
