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
        return array_merge(parent::toArray($request), [
            "user" => $this->user,
            "topic" => $this->topic,
            "tags" => $this->tags,
            "likesCount" => $this->likes->count(),
            "recommendationsCount" => $this->recommendations->count()
        ]);
    }
}
