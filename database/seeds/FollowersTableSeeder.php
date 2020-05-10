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
            $user1 = App\User::all()->get($i);
            $user2 = App\User::all()->get($i * 2);

            DB::table("followers")->insert([
                "user_from_id" => $user1->id,
                "user_to_id"   => $user2->id
            ]);
        }
    }
}
