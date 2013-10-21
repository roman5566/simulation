var Body, Clock, Model, Simulation,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Body = require('body');

Clock = require('clock');

Model = require('model');

module.exports = Simulation = (function(_super) {
  __extends(Simulation, _super);

  Simulation.is(Body);

  Simulation.has(Clock);

  Simulation.has(Float32Array, {
    as: 'gravity',
    "default": function() {
      return new Float32Array(3);
    }
  });

  Simulation.has(Number, {
    as: 'ticks',
    "default": 0
  });

  function Simulation(args) {
    if (args == null) {
      args = {};
    }
    Simulation.__super__.constructor.apply(this, arguments);
  }

  Simulation.prototype.start = function() {
    var _ref, _ref1,
      _this = this;
    if ((_ref = this.clock) != null) {
      _ref.start();
    }
    return (_ref1 = this.clock) != null ? _ref1.on('tick', function(time) {
      return _this.tick(time);
    }) : void 0;
  };

  Simulation.prototype.tick = function(time) {
    var _this = this;
    this.each(function(key, child) {
      return child != null ? typeof child.update === "function" ? child.update(time) : void 0 : void 0;
    });
    this.emit('tick', time);
    this.ticks++;
  };

  return Simulation;

})(Model);
