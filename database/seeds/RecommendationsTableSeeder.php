<?php

use Illuminate\Database\Seeder;

class RecommendationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 3; $i++) {
            $user = App\User::all()->get($i + 1);
            $blogpost = App\Blogpost::all()->get($i);

            DB::table("recommendations")->insert([
                "user_id"     => $user->id,
                "blogpost_id" => $blogpost->id
            ]);
        }
    }
}
