Lemonade.Interface = {
	Loader: {
		showLoader: function () {
        	$("#loader .inner").fadeIn("2000");
    	},

    	start: function () {
        	$("#loader .inner #bar #inner").animate({
        	    width: "100%"
        	}, 3000, function () {
        	    $("#loader").fadeOut(1000);
        	    $("#game").fadeIn(1000);
        	});
    	}
	},

	alert: function(width, height, x, y) {
		var x = (typeof(x) !== "undefined") ? x : 0;
		var y = (typeof(y) !== "undefined") ? x : 0;

		var element = $("<div class=\"interface panel\">" + 
						"<div class=\"title\"><p class=\"text\"></p><div class=\"close\"></div></div>" + 
						"<div class=\"content\"></div>" + 
						"</div>");
		element.hide();
		element.css({
            'width': width,
            'height': height,
            'top': x,
            'left': y,
            'position': 'absolute',
            'z-index': 99999
		});


        element.children(".title").height(30);
        element.children(".content").height(height - 30);
        element.draggable({
            containment: "#game",
            handle: ".title"
        });
        $("#game").append(element);

        this.center = function() {
        	element.css({
        		"top": "50%",
        		"left": "50%",
        		"margin-left": -1 * element.width() / 2,
        		"margin-top": -1 * element.height() / 2
        	});
        }

        this.setPosition = function(x, y) {
        	element.css({
        		"top": y,
        		"left": x,
        		"margin-left": 0,
        		"margin-top": 0
        	});
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


	}
}