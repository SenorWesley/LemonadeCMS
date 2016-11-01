$( function() {
    $( "#navigator" ).tabs();
} );
Lemonade.Navigator = {

    toggle: function () {
        var first = true;

        if (first) {
            roomMsg = new Lemonade.Message.toServer(2);
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
