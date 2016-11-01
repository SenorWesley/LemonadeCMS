Lemonade.Avatar = {
	user: function(username, look) {
		var that 		= this;
		this.element 		 = $('<div class="avatar"><div style="display:none;position:absolute;" class="username-data"></div><div class="writing"></div><div class="avatarimg" style="height:100%;width:100%;"></div></div>');
		this.spriteX 		 = new Lemonade.Images.sprite(64, 110, 5, "client/img/avatar/ghost.gif", 0);
		this.spriteSit 		 = new Lemonade.Images.sprite(64, 110, 1, "client/img/avatar/ghost.gif", 40);
		this.hasCallback 	 = false;
		this.direction 		 = 0;
		this.currentX 		 = 0;
		this.currentRoomX 	 = 0;
        this.currentRoomY 	 = 0;
		this.walkingNow 	 = false;
        this.inDoor 		 = false;
        this.walkTimeout 	 = null;
		this.walkingInterval = null;
        this.currentRoom     = null;
        this.username        = username;
		this.callbacks 		 = new Array();
		this.image 			 = new Image();
		this.image.src 		 = "http://localhost:8000/client/img/avatar/avatar.php?figure=" + look;
		this.element.children(".avatarimg").css("background", "url(" + this.spriteX.url + ")");
		this.image.onload 	 = function() {
			src 		  	   = that.image.src;
            that.spriteX.url   = that.image.src;
            that.spriteSit.url = that.image.src;
            that.update();
            that.element.children("avatarimg").removeClass("ghost");
		}

		 this.currentImageData = function (callback) {
            dimensions = spritevar.getDimensions(1, 0);
            corner = dimensions.topLeft;
            callback(currentSprite.url, -corner.x, -corner.y);
        }

        this.imageChange = function (callback) {
            this.callbacks.push(callback);
        }

        this.showWriting = function () {
            this.element.children("writing").show();
        }

        this.hideWriting = function () {
            this.element.children("writing").hide();
        }

        this.setDirection = function (direction) {
            directionN = 6;

            switch (direction) {
                case "O":
                    directionN = 8; // right down
                    break;

                case "SO":
                    directionN = 7; // down
                    break;

                case "S":
                    directionN = 6; // Left bottom
                    break;

                case "SW":
                    directionN = 5; // left
                    break;

                case "W":
                    directionN = 4;
                    break;

                case "NW":
                    directionN = 3;
                    break;

                case "N":
                    directionN = 2; // Right top
                    break;

                case "NO":
                    directionN = 1; // Right
                    break;
            }

            this.direction = directionN;

        }

        this.update = function () {
            this.setImage(this.direction, this.currentX);
        }

        this.standing = function () {
            this.setImage(this.direction, 0);
        }

        this.walking = function () {

                this.walkingNow = true;

                clearInterval(this.walkingInterval);
                var that = this;
                this.currentX = 1;

                this.walkingInterval = setInterval(function () {
                    if (that.walkingNow) {
                        that.setImage(that.direction, that.currentX);
                        that.currentX++;
                        if (that.currentX > 4) {
                            that.currentX = 1;
                        }
                    }
                }, 100);
        }

        this.stopWalking = function () {
            clearInterval(this.walkInterval);
            this.walkInterval = null;
            this.walkingNow = false;
            this.currentX = 0;
            this.standing();
        }

        this.setImage = function(direction, x, sprite) {
            spritevar = this.spriteX;
            if (sprite == "sit") {
                spritevar = this.spriteSit;
            }

            dimensions = spritevar.getDimensions(this.direction, x);
            corner = dimensions.topLeft;

            $(".avatarimg").css({
                "background" : "url('" + spritevar.url + "')",
                "background-position": corner.x + "px " + corner.y + "px"
            });

            console.log(this.spriteSit.url);

            that = this;
            for (i = 0; i < that.callbacks.length; i++) {
                cb = that.callbacks[i];
                cb(spritevar.url, -corner.x, -corner.y);
            }
        };

        this.getElement = function() {
            return this.element;
        };


        this.showWriting = function()
        {
            this.element.children('.writing').show();
        };

        this.hideWriting = function()
        {
            this.element.children('.writing').hide();
        };
        
        this.exitRoom = function () {
            var clientMessage = new Lemonade.Message.toClient(11);
            clientMessage.add(this.username);
            Lemonade.Socket.send(clientMessage.string());
        };

        this.sit = function () {
            if (this.direction == 7 || this.direction == 5 || this.direction == 3 || this.direction == 1) {
                this.stopWalking();

                this.setImage(0, Math.ceil(2), "sit");

                var sit = 1;
                switch (this.direction) {
                    case 1:
                        sit = 7;
                        break;

                    case 3:
                        sit = 5;
                        break;

                    case 5:
                        sit = 3;
                        break;

                    case 7:
                        sit = 1;
                        break;
                }


                var corner = this.spriteSit.getDimensions(0, Math.ceil(sit / 2) - 1).topLeft;
                alert(-corner.x);
                this.element.children(".avatarimg").css({
                    "background-position": (-corner.x) + "px 11px",
                    "background-repeat": "no-repeat"
                });
            }
        }

	}
};