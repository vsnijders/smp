
// =================== GLOBAL VARIABLES ========================
var selection = {};
var filter = {};
var graphtype;

function update_filter() {
  var context = $(this);
  if (!context.is('input')) context = $('#' + graphtype);
  filter = {};
  $("input.filter:checked", context.closest(".tab-pane")).each(function() {
    var variable = this.name;
    var level    = this.value;
    if (filter[variable] === undefined) filter[variable] = [];
    filter[variable].push(level);
  });
}

function update_selection(context) {
  // TODO check mapping code
  mapping.resetVariables();

  if (context === undefined) context = $('#' + graphtype);
  selection = {};
  $("div.plotvariable .droppable", $(context).closest(".tab-pane")).each(function(i, ul) {
    var dimension = $(ul).attr("data-dimension");
    selection[dimension] = [];
    $("li.draggable", $(ul)).each(function(j, li) {
      selection[dimension][j] = $(li).attr("data-variable");

      // TODO check mapping code
      var variable = $(li).attr("data-variable");
      mapping.map()[dimension]
        .variable(variable, variables[variable]);
      if (variable == "Year" || variable == "Jaar") {
        mapping.map()[dimension].type("time");
      }
    });
  })
}

function on_meta_loaded(data) {
  // TODO: following code block needs cleanup
  $(".variables").each(function(i, el) {

    // add dimensions to page
    jQuery.each(data.dimensions, function(dim, dat) {
      var li = $("<li>").addClass("draggable categorical")
        .attr("data-variable", dim).text(dat.name)
        .draggable({
          revert : "invalid",
          axis : "y"
        });
      var a = $("<a>").attr("href", "#").addClass("togglefilter")
        .html('<i class=\"icon-check"></i>').appendTo(li)
        .click(function() {
          $(this).next().toggle('slow');
          return false;
        });


      var div = $("<div>").addClass("filter").appendTo(li).hide();
      var form = $("<form>").appendTo(div);
      jQuery.each(dat.levels, function(i, lab) {
        var label = $("<label>").text(lab).appendTo(form);
        $("<input>").attr("type", "checkbox").addClass("filter")
          .attr("name", dim).val(lab).click(update_filter)
          .click(redraw_graph).prependTo(label);
      });
      $(el).append(li);
    });


    // add variables to page
    jQuery.each(data.variables, function(dim, dat) {
      var li = $("<li>").addClass("draggable numeric")
        .attr("data-variable", dim).text(dat.name)
        .draggable({
          revert : "invalid",
          axis : "y"
        });
      $(el).append(li)
    });

  });
}


$(function() {
  // Create tabbed pages for each of the graph types
  $("#tabs").tabs();
  // Keep track of which tab = graphtype is selected
  $('a[data-toggle="tab"]').on('shown', function (e) {
    graphtype = $(this).text();
    update_selection();
    update_filter();
    redraw_graph();
  });
  // Select first tab
  $('.nav a:first').tab("show");

  // Drag-and-drop of variables on graph dimensions
  $(".droppable").droppable({
    accept: ".draggable",
    activeClass: "droppable_active", 
    hoverClass: "droppable_hover", 
    tolerance : "touch",
    drop: function(event, ui) {
      var granpa = $(this).closest(".tab-pane");
      // move existing variables to variables section
      $(".draggable", $(this)).appendTo($(".variables", granpa));

      // if 
      if ($(this).hasClass("variables")) {
        $("input").attr("type", "radio");
      }

      // append newly dropped variable to the list
      $(ui.draggable).prependTo($(this)).attr("style", "position:relative");
      // update selection
      update_selection(this);
      redraw_graph();
    },
    accept : function(draggable) {
      return (($(this).hasClass("numeric") && $(draggable).hasClass("numeric")) || 
        ($(this).hasClass("categorical") && $(draggable).hasClass("categorical")) ||
        $(this).hasClass("variables"))
    }


  });

});

