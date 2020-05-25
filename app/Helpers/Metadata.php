<?php

namespace App\Helpers;

use App\Blogpost;
use App\User;
use App\Topic;

class Metadata {
    public static function generate() {
        // Default meta data
        $meta = [
            "title" => "Index",
            "desc" => "Yet another blog containing topics like cooking and computer science",

            "og:title" => null,
            "og:image" => null,
            "og:type" => null,
            "og:site_name" => "Yet Another Blog",

            "article:tags" => [],
            "article:published_at" => null,
            "article:section" => null,

            "profile:first_name" => null,
            "profile:last_name" => null,
            "profile:username" => null,
        ];

        // Generate metadata for blogpost page
        if(\Request::segment(1) === "post") {
            $blogpost_id = \Request::segment(2);

            $blogpost = Blogpost::find($blogpost_id);
            $topic = Topic::find($blogpost->topic_id);
            $user = User::find($blogpost->user_id);

            $cover = $blogpost->assets()->where("type", "cover")->first();
            $tags = $blogpost->tags;
            $published_at = (new \Datetime($blogpost->published_at))->format(\Datetime::ATOM);

            $meta["title"] = $blogpost->title;
            $meta["desc"] = $blogpost->teaser;

            $meta["og:title"] = $blogpost->title;
            $meta["og:image"] = isset($cover) ? $cover->url : null;
            $meta["og:type"] = "article";

            $meta["article:tags"] = $tags;
            $meta["article:published_at"] = $published_at;
            $meta["article:section"] = $topic->name;

            $meta["profile:first_name"] = $user->first_name;
            $meta["profile:last_name"] = $user->last_name;
            $meta["profile:username"] = $user->username;
        }

        return $meta;
    }
}