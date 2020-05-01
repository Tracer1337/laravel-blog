<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public $timestamps = false;

    public function blogposts() {
        return $this->hasMany("App\Blogpost");
    }

    public function relations() {
        return $this->belongsToMany("App\Topic", "topics_relations", "topic_from_id", "topic_to_id");
    }
}
