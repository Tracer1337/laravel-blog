<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function index() {
        $client_config = [];
        $client_config_keys = config("app.client_config_keys");

        // Set dynamic client configuration properties
        foreach($client_config_keys as $key) {
            $client_config[$key] = config("app." . $key);
        }

        return $client_config;
    }
}
