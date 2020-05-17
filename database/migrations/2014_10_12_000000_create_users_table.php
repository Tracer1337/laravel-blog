<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\User;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('first_name');
            $table->string('last_name');
            $table->string("username")->unique();
            $table->string('password');
            $table->timestamps();
            $table->string('email')->unique();
            $table->text("links")->nullable();
            $table->mediumText("biography")->nullable();
        });

        // Create admin user
        $admin = new User;
        $admin->username = ENV("ADMIN_USERNAME");
        $admin->first_name = "admin";
        $admin->last_name = "yab";
        $admin->email = ENV("ADMIN_EMAIL");
        $admin->password = bcrypt(ENV("ADMIN_PASSWORD"));
        $admin->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
