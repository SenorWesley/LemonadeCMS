@extends("masters.index")
@section("title", trans('global.chooseAvatar'))

@section("content")

    <section>
        <div class="container" style="min-height:60px;">
            <div class="row">
                <div class="col-md-1"><img src="{{ URL::asset('default/assets/img/logo.png') }}" class="logo"></div>
                <div class="col-md-2 col-md-offset-9" style="left:70px;"><a href="javascript:void(0);"  class="sidebar-switch btn btn-flat btn-default" style=" position:relative;top:10px;">Log mij uit</a> </div>
            </div>


        </div></section>
    <div class="container-fluid"><hr>


        <div class="row">
            <div class="col-md-12" >
                <h1 class="choose_title">Kies jouw Habbo</h1>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-md-offset-2">
                <div class="panel  panel-default chooseAvatar">
                    <div class="container-fluid">
                        @foreach($avatars as $avatar)
                            <div class="row avatarRow">
                                <div class="col-xs-3" >
                                    <figure class="avatar">
                                        <img src="http://www.habbo.nl/habbo-imaging/avatarimage?hb=img&figure={{ $avatar["look"] }}&action=wav&gesture=sml&size=l&direction=2&head_direction=2">
                                    </figure>
                                </div>
                                <div class="col-xs-5">
                                    <h1 class="avatarName">{{ $avatar["name"] }}</h1>
                                    <h3 class="avatarMotto">{{ $avatar["motto"] }}</h3>
                                    <h5 class="avatarLastLogin">{{ trans("choose.lastlogin") }}: <span>{!! gmdate("d-m-Y", $avatar["lastLogin"]) !!}</span></h5>
                                </div>

                                <div class="col-md-4">
                                    <form action="/chooseAvatar" method="POST">
                                        {!! csrf_field() !!}
                                        <input type="hidden" name="avatar" value="{{ $avatar["sso"] }}">
                                        <button class="btn btn-info btn-raised">
                                            {{ trans("choose.choose",["name" => $config->name]) }}
                                        </button>
                                    </form>


                                    <a class="btn btn-flat btn-danger">
                                        {{ trans("choose.delete",["name" => $config->name]) }}
                                    </a>
                                </div>
                            </div>


                        @endforeach

                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="panel panel-body panel-default avatarCreate">
                    {!! trans("choose.amount", ["amount" => ((int) $maxAvatars - (int) $avatarCount), "name" => $config->name]) !!}

                    <a class="btn btn-success btn-raised btn-block">
                        {!! trans("choose.create", ["name" => $config->name]) !!}
                    </a>
                </div>

            </div>
        </div>

    </div>

@endsection