<?php

use Illuminate\Database\Seeder;

class FollowersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 2; $i++) {
            DB::table("followers")->insert([
                "user_from_id" => $i,
                "user_to_id"   => $i * 2
            ]);
        }
    }
}
