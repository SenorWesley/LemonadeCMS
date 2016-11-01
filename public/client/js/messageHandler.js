Lemonade.Socket.onmessage = function (serverMessage) {
    var packet = serverMessage.data;
    var message = new Lemonade.Message.toClient(packet);
    console.log(message.getPacketId());
    switch (message.getPacketId()) {
        case 0:

            $("#background_left .habbo").attr("src", "http://www.habbo.nl/habbo-imaging/avatarimage?hb=img&figure=" + message.getParams()[1] + "&action=std,wav&gesture=sml&size=l&direction=2&head_direction=3");
            $("#stats #credits span").text(message.getParams()[2]);
            $("#stats #diamonds span").text(message.getParams()[3]);
            $("#stats #duckets span").text(message.getParams()[4]);

            break;

        case 1:
            $("#navigator-high-rooms.popular-rooms").html("")
            for (i = 0; i < message.getParams()[0].length; i++) {
                roomData = message.getParams()[0][i];
                var id = roomData[0];
                var caption = roomData[1];
                var count = roomData[2];
                var max = roomData[3];

                var ratio = count / max;

                var countclass = "CAC9C0";

                if (ratio == 0) {
                    countclass = "CAC9C0";
                }

                if (ratio > 0) {
                    countclass = "62B061";
                }
                if (ratio >= 0.5) {
                    countclass = "FFB01A";
                }

                if (ratio >= 0.75) {
                    countclass = "C1322B";
                }
                roomElement = $('<li style="cursor:pointer;" onclick="Lemonade.Navigator.enterRoom(this)" roomid="' + id + '"><span style="background:#' + countclass + ';"><i class="fa fa-user"></i>' + count + ' </span>' + caption + '</li>');
                $("#navigator-high-rooms.popular-rooms").append(roomElement);


            }
            break;

        case 6:
            var master = null;
            var lastX = null;
            var lastY = null;
            var heightmap = message.getParams()[2];
            var username = message.getParams()[3];
            var wall = null;
            var tile = null;
            var currentTile = null;
            var dragged = null;

            // if (Lemonade.avatars[username].currentRoom != null) {
            //     Lemonade.avatars[username].exitRoom();
            // }

            console.log(heightmap);

            $("#roomInfo .info .title").text(message.getParams()[0]);
            $("#writeChat").show();
            $("#navigator").hide();
            $("#chatContainer").html("");
            $("#images").html("");
            $("#background_left").hide();
            $("#background_right").hide();
            $("#roomInfo").show();
            $("#game").css("background", "#000");
            $("#roomContainer").show();


            var rows = heightmap.split("n");
            rows.splice(-1, 1);

            for (y = 0; y < rows.length; y++) {
                var columns = rows[y].split("");

                for (x = 0; x < columns.length; x++) {
                    if (columns[x] == parseInt(columns[x]) && columns[x] != 0 && columns[x] != 9 && columns[x] != 8) {
                        var before = rows[y - 1];
                        if ((before == undefined || before[x] == 9) && rows[y] != undefined && rows[y][x] != 9) {
                            if ((before == undefined || before[x] == 9) && rows[y] != undefined && rows[y - 1][x - 1] != undefined) {
                                 wall = $('<img src="client/img/rooms/wall_left_t.png">');
                            } else {
                                 wall = $('<img src="client/img/rooms/wall_left.png">');
                            }



                            wall.css({
                                "position": "absolute",
                                "left": (x * 64 + y * 64) / 2 + 23 - 32,
                                "top": (y * 32 - x * 32) / 2 - 125,
                                "z-index": 1000 + y - 1 - x - 1
                            });


                            $("#images").append(wall);
                        }

                        if ((columns[x + 1] == 9) && columns[x] != 9 && columns[x] != undefined) {
                            wall = $('<img src="client/img/rooms/wall_right.png">');
                            wall.css({
                                "position": "absolute",
                                "left": (x * 64 + y * 64) / 2 + 32,
                                "top": (y * 32 - x * 32) / 2 - 125,
                                "z-index": 1000 + y - 1 - x - 1
                            });

                            $("#images").append(wall);
                        }

                        tile = $("<img part='1' width='66px' height='40px' class='tile tile" + x + "x" + y + "' rx='" + x + "' ry='" + y + "' src='client/img/rooms/tile.png'>");

                        tile.css({
                            "position": "absolute",
                            "left": (x * 64 + y * 64) / 2,
                            "top": (y * 32 - x * 32) / 2,
                            "z-index": 1000 + y - x
                        });
                        lastX = (x * 64 + y * 64) / 2;
                        lastY = (y * 32 - x * 32) / 2;

                        $(".tile").hover(function() {
                            $(this).attr('src', "client/img/rooms/tileHover.png");
                            currentTile = $(this);
                        }, function() {
                            $(this).attr('src', "client/img/rooms/tile.png");
                            currentTile = null;
                        });

                        $(".tile").mousedown(function() {
                            dragged = false;
                        });

                        $(".tile").mouseup(function() {
                            if (!dragged)
                            {
                                message = new Lemonade.Message.toServer(7);
                                message.add($(this).attr('rx'));
                                message.add($(this).attr('ry'));

                               // alert($(this).attr('rx') + " " + $(this).attr('ry'));

                                Lemonade.Socket.send(message.string());
                            }
                        });

                        $('#images').append(tile);
                    } else {
                        if (columns[x] == 8) {
                            wall = $('<img src="client/img/rooms/door.png" part=\"8\">');
                            wall.addClass("tile" + x + "x" + y + "y");
                            wall.css({
                                "position" : "absolute",
                                "left" : (x * 64 + y * 64) / 2 + 32,
                                "top" : (y * 32 - x * 32) / 2 - 107,
                                "z-index" : 1000 + y - x,
                                "pointer-events" : "none"
                            });
                            $("#images").append(wall);

                            tile = $('<img src="client/img/rooms/door_tile.png" part=\"8\">');
                            tile.css({
                                "position" : "absolute",
                                "left": (x * 64 + y * 64) / 2 + 32,
                                "top": (y * 32 - x * 32) / 2 + 2,
                                "z-index" : 997 + y - x
                            });
                            tile.addClass("tile" + x + "x" + y);
                            $('#images').append(tile);
                        }
                    }
                }
            }
            var width = $("#images").css("width");
            $('#roomContainer').css('margin-left',-lastX/2);
            $('#roomContainer').css('margin-top',-lastY/2);
            $('#roomContainer').css('width',lastX);

            break;


        case 7:
            var username = message.getParams()[0];
            var x = message.getParams()[1];
            var y = message.getParams()[2];
            var direction = message.getParams()[3];
            var look = message.getParams()[4];
            var room = message.getParams()[5];
            tile = $(".tile" + x + "x" + y);
            var avatar = new Lemonade.Avatar.user(username, look);
            avatar.inDoor = false;
            avatar.setDirection("N");
            avatar.standing();

            avatar.currentRoomX = x;
            avatar.currentRoomY = y;
            ava = avatar.getElement();

            ava.attr("username", username);
            Lemonade.avatars[username] = avatar;
            avatar.currentRoom = room;
            ava.css({
                "top" : parseInt((y * 32 - x * 32 ) / 2 ) - 85,
                "left" : parseInt(( x * 64 + y * 64) / 2),
                "position": "absolute"
            });

            if (tile.attr("part") == 8) {
                ava.css("z-index", 998 + y - x);
                avatar.inDoor = true;
            } else {
                ava.css("z-index", 1500000 + y * 10000 - x * 10000);
            }

            $("#roomContainer").append(ava);
            break;

        case 8:
            var username = message.getParams()[0];
            var x = message.getParams()[1];
            var y = message.getParams()[2];
            var direction = message.getParams()[3];
            var walk = message.getParams()[4];
            var speed = message.getParams()[5];
            var tile = $(".tile" + x + "x" + y);
            var avatar = Lemonade.avatars[message.getParams()[0]].getElement();
            var ava = Lemonade.avatars[username];

            ava.setDirection(direction);
            clearTimeout(ava.walkTimeout);
            ava.walking();




            oldX = ava.currentRoomX;
            oldY = ava.currentRoomY;

            avatar.animate( {
                top: parseInt((y * 32 - x * 32) / 2) - 85,
                left: (x * 64 + y * 64) / 2
            }, speed, "linear");

            ava.currentRoomX = x;
            ava.currentRoomY = y;

            z = 1500000 + y * 10000 - x + 10000;
            differenceX = x - oldX;
            differenceY = y - oldY;
            difference = differenceX + differenceY;
            console.log("d: " + difference);
            



            setTimeout(function() {
                avatar.css('z-index', z);
                ava.inDoor = false;
            }, speed / 2);
            break;


        case 9:
            var avatar = Lemonade.avatars[message.getParams()[0]];
            var speed = message.getParams()[1];
            setTimeout(function () {
                avatar.stopWalking();
            }, speed);
            break;


        case 10:
            Lemonade.avatars[message.getParams()[0]].showWriting();
            break;

        case 11:
            Lemonade.avatars[message.getParams()[0]].hideWriting();
            break;

        case 12:
            var username = message.getParams()[0];
            var style = message.getParams()[3];
            var shouting = message.getParams()[2];
            var message = message.getParams()[1];



            var textBubble = $("<div class=\"chatBubble " + style + "\"><div class=\"arrow\"></div><div class=\"left\"><div class=\"head\"><img src=\"https://www.habbo.com/habbo-imaging/avatarimage?figure=hr-165-45.hd-208-2.ch-250-64.lg-285-82.sh-290-64&direction=3&head_direction=3&size=s&headonly=1\"/></div></div><div class=\"mid\"><span class=\"username\"></span><span class=\"chatContent\"></span></div><div class=\"right\"></div></div>");
            textBubble.children(".mid").children(".username").text(username + ": ");
            textBubble.children(".mid").children(".chatContent").text(message);

            if (shouting) {
                textBubble.children(".mid").children(".chatContent").css('font-weight','bold');
            }

            clearInterval(Lemonade.Chatting.chatBubbleInterval);
            Lemonade.Chatting.pushBubbles(50);
            Lemonade.Chatting.chatBubbles.push(textBubble);

            $("#chatContainer").append(textBubble);

            avatarElement = Lemonade.avatars[username].getElement();
            left = avatarElement.offset().left-textBubble.width()/2+avatarElement.width()/2;
            marginLeft = 0;

            textBubble.css({
                "left": left,
                "margin-left": marginLeft +  "px"
            });

            Lemonade.Chatting.chatBubbleInterval = setInterval(function(){
                Lemonade.Chatting.pushBubbles(500);
            },5000);

            break;


        case 13:
            Lemonade.avatars[message.getParams()[0]].sit();
            break;
    }
    

}
