<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        "user_id"      => $faker->numberBetween(0, 5),
        "blogpost_id"  => $faker->numberBetween(0, 20),
        "content"      => $faker->text(20)
    ];
});
