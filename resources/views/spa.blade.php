<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Smoggitor</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,600">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/style.css')}}">
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        <div class="content">
            <div id="root"></div>
        </div>

        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
