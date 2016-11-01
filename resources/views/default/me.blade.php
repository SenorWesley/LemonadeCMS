
@extends("masters.me")
@section("title", "me")

@section("content")

    <section class="container">
        <div class="row">
            <div class="col-md-7">
                <div class="panel panel-default panel-body" id="panel-me">
                    <figure>
                        <img src="http://www.habbo.nl/habbo-imaging/avatarimage?hb=img&figure={{ $avatar["look"] }}&action=std,wav&gesture=sml&size=l&direction=2&head_direction=3">
                    </figure>

                    <p class="motto"><strong>{{ $avatar["username"] }}:</strong> {{ $avatar["motto"] }}</p>

                    <button class="btn btn-success btn-raised pull-right">Ga naar <strong>{{ $config->name }}</strong>!</button>
                </div>
            </div>

            <div class="col-md-5">
                <div class="panel panel-default" id="nieuws">
                    <div class="controls">
                        <div class="left">
                            <i class="fa fa-chevron-left" onclick="Me.Functions.SlideSwitch('prev');"></i>
                        </div>
                        <div class="right">
                            <i class="fa fa-chevron-right" onclick="Me.Functions.SlideSwitch('next');"></i>
                        </div>
                    </div>
                    <ul>

                        <li class="active">
                            <figure>
                                <img src="{{ URL::asset('general/img/topstories/bouwen.png') }}">
                                <figcaption>
                                    <span>Bouwvakkers enzo <small class="pull-right">lees meer >></small></span>
                                </figcaption>
                            </figure>
                        </li>


                    </ul>
                </div>
            </div>
        </div>



        <div class="row">
            <div class="col-md-7">
                <div class="card">
                    <div class="header header-success">
                        <span class="header-text">{{ trans('index.welcome', ["name" => $config->name]) }}</span>
                    </div>

                    <div class="card-body"></div>
                </div>
            </div>
        </div>
    </section>
@endsection