<?php

use Illuminate\Database\Seeder;
use App\Comment;
use App\User;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        factory(Comment::class, 100)->create();

        $admin = User::where("username", "admin")->first();
        for($i = 0; $i < 53; $i++) {
            $comment = new Comment;
            $comment->user_id = $admin->id;
            $comment->blogpost_id = $i % 2 + 1;
            $comment->content = $faker->text;
            $comment->save();
        }
    }
}
