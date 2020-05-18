<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Blogpost;

class Asset extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = User::find($this->user_id);

        if($this->blogpost_id) {
            $blogpost = Blogpost::find($this->blogpost_id);
            $blogpost->makeHidden("content");
        }

        return array_merge(parent::toArray($request), [
            "user" => $user,
            "blogpost" => isset($blogpost) ? $blogpost : null
        ]);
    }
}
