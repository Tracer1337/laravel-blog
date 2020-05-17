<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\User;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Assign roles to users
        $users = User::all();

        $i = 0;
        foreach($users as $user) {
            if($user->username == ENV("ADMIN_USERNAME")) {
                continue;
            }

            if($i % 2 == 0) {
                $user->assignRole($role_user);
            } else {
                $user->assignRole($role_author);
            }

            $i++;
        }
    }
}
