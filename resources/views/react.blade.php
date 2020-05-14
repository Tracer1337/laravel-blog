<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}"/>
        <meta name="description" content="The blog of Merlin Moelter, containing all kinds of topics"/>

        <title>Yet Another Blog</title>
    </head>
    <body>
        <div id="root"></div>

        <script src="{{ ENV("APP_URL") }}/js/app.js"></script>
    </body>
</html>
