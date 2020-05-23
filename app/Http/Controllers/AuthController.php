<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Blogpost;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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

    private function store($data, User $user) {
        $skip_keys = ["avatar", "password"];

        foreach($data as $key => $value) {
            if(!in_array($key, $skip_keys)) {
                $user->{$key} = $value;
            }
        }

        if(isset($data["links"])) {
            $links = json_decode($data["links"]);
            $available_links = config("app.available_link_keys");

            foreach($links as $key => $url) {
                if(!in_array($key, $available_links)) {
                    $message = $key . " is not a valid key";
                    return response($message, 500);
                }

                Validator::make(["url" => $url], [
                    "url" => "required|url"
                ])->validate();
            }
        }

        if($user->can("store files")) {
            // Store avatar
            if(isset($data["avatar"])) {
                if(!$data["avatar"]->isValid()) {
                    return reponse(null, 422);
                }

                // Check if avatar is new
                $current_avatar = $user->getAvatarAttribute();
                $store_images = get_new_files([$data["avatar"]], [$current_avatar]);

                if(isset($store_images[0])) {
                    // Create asset for avatar
                    $new_avatar = create_asset([
                        "file" => $store_images[0],
                        "user_id" => $user->id,
                        "type" => "avatar"
                    ]);

                    $new_avatar->save();
                }
            }
        }

        if($user->save()) {
            return new UserResource($user);
        }

        return response(null, 400);
    }

    public function register(Request $request) {
        $validated_data = $request->validate([
            "first_name" => "required|alpha",
            "last_name" => "required|alpha",
            "username" => "required|unique:users",
            "email" => "required|email|unique:users",
            "password" => "required"
        ]);

        $user = new User;

        $user->password = Hash::make($validated_data["password"]);

        $user_role = Role::findByName("user");
        $user->assignRole($user_role);

        $this->store($validated_data, $user);

        $token = JWTAuth::attempt([
            "email" => $validated_data["email"],
            "password" => $validated_data["password"]
        ]);

        if(!$token) {
            return response(null, 500);
        }
        
        $user->role = $user->roles()->first()->name;

        return $this->withToken($token, [
            "profile" => new UserResource($user)
        ]);
    }

    public function login(Request $request){
        // Remove in production
        if(!$request->input("email") == ENV("ADMIN_EMAIL")) {
            $validated_data = $request->validate([
                "email" => "required|email",
                "password" => "required"
            ]);
        } else {
            $validated_data = $request->validate([
                "email" => "required",
                "password" => "required"
            ]);
        }

        $credentials = [
            "email" => $validated_data["email"],
            "password" => $validated_data["password"]
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

        foreach($blogposts as $blogpost) {
            $blogpost->content_length = strlen($blogpost->content);
            $blogpost->comments_count = $blogpost->comments()->count();
            $blogpost->assets_count = $blogpost->assets()->count();
        }

        return BlogpostResource::collection($blogposts);
    }

    public function comments(Request $request) {
        $user = $request->user();
        $comments = $user->comments()->orderBy("created_at", "DESC")->Paginate(20);
        
        return CommentResource::collection($comments);
    }

    public function update(Request $request) {
        $max_file_size_kb = config("app.max_file_size_mb") * 1024;

        $validated_data = $request->validate([
            "first_name" => "nullable|alpha",
            "last_name" => "nullable|alpha",
            "username" => "required",
            "biography" => "nullable",
            "links" => "nullable|JSON",
            "avatar" => "nullable|image|dimensions:ratio=1|max:" . $max_file_size_kb
        ]);

        $user = $request->user();
        return $this->store($validated_data, $user);
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
