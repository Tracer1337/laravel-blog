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
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string("username")->unique();
            $table->string('password');
            $table->timestamps();
            $table->string('email')->unique();
            $table->string("links")->nullable();
            $table->mediumText("biography")->nullable();
            $table->string("avatar_url")->nullable();
        });

        // Create admin user
        $admin = new User;
        $admin->username = ENV("ADMIN_USERNAME");
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
