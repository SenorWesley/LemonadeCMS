<!DOCTYPE html>
<html>
<head>
    <title>Lemonade &middot; @yield("title")</title>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/material.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/global.css') }}">

    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/me.css') }}">
</head>
<body>
<header>
    <div class="container">
        <div class="row">
            <div class="col-md-3 ">
                <figure>
                    <img src="{{ URL::asset('default/assets/img/logo.png') }}">
                </figure>
            </div>
            <div class="col-md-8">
                <button class="btn btn-raised btn-success pull-right">Ga naar <strong>{{ $config->name }}</strong>! </button>
            </div>
        </div>
    </div>
</header>
<nav>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <ul>
                    <li class="active">
                        {{ $avatar["username"] }}
                        <ul>
                            <li>hi</li>
                            <li>hi</li>
                            <li>hi</li>
                        </ul>
                    </li><!--
                            --><li>
                        Community
                        <ul>
                            <li>hi</li>
                            <li>hi</li>
                            <li>hi</li>
                        </ul>
                    </li><!--
                            --><li>Housekeeping</li>
                </ul>
            </div>
            <div class="col-md-3 online">
                <b>1</b> Habbo's online
            </div>
        </div>
    </div>
</nav>

@yield("content")

<script src="{{ URL::asset('default/assets/js/jquery-1.11.3.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/jquery-ui.min.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/material.min.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/app.js') }}"></script>
</body>
</html>