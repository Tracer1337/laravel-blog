<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Blogpost extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) {
        $user = $this->user;
        $user->makeHidden("biography");

        $array = array_merge(parent::toArray($request), [
            "user" => $user,
            "topic" => $this->topic,
            "tags" => $this->tags,
            "likesCount" => $this->likes->count(),
            "recommendationsCount" => $this->recommendations->count(),
            "assets" => $this->assets
        ]);

        // Remove path from response
        foreach($array["assets"] as $asset) {
            unset($asset->path);
        }

        return $array; 
    }
}
