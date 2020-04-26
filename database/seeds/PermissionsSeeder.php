<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(["name" => "create blogposts"]);
        Permission::create(["name" => "delete any blogpost"]);
        Permission::create(["name" => "like blogposts"]);
        Permission::create(["name" => "recommend blogposts"]);

        Permission::create(["name" => "create topics"]);
        Permission::create(["name" => "update topics"]);
        Permission::create(["name" => "delete topics"]);

        Permission::create(["name" => "create tags"]);
        Permission::create(["name" => "update tags"]);
        Permission::create(["name" => "delete tags"]);

        Permission::create(["name" => "update any user"]);
        Permission::create(["name" => "delete any user"]);
        Permission::create(["name" => "view users"]);
        Permission::create(["name" => "follow users"]);

        Permission::create(["name" => "create comments"]);
        Permission::create(["name" => "delete any comment"]);
    }
}
