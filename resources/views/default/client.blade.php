<!DOCTYPE html>
<html>
<head>
    <title>Client</title>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('default/assets/css/font-awesome.css') }}">

    <!-- custom stylesheets -->

    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/client.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/loader.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/game.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/nav.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/interfaces.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/navigator.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/inventory.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/rooms.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/users.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('client/css/chat.css') }}">


</head>
<body>
<section id="loader">
    <div class="inner">
        <img src="{{ URL::asset('default/assets/img/logo.png') }}">
        <div id="bar">
            <div id="inner"></div>
        </div>
    </div>
</section>
<section id="game">
    <div id="wrapper">
        <div id="chatContainer">

        </div>
        <section id="stats">
            <ul>
                <li style="color: #37C8E9;" id="diamonds"><span>3000</span> <img src="{{ URL::asset('client/img/diamond_small.png') }}"></li>
                <li style="color: #CDAA24;" id="credits"><span>3999</span> <img src="{{ URL::asset('client/img/credit_small.png') }}"></li>
                <li style="color: #D084D1;" id="duckets"><span>2999</span> <img src="{{ URL::asset('client/img/ducket_small.png') }}"></li>
            </ul>

            <div id="club">
                <img src="{{ URL::asset('client/img/hc_small.png') }}">
                <p>10 <br/>dgn</p>
            </div>

            <div id="buttons">
                <button style="background: #207AB4">Hulp</button>
                <button style="background: #DD5246"><i class="fa fa-sign-out"></i></button>
                <button style="background: #716A85"><i class="fa fa-cog"></i></button>
            </div>
        </section>
        <div id="roomContainer" style="position:absolute;top:50%;left:50%;display:none;height: 100vh; width: 100vw;">
            <div id="images">

            </div>
        </div>
        <section id="navigator">
            <div class="title">Navigator <div class="close" onclick="Spheus.Interface.close('#navigator');"><i class="fa fa-times"></i> </div> </div>
            <div class="tabs" id="navigator-tabs">
                <ul>
                    <li class="nav-tab-click is-active"><a href="#tabs-1">Publieke Kamers</a></li>
                    <li class="nav-tab-click" id="openAllRooms" ><a href="#tabs-2">Alle Kamers</a></li>
                    <li>Events</li>
                    <li class="nav-tab-click" id="openMyRooms"><a>Mijn wereld</a></li>
                </ul>
            </div>
            <div class="inner">


                <div class="search">
                    <select placeholder="Wat dan ook">
                        <option><span>Wat dan ook</span></option>
                    </select>

                    <input placeholder="Kamer filteren op">
                </div>

                <div class="content" id="navicontent">
                    <div class="navi-select-tab is-active" id="tabs-1">
                        <section class="allrooms">
                            <div class="titles"><span class="fa fa-minus"></span> Publieke kamers<span class="fa fa-bars pull-right"></span>  </div>
                            <ul id="navigator-high-rooms">

                            </ul>
                        </section>


                    </div>

                    <div class="navi-select-tab is-active" id="tabs-2">
                        <section class="allrooms">
                            <div class="titles"><span class="fa fa-minus"></span> Populaire kamers<span class="fa fa-bars pull-right"></span>  </div>
                            <ul id="navigator-high-rooms" class="popular-rooms">

                            </ul>
                        </section>


                    </div>


                </div>

                <div class="createRoom">
                    <p>Kamer maken</p>
                </div>

                <div class="somewhereNew">
                    <p>Ergens nieuw</p>
                </div>
            </div>

        </section>
        <section id="inventory">
            <div class="title">Inventory <div class="close" onclick="Spheus.Interface.close('#navigator');"><i class="fa fa-times"></i> </div> </div>
        </section>
        <figure id="background_left">
            <img src="{{ URL::asset('client/img/habbo15_background_left.png') }}">
            <img class="habbo" src="http://www.habbo.nl/habbo-imaging/avatarimage?hb=img&figure=hr-170-31.ch-255-63.hd-180-1.lg-275-82.sh-290-68.ha-1012-1331&action=std,wav&gesture=sml&size=l&direction=2&head_direction=3">
        </figure>
        <figure id="background_right">
            <img src="{{ URL::asset('client/img/paris15_background_right.png') }}">
        </figure>
        <section id="roomInfo">
            <div class="container">
                <div class="main">
                    <div class="control"><i class="fa fa-chevron-left"></i></div>
                </div>

                <div class="info">
                    <div class="title">edferwfefwef</div>
                    <sub>Door Finicky</sub>
                    <section></section>
                </div>
            </div>
        </section>
        <div class="push"></div>
    </div>
    <nav>
        <ul>
            <li class="homeroom"></li>
            <li class="navigator" onclick="Lemonade.Navigator.toggle()"></li>
            <li class="catalog"></li>
            <li class="inventory" onclick="Lemonade.Inventory.toggle()"></li>
        </ul>

        <section id="writeChat">


            <div class="bubble" onclick="$('.chatBubbleStyleSelect').toggle();">
                <img src="{{ URL::asset('client/img/select_bubble.png') }}" alt="">
                <div class="chatBubbleStyleSelect">
                    <div class="chatBubblePreview main" onclick="Lemonade.Chatting.setChatStyle('main');"></div>
                    <div class="chatBubblePreview orange" onclick="Lemonade.Chatting.setChatStyle('orange');"></div>
                    <div class="chatBubblePreview blue"  onclick="Lemonade.Chatting.setChatStyle('blue');"></div>
                </div>
            </div>
            <input placeholder="Klik hier om te typen" onkeyup="Lemonade.Chatting.toggleWriting(this, event)" onkeydown="Lemonade.Chatting.countLetters(event)">
        </section>
    </nav>

</section>
<script>
    var clientParameters = {
        "host" : "127.0.0.1",
        "port" : 30000,
        "sso" : "{{ $avatar["sso_ticket"] }}"
    };
</script>
<script src="{{ URL::asset('default/assets/js/jquery-1.11.3.js') }}"></script>
<script src="{{ URL::asset('default/assets/js/jquery-ui.min.js') }}"></script>
<script src="{{ URL::asset('client/js/core.js') }}"></script>
<script src="{{ URL::asset('client/js/socket.js') }}"></script>
<script src="{{ URL::asset('client/js/interface.js') }}"></script>
<script src="{{ URL::asset('client/js/images.js') }}"></script>
<script src="{{ URL::asset('client/js/avatar.js') }}"></script>
<script src="{{ URL::asset('client/js/navigator.js') }}"></script>
<script src="{{ URL::asset('client/js/inventory.js') }}"></script>
<script src="{{ URL::asset('client/js/chatting.js') }}"></script>
<script src="{{ URL::asset('client/js/message.js') }}"></script>
<script src="{{ URL::asset('client/js/messageHandler.js') }}"></script>
</body>
</html>