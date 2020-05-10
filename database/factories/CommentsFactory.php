<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    $user = App\User::all()->random();
    $blogpost = App\Blogpost::all()->random();

    return [
        "user_id"      => $user->id,
        "blogpost_id"  => $blogpost->id,
        "content"      => $faker->text(200)
    ];
});
