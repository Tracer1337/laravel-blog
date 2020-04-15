<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Blogpost::class, function (Faker $faker) {
    return [
        "user_id"      => $faker->numberBetween(1, 5),
        "topic_id"     => $faker->numberBetween(1, 3),
        "title"        => $faker->text(8),
        "teaser"       => $faker->text(15),
        "content"      => $faker->text(300),
        "cover_url"    => $faker->word,
        "published_at" => Carbon::now()
    ];
});
