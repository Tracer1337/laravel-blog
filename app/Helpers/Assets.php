<?php

use Illuminate\Support\Facades\Storage;
use App\Asset;
use Webpatser\Uuid\Uuid;

function same_files($file_a, $file_b) {
    return filesize($file_a) == filesize($file_b) && md5_file($file_a) == md5_file($file_b);
}

function get_new_files($files, $existing_files) {
    // Filter empty values
    $existing_files = array_filter($existing_files);
    
    // Return if no files to compare
    if(count($existing_files) == 0) {
        return $files;
    }

    $new_files = [];
    $existing_files_paths = [];
    $temp_files = [];

    // Filter paths of existing files
    foreach($existing_files as $object) {
        // Get file
        // $file_content = Storage::get($object->path);
        $file_content = Storage::get($object["path"]);

        // Create temp file
        $temp = tmpfile();
        fwrite($temp, $file_content);
        array_push($temp_files, $temp);

        // Get temp file path
        $meta_data = stream_get_meta_data($temp);
        $path = $meta_data["uri"];

        array_push($existing_files_paths, $path);
    }

    // Compare files to existing files
    foreach($files as $file) {
        $file_path = $file->getPathName();
        $is_new = true;
        
        foreach($existing_files_paths as $compare_path) {

            if(same_files($file_path, $compare_path)) {
                $is_new = false;
                break;
            }

        }

        if($is_new) {
            array_push($new_files, $file);
        }
    }

    // Delete temp files
    if(count($temp_files) > 0) {
        foreach($temp_files as $file) {
            fclose($file);
        }
    }

    return $new_files;
}

function delete_asset($filename) {
    $path = "public/assets/" . $filename;

    if(!Storage::exists($path)) {
        return 404;
    }

    Storage::delete($path);

    Asset::where("filename", $filename)->delete();

    return 200;
}

function create_asset($data) {
    $filename = Uuid::generate()->string;
    $path = $data["file"]->storeAs("public/assets", $filename);
    $url = ENV("APP_URL") . "storage/assets/" . $filename;

    // Create new asset
    $new_image = new Asset;
    $new_image->filename = $filename;
    $new_image->user_id = $data["user_id"];
    $new_image->path = $path;
    $new_image->url = $url;
    $new_image->type = $data["type"];

    if(isset($data["blogpost_id"])) {
        $new_image->blogpost_id = $data["blogpost_id"];
    }

    return $new_image;
}

function format_assets_for_response($assets) {
    foreach($assets as $asset) {
        unset($asset->path);
    }
}