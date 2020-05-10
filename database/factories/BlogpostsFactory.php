<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Blogpost::class, function (Faker $faker) {
    $user = App\User::all()->random();

    return [
        "user_id"      => $user->id,
        "topic_id"     => $faker->numberBetween(1, 3),
        "title"        => $faker->text(50),
        "teaser"       => $faker->text(80),
        "content"      => $faker->text(5000),
        "published_at" => $faker->dateTimeBetween($min = "-1 year", $max = "now")
    ];
});
