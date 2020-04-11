<?php

use Illuminate\Database\Seeder;

class BlogpostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Blogpost::class, 20)->create();
    }
}
