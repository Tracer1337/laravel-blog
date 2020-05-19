<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Topic extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $result = parent::toArray($request);

        // Append metadata
        if($request->query("with-meta")) {
            $result = array_merge($result, [
                "blogposts_count" => $this->blogposts()->count()
            ]);
        }
        
        return $result;
    }
}
