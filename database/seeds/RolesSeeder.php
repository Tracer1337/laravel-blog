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
        $role_user = Role::create(["name" => "user"]);
        $role_author = Role::create(["name" => "author"]);
        $role_admin = Role::create(["name" => "admin"]);

        $role_user->givePermissionTo("like blogposts");
        $role_user->givePermissionTo("create comments");
        $role_user->givePermissionTo("view users");
        $role_user->givePermissionTo("follow users");
        
        $role_author->givePermissionTo("create blogposts");
        $role_author->givePermissionTo("like blogposts");
        $role_author->givePermissionTo("recommend blogposts");
        $role_author->givePermissionTo("create comments");
        $role_author->givePermissionTo("create topics");
        $role_author->givePermissionTo("create tags");
        $role_author->givePermissionTo("view users");
        $role_author->givePermissionTo("follow users");

        // Assign roles to users
        $user_count = User::all()->count();
        for($i = 1; $i < $user_count + 1; $i++) {
            $user = User::find($i);

            if($user->username == ENV("ADMIN_USERNAME")) {
                $user->assignRole($role_admin);
                continue;
            }

            if($i % 2 == 0) {
                $user->assignRole($role_user);
            } else {
                $user->assignRole($role_author);
            }
        }
    }
}
