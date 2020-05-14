<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            "avatar" => $this->getAvatarAttribute()
        ]);

        format_assets_for_response([$result["avatar"]]);

        return $result;
    }
}
