<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}"/>

        <meta name="author" content="Merlin Moelter"/>

        <meta name="description" content="{{ $meta["desc"] }}"/>

        <meta property="og:title" content="{{ $meta["title"] }}"/>
        <meta property="og:description" content="{{ $meta["desc"] }}"/>
        <meta property="og:image" content="{{ $meta["og:image"] }}"/>
        <meta property="og:site_name" content="{{ $meta["og:site_name"] }}"/>
        <meta property="og:type" content="{{ $meta["og:type"] }}"/>

        @foreach ($meta["article:tags"] as $tag)
            <meta property="article:tag" content="{{ $tag->name }}"/>
        @endforeach

        <meta property="article:published_at" content="{{ $meta["article:published_at"] }}"/>
        <meta property="article:section" content="{{ $meta["article:section"] }}"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="{{ $meta["title"] }}"/>
        <meta name="twitter:description" content="{{ $meta["desc"] }}"/>
        <meta name="twitter:image" content="{{ $meta["og:image"] }}"/>

        <meta property="profile:first_name" content="{{ $meta["profile:first_name"] }}"/>
        <meta property="profile:last_name" content="{{ $meta["profile:last_name"] }}"/>
        <meta property="profile:username" content="{{ $meta["profile:username"] }}"/>

        <link rel="canonical" href="{{ ENV("APP_URL") . \Request::path() }}"/>

        <title>Yet Another Blog | {{ $meta["title"] }}</title>
    </head>
    <body>
        <div id="root"></div>

        <script src="{{ ENV("APP_URL") }}/js/app.js"></script>
    </body>
</html>
