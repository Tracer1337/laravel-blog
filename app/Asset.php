<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    public $timestamps = false;

    public function blogpost() {
        return $this->belongsTo("App\Blogpost");
    }

    public function topic() {
        return $this->belongsTo("App\Topic");
    }

    public function user() {
        return $this->belonstTo("App\User");
    }
}
