<?php

use Illuminate\Database\Seeder;

class TopicsRelationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("topics_relations")->insert([
            "topic_1_id" => 3,
            "topic_2_id" => 2
        ]);
    }
}
