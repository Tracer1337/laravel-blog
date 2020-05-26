<?php

use Illuminate\Database\Seeder;

class FeaturedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Initialize faker instance
        $faker = Faker\Factory::create();

        // Get random post from admin user
        $user = App\User::where("username", ENV("ADMIN_USERNAME"))->first();
        $blogpost = App\Blogpost::where("user_id", $user->id)->inRandomOrder()->first();

        DB::table("featured")->insert([
            "blogpost_id" => $blogpost->id,
            "content" => $faker->text(100)
        ]);
    }
}
