<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public $timestamps = false;

    public function blogposts() {
        return $this->hasMany("App\Blogpost");
    }

    public function cover() {
        return $this->hasOne("App\Asset");
    }
}
