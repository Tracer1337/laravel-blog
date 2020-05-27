<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;
use App\Blogpost;
use App\Http\Resources\Topic as TopicResource;
use App\Http\Resources\Blogpost as BlogpostResource;

class TopicsController extends Controller
{
    public function __construct() {
        $this->middleware("auth:api", ["except" => ["index", "blogposts", "get_specific"]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $topics = Topic::all();

        return TopicResource::collection($topics);
    }

    public function get_specific($id) {
        $topic = Topic::findOrFail($id);

        return new TopicResource($topic);
    }

    public function blogposts($id) {
        $topic = Topic::findOrFail($id);
        $blogposts = $topic->blogposts()->whereNotNull("published_at")->orderBy("published_at", "DESC")->Paginate(20);
        $blogposts->makeHidden("content");

        return BlogpostResource::collection($blogposts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $user = $request->user();
        $max_file_size_kb = config("app.max_file_size_mb") * 1024;

        $validated_data = $request->validate([
            "name" => "required|max:255",
            "cover" => "nullable|image|max:" . $max_file_size_kb
        ]);

        $isUpdate = $request->input("method_put");

        if(!$isUpdate && !$user->can("create topics")) {
            return response(null, 403);
        } else if ($isUpdate && !$user->can("update topics")) {
            return reponse(null, 403);
        }

        $topic = $isUpdate ? Topic::findOrFail($request->id) : new Topic;
        $topic->id = $request->id;
        $topic->name = $validated_data["name"];

        if($user->can("store files")) {
            // Store cover image
            if(isset($validated_data["cover"])) {
                if(!$validated_data["cover"]->isValid()) {
                    return response(null, 422);
                }

                // Check if cover is new
                $current_cover = $topic->cover;
                if($current_cover) {
                    $store_images = get_new_files([$validated_data["cover"]], [$current_cover]);
                } else {
                    $store_images = [$validated_data["cover"]];
                }

                // Store cover
                if(isset($store_images[0])) {
                    // Remove old cover
                    if($current_cover) {
                        delete_asset($current_cover->filename);
                    }

                    $new_cover = create_asset([
                        "file" => $store_images[0],
                        "topic_id" => $request->id,
                        "type" => "topic-cover",
                        "user_id" => $user->id
                    ]);

                    $new_cover->save();
                }
            }
        }

        $topic->save();

        return new TopicResource($topic);
    }

    public function destroy($id, Request $request) {
        if(!$request->user()->can("delete topics")) {
            return response(null, 403);
        }

        $topic = Topic::findOrFail($id);

        if($topic->delete()) {
            // Remove topic from blogposts
            Blogpost::where("topic_id", $id)->update(["topic_id" => null]);

            return new TopicResource($topic);
        }
    }
}
