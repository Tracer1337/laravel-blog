<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TagsTableSeeder::class);
        $this->call(TopicsTableSeeder::class);
        $this->call(BlogpostsTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(BlogpostsTagsTableSeeder::class);
        $this->call(FollowersTableSeeder::class);
        $this->call(RecommendationsTableSeeder::class);
        $this->call(LikesTableSeeder::class);
        $this->call(TopicsRelationsSeeder::class);
        $this->call(PermissionsSeeder::class);
        $this->call(RolesSeeder::class);
    }
}
