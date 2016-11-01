<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests;
use Config;

class IndexController extends Controller
{
    public function __construct() {
        $this->middleware('guest');
    }

    public function index() {
       return view("index");
    }
}
