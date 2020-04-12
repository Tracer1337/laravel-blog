<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public $timestamps = false;

    public function blogposts() {
        return $this->blongsToMany("App\Blogpost");
    }

    public function relations() {
        return $this->hasMany("App\Topic", "topics_relations");
    }
}
