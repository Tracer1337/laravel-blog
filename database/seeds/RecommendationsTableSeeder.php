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
            DB::table("recommendations")->insert([
                "user_id"     => $i + 1,
                "blogpost_id" => $i
            ]);
        }
    }
}
