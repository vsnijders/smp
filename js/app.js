// Generated by CoffeeScript 1.3.3
(function() {
  var Aes, ChartView, LineChart, Variable, d3View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ChartView = (function(_super) {

    __extends(ChartView, _super);

    function ChartView() {
      return ChartView.__super__.constructor.apply(this, arguments);
    }

    ChartView.prototype.svg = null;

    ChartView.prototype.initialize = function(parent) {
      if (parent == null) {
        parent = "body";
      }
      this.svg = d3.select(parent).append("svg");
      return this.setElement(this.svg.node());
    };

    ChartView.prototype.render = function(dat) {
      var regions;
      regions = this.svg.select("g.regions");
      regions.selectAll("path").data(features).enter().append("path").attr("class", dat ? quantize : null).attr("d", path).attr("title", function(d) {
        return d.properties.name;
      });
      return this;
    };

    return ChartView;

  })(d3View);

  this.ChartView = ChartView;

  d3View = (function(_super) {
    var height, width;

    __extends(d3View, _super);

    function d3View() {
      return d3View.__super__.constructor.apply(this, arguments);
    }

    d3View.prototype.margin = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    };

    width = function(w) {
      if (!w) {
        return this.$el.width();
      }
      this.$el.width(w);
      return this;
    };

    height = function(h) {
      if (!h) {
        return this.$el.height();
      }
      this.$el.height(h);
      return this;
    };

    return d3View;

  })(Backbone.View);

  LineChart = (function(_super) {

    __extends(LineChart, _super);

    function LineChart() {
      return LineChart.__super__.constructor.apply(this, arguments);
    }

    LineChart.prototype.initialize = function(parent) {
      if (parent == null) {
        parent = "body";
      }
      return LineChart.__super__.initialize.call(this, parent);
    };

    LineChart.prototype.render = function() {
      return this;
    };

    return LineChart;

  })(ChartView);

  Variable = (function() {

    function Variable(code, name, type) {
      this.code = code;
      this.name = name;
      this.type = type != null ? type : "numerical";
    }

    return Variable;

  })();

  Aes = (function() {

    function Aes() {
      this.value = __bind(this.value, this);

    }

    Aes.prototype.scale = d3.scale.linear();

    Aes.prototype.format = d3.format("n");

    Aes.prototype.value = function(d) {
      return +d[this.variable.code];
    };

    Aes.prototype.refresh = function(data) {
      var range;
      range = d3.extent(data, value);
      return range;
    };

    return Aes;

  })();

  this.Variable = Variable;

}).call(this);
