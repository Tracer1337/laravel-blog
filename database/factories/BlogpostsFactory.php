<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Blogpost::class, function (Faker $faker) {
    return [
        "user_id"      => $faker->numberBetween(1, 5),
        "topic_id"     => $faker->numberBetween(1, 3),
        "title"        => $faker->text(50),
        "teaser"       => $faker->text(80),
        "content"      => $faker->text(5000),
        "cover_url"    => $faker->word,
        "published_at" => $faker->dateTimeBetween($min = "-1 year", $max = "now")
    ];
});
