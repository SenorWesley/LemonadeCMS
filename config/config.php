<?php

return [
    # Database options.
    "db_host" => "127.0.0.1", // Database host. Use 127.0.0.1 for Localhost
    "db_port" => "3306", // Database port, do not change unless you know why.
    "db_name" => "lemonade", // Name of your database
    "db_user" => "root", // Database user
    "db_pass" => "", // Database password

    # Default hotel options.
    "name" => "Lemonade", // The name of your hotel
    "slogan" => "Dit is een slogan.", // Your hotels slogan
    "avatars" => 50, // How much avatars may one person have? False to disable the "multiple avatars" feature.
    "theme" => "default", // The theme you're using
    "language" => "nl", // Language for the text. Use language codes like for example: en for english.
    "url" => "http://localhost", // Url to hotel * WITHOUT A SLASH *

    # Client options.
    "client" => "html5", // HTML5 or Flash client?
    "emulator" => "Lemonade", // The emulator you're using. 'Lemonade' for the html5 client.


    # User options.
    "credits" => 100, // How much credits does a user get on registration?
    "duckets" => 50, // How much duckets does a user get on registration?
    "vip_points" => 0, // How much vip points does a user get on registration? Type false if you don't use vip points of any kind.
    "motto" => "I <3 Finicky!", // What is the default motto a user registers with?
    "look" => "hr-165-45.hd-208-2.ch-250-64.lg-285-82.sh-290-64" // What is the default look a user registers with?

];