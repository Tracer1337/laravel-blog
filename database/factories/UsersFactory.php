<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        "username" => $faker->username,
        "password" => $faker->password,
        "email" => $faker->email,
    ];
});
