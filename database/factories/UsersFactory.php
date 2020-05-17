<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

function get_random_link_keys() {
    $available_link_keys = config("app.available_link_keys");
    $keys = [];

    for($i = 0; $i < 2; $i++) {
        $index = array_rand($available_link_keys);
        array_push($keys, $available_link_keys[$index]);
        unset($available_link_keys[$index]);
    }

    return $keys;
};

$factory->define(App\User::class, function (Faker $faker) {
    $keys = get_random_link_keys();
    $links = [];

    foreach($keys as $key) {
        $links[$key] = $faker->url;
    }

    return [
        "first_name" => $faker->firstName,
        "last_name" => $faker->lastName,
        "username" => $faker->username,
        "password" => bcrypt("123456"),
        "email" => $faker->email,
        "links" => json_encode($links)
    ];
});
