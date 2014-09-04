/**
 * Created by carpedm20 on 2014. 9. 3..
 */

var width = 1200,
    height = 576;

var sample = getUniformRandomSamples(width, height, 10000),
    samples = [],
    s;

while (s = sample())
    samples.push(s);

var voronoi = d3.geom.voronoi().clipExtent([[0,0],[width, height]]);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var image = new Image;
image.src = "../crow.jpg";
image.onload = start;

function start() {
    context.drawImage(image, 0, 0);
    image = context.getImageData(0, 0, width, height);
    voronoi(samples).forEach(function(cell) {
        var x = Math.floor(cell.point[0]),
            y = Math.floor(cell.point[1]),
            i = (width * y + x) * 4;

        context.fillStyle = d3.rgb(image.data[i + 0],  image.data[i + 1], image.data[i + 2]) + "";
        context.beginPath();
        context.moveTo(cell[0][0], cell[0][1]);

        for (var i =1; i<cell.length; i++) {
            context.lineTo(cell[i][0], cell[i][1]);
        }
        context.closePath();
        context.fill();
    });
}


function getUniformRandomSamples(width, height, maxCount) {
    var count = 0;
    return function() {
        if (count++ > maxCount)
            return null;
        else
            return [Math.random() * width, Math.random() * height];
    }
}