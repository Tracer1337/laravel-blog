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

        if($request->file("avatar")) {
            $request->validate([
                "avatar" => [
                    "image",
                    Rule::dimensions()->maxWidth(500)->maxHeight(500)->ratio(1)
                ]
            ]);

            $request->file("avatar")->storeAs("public/avatars", $user->id);
            $user->avatar_url = "storage/avatars/".$user->id;
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

        return $this->store($request, $user);
    }

    public function update(Request $request) {
        $user = $request->user();
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

        return $this->respond_with_token($token);
    }

    public function logout(Request $request){
        auth()->logout();
    }

    public function profile(Request $request){
        $user = $request->user();

        return new UserResource($user);
    }

    public function respond_with_token($token){
        return response()->json([
            "access_token" => $token,
            "token_type" => "bearer"
        ]);
    }
}
