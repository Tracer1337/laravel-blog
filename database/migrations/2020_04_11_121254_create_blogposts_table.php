<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogpostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogposts', function (Blueprint $table) {
            $table->id();
            $table->integer("user_id");
            $table->integer("topic_id");
            $table->string("title");
            $table->text("teaser");
            $table->mediumText("content");
            $table->string("cover_url");
            $table->timestamp("created_at")->nullable();
            $table->timestamp("published_at")->nullable();
            $table->timestamp("updated_at")->nullable();
            $table->boolean("is_pinned");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogposts');
    }
}
