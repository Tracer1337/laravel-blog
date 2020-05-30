<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blogpost;
use App\Topic;
use App\Tag;

class SitemapController extends Controller
{   
    /**
     * Generate sitemap
     */
    public function index() {
        header("Content-Type: text/plain; charset=UTF-8");

        // Print blogpost pages

        $blogposts = Blogpost::whereNotNull("published_at")->orderBy("published_at", "DESC")->get();

        foreach($blogposts as $blogpost) {
            echo url("/post/" . $blogpost->slug) . "\n";
        }

        // Print topic pages

        $topics = Topic::all();

        foreach($topics as $topic) {
            echo url("/topic/" . $topic->id) . "\n";
        }

        // Print tag pages

        $tags = Tag::all();

        foreach($tags as $tag) {
            echo url("/tags/?tag_ids=" . $tag->id) . "\n";
        }
    }
}
