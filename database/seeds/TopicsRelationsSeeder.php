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
            "topic_from_id" => 3,
            "topic_to_id" => 2
        ]);

        DB::table("topics_relations")->insert([
            "topic_from_id" => 2,
            "topic_to_id" => 3
        ]);
    }
}
