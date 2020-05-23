<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Assets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->uuid("blogpost_id")->nullable();
            $table->uuid("user_id");
            $table->string("filename");
            $table->string("path");
            $table->string("url");
            $table->string("type");
            $table->text("meta")->nullable();
            $table->string("extension");
            $table->string("mime_type");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("assets");
    }
}
