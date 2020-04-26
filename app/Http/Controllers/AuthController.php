<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use JWTAuth;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Blogpost as BlogpostResource;

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

        $user->assignRole("user");

        return $this->store($request, $user);
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

        return response()->json([
            "access_token" => $token,
            "token_type" => "bearer",
            "profile" => $profile
        ]);
    }

    public function logout(Request $request){
        auth()->logout();
    }

    public function profile(Request $request){
        $user = $request->user();

        return new UserResource($user);
    }

    public function blogposts(Request $request) {
        $user = $request->user();
        $blogposts = $user->blogposts()->orderBy("id", "DESC")->Paginate(5);
        $blogposts->makeHidden("content");

        return BlogpostResource::collection($blogposts);
    }

    public function update(Request $request) {
        $user = $request->user();
        return $this->store($request, $user);
    }
}
