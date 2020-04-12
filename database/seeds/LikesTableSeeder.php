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
        for($i = 1; $i < 15; $i++) {
            for($j = 1; $j <= 2; $j++) {
                DB::table("likes")->insert([
                    "blogpost_id" => $i,
                    "user_id"     => $j
                ]);
            }
        }
    }
}
