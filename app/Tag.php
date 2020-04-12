<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $timestamps = false;

    public function blogposts() {
        return $this->hasMany("App\Blogpost", "blogposts_tags");
    }
}
