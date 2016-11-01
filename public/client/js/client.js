/**
 * Created by Wesley on 31-07-16.
 */
var Lemonade = {};
var avatars = {};
var move = false;
Lemonade.Socket = new WebSocket("ws://" + clientParams["host"] + ":" + clientParams["port"]);

 Lemonade.Socket.onopen = function() {
     Lemonade.Loader.showLoader(); // Show the client loader
     var message = new Lemonade.Message.toServer(1); // Create a new message
     message.add(clientParams["sso"]); // Add the player SSO key to the message.
     Lemonade.Socket.send(message.string()); // Send the message to the server.
     Lemonade.Loader.start(); // Start loading the actual client.

 };

Lemonade.Socket.onclose = function () {
    alert = new Lemonade.Interface.defaultBox(300, 200, 0, 0);
    cont = $('<div style="padding:10px;font-size:12px;"></div>');
    cont.text("Tot onze spijt moeten wij mededelen dat het hotel offine gaat voor nu. Wanneer wij weer online zullen zijn is zo niet te zeggen. Bedankt voor het begrip. Het hotel management.");

    alert.setContent(cont);
    alert.setTitle("Bericht van het hotel management");
    alert.getElement().show();
    alert.center();
}

Lemonade.Socket.onmessage = function (serverMessage) {
    var packet = serverMessage.data;
    var message = new Lemonade.Message.toClient(packet);
    console.log(message.getPacketId());
    switch (message.getPacketId()) {
        case 0:
            $("#background_left .habbo").attr("src", "http://www.habbo.nl/habbo-imaging/avatarimage?hb=img&figure=" + message.getParams()[1] + "&action=std,wav&gesture=sml&size=l&direction=2&head_direction=3");
            $("#stats #credits span").text(message.getParams()[2]);
            break;

        case 1:
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
                console.log(id);
                roomElement = $('<li style="cursor:pointer;" onclick="Lemonade.Interface.navigator.enterRoom(this)" roomid="' + id + '"><span style="background:#' + countclass + ';"><i class="fa fa-user"></i>' + count + ' </span>' + caption + '</li>');
                $("#navigator-high-rooms.popular-rooms").append(roomElement);


            }
            break;

        case 6:
            var master = null;
            var lastX = null;
            var lastY = null;
            var heightmap = message.getParams()[2];
            var wall = null;
            var tile = null;
            var currentTile = null;
            var dragged = null;

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
                            if (!dragged && !move)
                            {
                                message = new Lemonade.Message.toServer(7);
                                message.add($(this).attr('rx'));
                                message.add($(this).attr('ry'));

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
                                "z-index" : 997 + y - x,
                            });
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

            tile = $(".tile" + x + "x" + y);
            var avatar = new Lemonade.Images.avatar(look, username);
            avatar.inDoor = false;
            avatar.setDirection("N");
            avatar.standing();

            avatar.currentRoomX = x;
            avatar.currentRoomY = y;
            ava = avatar.getElement();

            ava.attr("username", username);
            avatars[username] = avatar;
            ava.css({
                "top" : parseInt((y * 32 - x * 32 ) / 2 ) - 85,
                "left" : parseInt(( x * 64 + y * 64) / 2),
                "position": "absolute"
            });

            if (tile.attr("part") == "8") {
                avatar.css("z-index", 998 + y - x -50);
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
            var avatar = avatars[username].getElement();
            var ava = avatars[username];

            ava.setDirection(direction);
            console.log(ava.directionN);
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

            // var stopWalkingTimeout = setTimeout(function() {
            //
            //     if (!avatar.walkingNow) {
            //         avatar.stopWalking();
            //     } else {
            //         stopWalkingTimeout();
            //     }
            //
            //
            // }, 400);

            setTimeout(function() {
                avatar.css('z-index', z);
                ava.inDoor = false;
            }, speed / 2);
            break;

    }
}

// Messages
Lemonade.Message = {
    pad: function (n, w, z) {
        z = z || "0";
        n = n + "";
        return n.length >= w ? n : new Array(w - n.length + 1).join(z) + n;
    },

    toServer: function (packet) {
        values = new Array();
        var int = 0;

        this.add = function (toAdd) {
            values[int] = toAdd;
            int++;
        }

        this.string = function () {
            return Lemonade.Message.pad(packet, 5) + JSON.stringify(values);
        }
    },

    toClient: function (message) {
        var id;
        var params;

        id = parseInt(message.substring(0, 5));
        params = JSON.parse(message.substring(5));

        this.getPacketId = function() {
            return id;
        }

        this.getParams = function() {
            return params;
        }
    }
}


// Loader
Lemonade.Loader = {
    showLoader: function () {
        $("#loader .inner").fadeIn("2000");
    },

    start: function () {
        $("#loader .inner #bar #inner").animate({
            width: "100%"
        }, 4000, function () {
            $("#loader").fadeOut(1000);
            $("#game").fadeIn(1000);
        })
    }
}

// Interface

Lemonade.Interface = {
    defaultBox: function(width, height, x, y) {
        var element = $("<div class='interface box'>" + "<div class='title'><p class='text'></p><div class='close'></div></div>" + "<div class='content'></div>" + "</div>");
        element.hide();
        element.css({
            'width': width,
            'height': height,
            'top': x,
            'left': y,
            'position': 'absolute',
            'z-index': 9999999999
        });

        element.children('.title').height(30);
        element.children('.content').height(height - 30);
        element.draggable({
            containment: "#game",
            handle: ".title"
        });
        $("#game").append(element);

        this.center = function() {
            element.css('top', '50%');
            element.css('margin-top', -1 * element.height() / 2);
            element.css('margin-left', -1 * element.width() / 2);
            element.css('left', '50%');
        }

        this.setPosition = function(x, y) {
            element.css('left', x);
            element.css('top', y);
            element.css('margin-top', 0);
            element.css('margin-left', 0);
        }

        this.setContent = function(content) {

            element.children(".content").html("");
            element.children('.content').append(content);
        }

        this.setTitle = function(title) {
            element.children('.title').children('.text').text(title);
        }

        this.getElement = function() {
            return element;
        }
    },
    
    navigator: {
        toggle: function () {
            if ($("#navigator").css("display") == "none") {
                roomMsg = new Lemonade.Message.toServer(2);
                roomMsg.add('1');
                Lemonade.Socket.send(roomMsg.string());
            }
            $("#navigator").toggle();
            $("#navigator").draggable({
                containment: "#game",
                handle: ".title"
            });


        },
        enterRoom: function (element) {
            roomEnter = new Lemonade.Message.toServer(6);
            roomEnter.add($(element).attr("roomid"));
            Lemonade.Socket.send(roomEnter.string());
        }
    }
}

// Images
Lemonade.Images = {
    avatar: function(look, username) {
        var image = new Image();
        var src = "client/img/avatar/ghost.gif";

        image.src = "http://localhost:8000/client/img/avatar/avatar.php?figure=" + look;

        var element = $('<div class="avatar"><div style="display:none;position:absolute;" class="username-data"></div><div class="writing"></div><div class="avatarimg" style="height:100%;width:100%;"></div></div>');

        var spriteX = new Lemonade.Images.sprite(64, 110, 1, src, 0);
        var spriteSit = new Lemonade.Images.sprite(64, 110, 1, src, 40);

        var that = this;

        element.children(".avatarimg").addClass("ghost");
        element.children(".avatarimg").css("background", "url(" + spriteX.url + ")");

        image.onload = function () {
            src = image.src;
            spriteX.url = image.src;
            spriteSit.url = image.sit;
            that.update();
            element.children(".avatarimg").removeClass("ghost");
        }

        this.directionN = 0;
        this.currentX = 0;
        this.walkingInterval = null;
        this.walkingNow = false;
        this.currentRoomX = 0;
        this.currentRoomY = 0;
        this.walkTimeout = null;
        this.inDoor = false;
        this.username = username;
        this.callbacks = new Array();

        var currentSprite = spriteX;
        var hasCallback = false;
        var elementX = element;

        this.currentImageData = function (callback) {
            dimensions = spritevar.getDimensions(1, 0);
            corner = dimensions.topLeft;
            callback(currentSprite.url, -corner.x, -corner.y);
        }

        this.imageChange = function (callback) {
            this.callbacks.push(callback);
        }

        this.showWriting = function () {
            element.children("writing").show();
        }

        this.hideWriting = function () {
            element.children("writing").hide();
        }

        this.setDirection = function (direction) {
            directionN = 6;

            switch (direction) {
                case "O":
                    directionN = 0;
                    break;

                case "SO":
                    directionN = 1;
                    break;

                case "S":
                    directionN = 2;
                    break;

                case "SW":
                    directionN = 3;
                    break;

                case "W":
                    directionN = 4;
                    break;

                case "NW":
                    directionN = 5;
                    break;

                case "N":
                    directionN = 6;
                    break;

                case "NO":
                    directionN = 7;
                    break;
            }

            this.directionN = directionN;

        }

        this.update = function () {
            this.setImage(this.directionN, this.currentX);
        }

        this.standing = function () {
            currentSprite = spriteX;
            currentX = 0;
            this.setImage(this.directionN, currentX);
        }

        this.walking = function () {
            if (!this.walkingNow) {
                this.walkingNow = true;

                clearInterval(this.walkingInterval);
                var that = this;
                this.walkingInterval = setInterval(function () {
                    that.setImage(that.directionNumber, that.currentX);
                    that.currentX++;
                    if (that.currentX > 4) {
                        that.currentX = 1;
                    }
                }, 80);
            }
        }

        this.stopWalking = function () {
            clearInterval(this.walkInterval);
            this.walkInterval = null;
            this.walkingNow = false;
            this.currentX = 0;
            this.standing();

        }

        this.setImage = function(direction, x, sprite) {
            spritevar = spriteX;
            if (sprite == "sit") {
                spritevar = spriteSit;
            }

            dimensions = spritevar.getDimensions(direction, x);
            corner = dimensions.topLeft;

            $(".avatarimg").css({
                "background" : "url('" + spritevar.url + "')",
                "background-position": ( (-corner.x) + 60 ) + "px " + (-corner.y) + "px"
            });

            that = this;
            for (i = 0; i < that.callbacks.length; i++) {
                cb = that.callbacks[i];
                cb(spritevar.url, -corner.x, -corner.y);
            }
        }

        this.getElement = function() {
            return element;
        }
    },

    sprite: function(width, height, lineWidth, url, offset) {
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.url = url;
        this.offset = offset;

        this.getDimensions = function(count, x) {
            offset = this.offset * this.width + count * this.lineWidth * this.width;

            return new Lemonade.Images.dimensions(
                new Lemonade.Images.point(offset + x * this.width, 0),
                new Lemonade.Images.point(offset + (x + 1) * this.width, 0),
                new Lemonade.Images.point(offset + x * this.width, this.height),
                new Lemonade.Images.point(offset + (x * 1) * this.width, this.height)
            );
        }
    },

    dimensions: function(p1, p2, p3, p4) {
        this.topLeft = p1;
        this.topRight = p2;
        this.bottomLeft = p3;
        this.bottomRight = p4;
    },

    point: function(x, y) {
        this.x = x;
        this.y = y;
    }


}


$( function() {
    $( "#navigator" ).tabs();
} );
$('#images').parryThrust({callback: imageClicked});

function imageClicked() {
    
}