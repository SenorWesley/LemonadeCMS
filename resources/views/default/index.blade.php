@extends("masters.index")
@section("title", trans('global.welcome'))

@section("content")

    <div class="overlay" onclick="Index.Actions.sidebar();"></div>

    <section id="index">
        <div class="container" style="min-height:60px;">
            <div class="row">
                <div class="col-xs-2 col-md-1"><img src="{{ URL::asset('default/assets/img/logo.png') }}" class="logo"></div>
                <div class="col-xs-2 col-md-2 col-md-offset-7 col-xs-offset-0" style="left:70px;"><a href="javascript:void(0);" onclick="Index.Actions.sidebar();" class="sidebar-switch btn btn-flat btn-default" style=" position:relative;top:10px;">{{ trans("index.sign_in") }}</a> </div>
                <div class="col-md-2"><a href="javascript:void(0)" class="btn btn-default btn-raised" style="background: #03A9F4; color:#fff; position:relative;top:10px;">{{ trans("index.sign_up") }}</a></div>
            </div>


        </div></section>
    <div class="container-fluid"><hr>


        <div class="row">
            <div class="col-md-12" >
                <h1 class="title">{{ trans('index.welcome', ["name" => $config->name]) }}<br/>
                    <small style="color:#fff; font-weight:300;font-size:30px;">{{ $config->slogan }}</small></h1>

            </div>
        </div>

    </div>

    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="title-bar">{{ trans("index.sign_in") }}<div class="pull-right sidebar-switch" style="cursor:pointer;"><i onclick="Index.Actions.sidebar();" class="fa fa-times">  </i></div> </div>
            <div class="habIcon"></div>
        </div>

        <form style="position:relative; z-index:99999999999999;" method="POST" action="/login" id="loginform">
            {!! csrf_field()  !!}
            <fieldset>


            </fieldset>
            <div class="form-group">

                <div class="col-md-12">
                    <input type="text" class="form-control input" name="email" value="{{ old('email') }}" style="font-size:15px;" id="inputEmail">
                    <label>{{ trans("global.email") }}</label>
                </div>
            </div>

            <div class="form-group" >

                <div class="col-md-12" style="margin-top:25px;">
                    <input type="Password" class="form-control input" name="password"  style="font-size:15px;" id="inputEmail">
                    <label> {{ trans("global.password") }}</label>
                </div>
            </div>


            <div class="form-group" >

                <div class="col-md-12" style="margin-top:10px;">
                    <button class="btn btn-default btn-raised" style="background: #03A9F4; color:#fff; position:relative;margin-top:10px;">{{ trans("index.sign_in") }}</button>
                    <a href="javascript:void(0)" class="btn btn-default btn-raised" style="background: #3b5998; color:#fff; position:relative;margin-top:10px; left:20px;"><i class="fa fa-facebook" style="margin-right:10px;"></i>{{ trans("index.sign_in") }}</a>
                </div></div>
        </form>

        <div class="or">
            <div class="short" style="float:left;"></div> <p class="or">{{ trans("index.or") }}</p> <div class="short" style="float:right; top:-10px;"></div>
        </div>
        <a href="javascript:void(0);" class="btn btn-flat btn-default btn-block" style="margin-top: -10px;">{{ trans("index.forgot") }}</a>
    </aside>



@endsection