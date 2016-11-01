/**
 * Created by Wesley on 31-07-16.
 */
var Lemonade = {};
Lemonade.Socket = new WebSocket("ws://127.0.0.1:30000");

// Lemonade.Socket.onopen = function() {
//     Lemonade.Loader.showLoader(); // Show the client loader
//     var message = new Lemonade.Message.toServer(1); // Create a new message
//     message.add("f17fe3c0-52b5-11e6-a540-c50f1df5d875"); // Add the player SSO key to the message. TODO: Add actual SSO.
//     Lemonade.Socket.send(message.string()); // Send the message to the server.
//     Lemonade.Loader.start(); // Start loading the actual client.
//
// };

$("#game").fadeIn(1000);
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
        var id = parseInt(message.substring(0, 5));
        var parameters = JSON.stringify(message.substring(5));

        this.getId = function () {
            return id;
        }

        this.getParameters = function () {
            return parameters;
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