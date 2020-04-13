<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["login", "register"]]);
    }

    public function register(Request $request) {
        return User::create([
            "username" => $request->input("username"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
        ]);
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

        return response()->json([
            "username"   => $user->username,
            "avatar_url" => $user->avatar_url,
            "id"         => $user->id
        ]);
    }

    public function respond_with_token($token){
        return response()->json([
            "access_token" => $token,
            "token_type" => "bearer"
        ]);
    }
}
