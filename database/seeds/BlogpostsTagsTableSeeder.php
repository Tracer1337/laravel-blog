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
        for($i = 2; $i < 20; $i++) {
            for($j = 1; $j < 3; $j++) {
                $blogpost = App\Blogpost::all()->get($i);
    
                DB::table("blogposts_tags")->insert([
                    "blogpost_id" => $blogpost->id,
                    "tag_id"      => $j
                ]);
            }
        }
    }
}
