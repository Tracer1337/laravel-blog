<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Blogpost::class, function (Faker $faker) {
    return [
        "user_id"      => $faker->numberBetween(1, 5),
        "topic_id"     => $faker->numberBetween(1, 3),
        "title"        => $faker->text(8),
        "teaser"       => $faker->text(15),
        "content"      => $faker->text(300),
        "cover_url"    => $faker->word,
        "is_pinned"    => false
    ];
});
