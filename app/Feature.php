<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    public $timestamps = false;

    protected $table = "featured";

    public function blogpost() {
        return $this->belongsTo("App\Blogpost");
    }
}
