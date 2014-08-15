
// Default models
WIDTH  = 1024;
HEIGHT = 1024;
SCALE  = 64;

// Default options for Model.render()
BACKGROUND_COLOR = 0x000000;
LINE_WIDTH = 0.1;
MARGIN = 0.1;
SHOW_LABELS = False;

// Shape() defaults
FILL_COLOR = 0x477984;
STROKE_COLOR = 0x313E4A;

function color(value) {
  r = ((value >> (8 * 2)) & 255) / 255.0;
  g = ((value >> (8 * 1)) & 255) / 255.0;
  b = ((value >> (8 * 0)) & 255) / 255.0;

  return [r, g, b];
}

function normalize(x, y) {
}

function Shape(sides, x=0, y=0, rotation=0) {
  // init
  this.sides = sides;
  this.x = x;
  this.y = y;
  this.rotation = rotation;
  this.fill = FILL_COLOR;
  this.stroke = STROKE_COLOR;

  this.copy = function(x, y) {
    return Shape(
        this.sides, x, y, this.rotation,
    )
  }
}

function Model(width=WIDTH, height=Height, scale=SCALE) {
  // init
  this.width  = width;
  this.height = height;
  this.scale  = scale;
  this.shapes = [];
  this.lookup = {};

  this.append = function(shape) {
    this.shapes.append(shape);
    key = normalize(shape.x, shape.y);
    self.lookup[key] = shape;
  };

  this._add = function(index, edge, sides) {
    parent = this.shapes[index];
    shape  = parent.adjacent(sides, edge);
    this.append(shape);
  }
  
}

var model1 = new Model();
