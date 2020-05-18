<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\User;

class CreatePermissionTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding.');
        }

        Schema::create($tableNames['permissions'], function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        Schema::create($tableNames['roles'], function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        Schema::create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames) {
            $table->unsignedBigInteger('permission_id');

            $table->string('model_type');
            $table->uuid($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_permissions_model_id_model_type_index');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->primary(['permission_id', $columnNames['model_morph_key'], 'model_type'],
                    'model_has_permissions_permission_model_type_primary');
        });

        Schema::create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames) {
            $table->unsignedBigInteger('role_id');

            $table->string('model_type');
            $table->uuid($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_roles_model_id_model_type_index');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['role_id', $columnNames['model_morph_key'], 'model_type'],
                    'model_has_roles_role_model_type_primary');
        });

        Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->unsignedBigInteger('permission_id');
            $table->unsignedBigInteger('role_id');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['permission_id', 'role_id'], 'role_has_permissions_permission_id_role_id_primary');
        });

        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));

        $this->seed();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $tableNames = config('permission.table_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
        }

        Schema::drop($tableNames['role_has_permissions']);
        Schema::drop($tableNames['model_has_roles']);
        Schema::drop($tableNames['model_has_permissions']);
        Schema::drop($tableNames['roles']);
        Schema::drop($tableNames['permissions']);
    }

    public function seed() {
        // Seed permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(["name" => "create blogposts"]);
        Permission::create(["name" => "delete any blogpost"]);
        Permission::create(["name" => "like blogposts"]);
        Permission::create(["name" => "recommend blogposts"]);
        Permission::create(["name" => "get all blogposts"]);

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
        Permission::create(["name" => "get all users"]);

        Permission::create(["name" => "create comments"]);
        Permission::create(["name" => "delete any comment"]);

        Permission::create(["name" => "store files"]);
        Permission::create(["name" => "delete files"]);
        Permission::create(["name" => "view all files"]);
        Permission::create(["name" => "delete any file"]);

        // Seed roles
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
        $role_author->givePermissionTo("store files");
        $role_author->givePermissionTo("delete files");

        // Give admin user the admin role
        User::first()->assignRole($role_admin);
    }
}
