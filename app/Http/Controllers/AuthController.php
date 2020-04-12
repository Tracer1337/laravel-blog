<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["login"]]);
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

        $token = $this->guard()->attempt($credentials);

        if(!$token) {
            return response(null, 401);
        }

        return $this->respond_with_token($token);
    }

    public function logout(Request $request){
        $this->guard()->logout();

        return response()->json(true);
    }

    public function profile(Request $request){
        return response()->json($this->guard()->user());
    }

    public function respond_with_token($token){
        return response()->json([
            "access_token" => $token,
            "token_type" => "bearer",
            "expires_in" => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    public function guard() {
        return Auth::guard();
    }
}
