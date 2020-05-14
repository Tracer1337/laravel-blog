<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use HasRoles;
    use Uuids;

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

    public $incrementing = false;

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
        return $this->belongsToMany("App\Blogpost", "likes");
    }

    public function follows() {
        return $this->belongsToMany("App\User", "followers", "user_from_id", "user_to_id");
    }

    public function followers() {
        return $this->belongsToMany("App\User", "followers", "user_to_id", "user_from_id");
    }

    public function recommendations() {
        return $this->belongsToMany("App\Blogpost", "recommendations");
    }

    public function assets() {
        return $this->hasMany("App\Asset");
    }

    public function getAvatarAttribute() {
        return $this->assets()->where("type", "avatar")->first();
    }
}
