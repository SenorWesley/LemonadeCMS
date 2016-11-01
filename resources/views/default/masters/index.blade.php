<!DOCTYPE html>
<html>
<head>
    <title>{{ $config->name }} &middot; @yield("title")</title>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/material.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/global.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/index.css') }}">
</head>
<body>
@if (count($errors))
    @foreach($errors->all() as $error)
        <div class="alert alert-danger">
            {{ $error }}
        </div>
    @endforeach
@endif

    @yield("content")
<div id="hotelview_index"></div>
<script src="{{ URL::asset('default/assets/js/jquery-1.11.3.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/jquery-ui.min.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/material.min.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/app.js') }}"></script>
</body>
</html>