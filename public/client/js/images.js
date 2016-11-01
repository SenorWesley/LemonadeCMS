Lemonade.Images = {
	sprite: function(width, height, lineWidth, url, offset) {
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.url = url;
        this.offset = offset;

        this.getDimensions = function(count, x) {
            offset = this.offset * this.width + count * this.lineWidth * this.width;

            return new Lemonade.Images.dimensions(
                new Lemonade.Images.point(offset + (x * this.width), 0),
                new Lemonade.Images.point(offset + ((x + 1) * this.width), 0),
                new Lemonade.Images.point(offset + (x * this.width), this.height),
                new Lemonade.Images.point(offset + ((x + 1) * this.width), this.height)
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