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
        $result = array_merge(parent::toArray($request), [
            "cover" => $this->cover
        ]);

        // Append metadata
        if($request->query("with-meta")) {
            $result = array_merge($result, [
                "blogposts_count" => $this->blogposts()->count()
            ]);
        }

        format_assets_for_response([$result["cover"]]);
        
        return $result;
    }
}
