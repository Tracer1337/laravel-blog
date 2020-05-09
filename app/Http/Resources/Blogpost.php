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
        $serialized = parent::toArray($request);

        // Strip images data to only show public url
        if(isset($serialized["images"])) {
            $images = json_decode($serialized["images"]);
            $new_images = [];
    
            foreach($images as $image_object) {
                array_push($new_images, $image_object->url);
            }
    
            $serialized["images"] = json_encode($new_images);
        }
        
        return array_merge($serialized, [
            "user" => $this->user,
            "topic" => $this->topic,
            "tags" => $this->tags,
            "likesCount" => $this->likes->count(),
            "recommendationsCount" => $this->recommendations->count()
        ]);
    }
}
