<?php

use Illuminate\Database\Seeder;

class BlogpostsTagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 2; $i < 40; $i++) {
            DB::table("blogposts_tags")->insert([
                "blogpost_id" => floor($i / 2),
                "tag_id"      => $i % 2 + 1
            ]);
        }
    }
}
