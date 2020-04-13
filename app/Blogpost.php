<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blogpost extends Model
{
    public function user() {
        return $this->belongsTo("App\User");
    }

    public function topic() {
        return $this->belongsTo("App\Topic");
    }

    public function recommendations() {
        return $this->hasMany("App\User", "recommendations");
    }

    public function likes() {
        return $this->hasMany("App\User", "likes");
    }

    public function comments() {
        return $this->hasMany("App\Comment");
    }

    public function tags() {
        return $this->belongsToMany("App\Tag", "blogposts_tags");
    }
}
