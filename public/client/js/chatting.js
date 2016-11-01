Lemonade.Chatting = {
    pressedKeys: {},
    chatBubbles: [],
    chatBubbleStyle: "default",
    writingNow: false,
    chatBubbleInterval: setInterval(function(){ Lemonade.Chatting.pushBubbles(500); },5000),

    countLetters: function (event) {
        var key = ("which" in event) ? event.which : event.keyCode;
        Lemonade.Chatting.pressedKeys[key] = true;
    },

    toggleWriting: function (element, event) {
        var shouting = false;

        if (Lemonade.Chatting.pressedKeys[13] != undefined) { // If enter is pressed
            if (Lemonade.Chatting.pressedKeys[16] != undefined)
                shouting = true;

            Lemonade.Chatting.sendMessage($('#writeChat').find('input').val().toString(), shouting);
            $('#writeChat').find('input').val("");
            var message = new Lemonade.Message.toServer(9);
            Lemonade.Socket.send(message.string());
            Lemonade.Chatting.writingNow = false;
            Lemonade.Chatting.pressedKeys = [];


        } else {
            if (!Lemonade.Chatting.writingNow) {
                if ($('#writeChat').find('input').val().length > 0) {
                    var message = new Lemonade.Message.toServer(8);
                    Lemonade.Socket.send(message.string());
                    Lemonade.Chatting.writingNow = true;
                }
            }
            if (Lemonade.Chatting.writingNow) {
                if ($('#writeChat').find('input').val().length < 1) {
                    var message = new Lemonade.Message.toServer(9);
                    Lemonade.Socket.send(message.string());
                    Lemonade.Chatting.writingNow = false;
                }
            }
        }
    },
    
    sendMessage: function (message, shout) {
        if (message.length > 0) {
            clientMessage = new Lemonade.Message.toServer(10);
            clientMessage.add(message);
            clientMessage.add(shout);
            clientMessage.add(Lemonade.Chatting.chatBubbleStyle);
            Lemonade.Socket.send(clientMessage.string());
        }
    },

    pushBubbles: function (time) {
        for (var i = 0; i < Lemonade.Chatting.chatBubbles.length; i++) {
            Lemonade.Chatting.chatBubbles[i].stop(true, true).animate({
                top: parseInt(Lemonade.Chatting.chatBubbles[i].css('top')) - 18
            }, time);

            if (Lemonade.Chatting.chatBubbles[i].offset().top < -30)
            {
                Lemonade.Chatting.chatBubbles[i].remove();
                Lemonade.Chatting.chatBubbles.splice(i,1);
            }

        }
    },

    setChatStyle: function (style) {
        Lemonade.Chatting.chatBubbleStyle = style;
        $(".bubble").click();
    }
};