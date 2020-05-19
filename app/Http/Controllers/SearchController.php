<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blogpost;
use App\Http\Resources\Blogpost as BlogpostResource;
use App\Topic;
use App\Http\Resources\Topic as TopicResource;
use App\Tag;
use App\Http\Resources\Tag as TagResource;
use App\User;
use App\Http\Resources\User as UserResource;
use Spatie\Permission\Models\Role;

function get_blogposts($query) {
    $blogposts = Blogpost::whereNotNull("published_at")
                            ->orderBy("published_at", "DESC")
                            ->where("title", "like", "%" . $query . "%")
                            ->orWhere("teaser", "like", "%" . $query . "%")
                            ->limit(100)
                            ->get();

    $blogposts->makeHidden("content");

    return BlogpostResource::collection($blogposts);
}

function get_authors($query) {
    $users = User::where("first_name", "like", "%" . $query . "%")->get();

    $authors = [];
    foreach($users as $user) {
        if($user->hasRole("author")) {
            array_push($authors, $user);
        }
    }

    return UserResource::collection($authors);
}

function get_topics($query) {
    $topics = Topic::where("name", "like", "%" . $query . "%")->get();

    return TopicResource::collection($topics);
}

function get_tags($query) {
    $tags = Tag::where("name", "like", "%" . $query . "%")->get();

    return TagResource::collection($tags);
}

function get_search_results($query) {
    $results = [
        "blogposts" => get_blogposts($query),
        "authors" => get_authors($query),
        "topics" => get_topics($query),
        "tags" => get_tags($query)
    ];
    
    return $results;
}

class SearchController extends Controller
{
    public function index(Request $request) {
        $query = $request->query("query");

        if(empty($query)) {
            return response(null, 400);
        }

        $results = get_search_results($query);

        return $results;
    }
}
