<?php

use Illuminate\Database\Seeder;

class LikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i < 20; $i++) {
            for($j = 1; $j <= 2; $j++) {
                $user = App\User::all()->get($j);
                $blogpost = App\Blogpost::all()->get($i);

                DB::table("likes")->insert([
                    "blogpost_id" => $blogpost->id,
                    "user_id"     => $user->id
                ]);
            }
        }
    }
}
