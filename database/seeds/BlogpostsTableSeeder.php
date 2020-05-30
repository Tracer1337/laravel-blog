<?php

use Illuminate\Database\Seeder;
use App\Blogpost;
use App\User;

class BlogpostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        factory(Blogpost::class, 20)->create();

        $admin = User::where("username", "admin")->first();
        for($i = 0; $i < 53; $i++) {
            $blogpost = new Blogpost;
            $blogpost->user_id = $admin->id;
            $blogpost->topic_id = $faker->numberBetween(1, 3);
            $blogpost->title = $faker->text(50);
            $blogpost->slug = $faker->word . "-" . $faker->word . "-" . $faker->word . "-" . $faker->word;
            $blogpost->teaser = $faker->text(80);
            $blogpost->content = $faker->text(5000);
            $blogpost->published_at = $faker->dateTimeBetween($min = "-1 year", $max = "now");
            $blogpost->save();
        }
    }
}
