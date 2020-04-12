<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function blogposts() {
        return $this->hasMany("App\Blogpost");
    }

    public function comments() {
        return $this->hasMany("App\Comment");
    }

    public function likes() {
        return $this->hasMany("App\Blogpost", "likes");
    }

    public function follows() {
        return $this->hasMany("App\Follower", "followers");
    }

    public function followers() {
        return $this->belongsToMany("App\Follower", "followers");
    }

    public function recommendations() {
        return $this->hasMany("App\Blogpost", "recommendations");
    }
}
