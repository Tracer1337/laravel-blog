<?php

use Illuminate\Database\Seeder;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Topic::class)->create(["name" => "Fitness"]);
        factory(App\Topic::class)->create(["name" => "Cooking"]);
        factory(App\Topic::class)->create(["name" => "Computer Science"]);
        factory(App\Topic::class)->create(["name" => "Computer Hardware"]);
    }
}
