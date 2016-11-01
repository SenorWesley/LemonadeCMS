Lemonade.Message = {
    pad: function (n, w, z) {
        z = z || "0";
        n = n + "";
        return n.length >= w ? n : new Array(w - n.length + 1).join(z) + n;
    },

    toServer: function (packet) {
        var values = new Array();
        var i = 0;
        var id = packet;

        this.add = function(element) {
            values[i] = element;
            i++;
        };

        this.addE = function(element) {
            values[i] = element;
            i++;
        };

        this.string = function() {
            return Lemonade.Message.pad(id, 5) + JSON.stringify(values);
        }
    },

    toClient: function (message) {
        var id;
        var params;

        id = parseInt(message.substring(0, 5));
        params = JSON.parse(message.substring(5));

        this.getPacketId = function() {
            return id;
        };

        this.getParams = function() {
            return params;
        };
        console.log(id);
    }
};
