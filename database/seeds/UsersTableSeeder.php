<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 5)->create();

        $admin = new User;
        $admin->username = "admin";
        $admin->email = "admin";
        $admin->password = bcrypt("admin");
        $admin->save();
    }
}
