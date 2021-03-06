<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Comment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) {
        return array_merge(parent::toArray($request), [
            "blogpost_title" => $this->blogpost->title,
            "blogpost_slug" => $this->blogpost->slug
        ]);
    }
}
